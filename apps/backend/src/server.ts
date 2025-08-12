import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import * as Sentry from '@sentry/node';
import { requestIdMiddleware } from './middleware/requestId.js';
import { createServer } from 'http';
import { createSocketServer } from './ws/index.js';
import { apiLimiter } from './lib/rateLimit.js';
import logger from './lib/logger.js';
import { clerkMiddleware } from '@clerk/express';
import dotenv from 'dotenv';
// Load env from repo root if present; fallback to default resolution
dotenv.config({ path: process.cwd() + '/.env' });

// Routers
import homeRouter from './routes/home.js';
import marketplaceRouter from './routes/marketplace.js';
import cargoRouter from './routes/cargo.js';
import quotesRouter from './routes/quotes.js';
import dealsRouter from './routes/deals.js';
import agentRouter from './routes/agent.js';
import fleetRouter from './routes/fleet.js';
import settingsRouter from './routes/settings.js';
import loadsRouter from './routes/loads.js';
import uploadRouter from './routes/upload.js';

const app = express();

// Sentry is initialized in ./instrument.ts via --import

// Public health before any auth middleware
app.get('/health', (_req, res) => res.json({ ok: true }));

// CORS origins din env
const allowedOrigins = (process.env.CLERK_ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((s) => s.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(hpp());
app.use(helmet({ frameguard: { action: 'deny' } }));
app.use(express.json({ limit: '1mb' }));
app.use(apiLimiter);
app.use(requestIdMiddleware);

// attach request_id to Sentry scope and structured request log
app.use((req, _res, next) => {
  const requestId = req.context?.requestId;
  if (requestId) {
    Sentry.setTag('request_id', requestId);
  }
  logger.info(JSON.stringify({ method: req.method, url: req.originalUrl, requestId }));
  next();
});

// Logging requests basic (kept no-op since structured logger added after requestId)

// Clerk middleware (enabled only when configured)
if (process.env.CLERK_SECRET_KEY) {
  app.use(clerkMiddleware());
}

// Optional debug route to test error path
app.get('/_debug/boom', (_req, _res) => {
  throw new Error('Boom test error');
});

// Security response headers (COOP/COEP/CORP/HSTS)
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  if (process.env.NODE_ENV === 'production' && (req.secure || req.headers['x-forwarded-proto'] === 'https')) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  next();
});

// CSP (Report-Only by default, behind flags)
app.use((req, res, next) => {
  if (process.env.FEATURE_CSP !== 'true') return next();
  const nonce = 'dev-nonce';
  const base = [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "connect-src 'self' https:",
    "object-src 'none'",
    "worker-src 'self' blob:",
  ].join('; ');
  const headerName = process.env.CSP_ENFORCE === 'true' ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only';
  res.setHeader(headerName, base);
  next();
});

// CSP report endpoint
app.post('/csp-report', (req, res) => {
  const requestId = req.context?.requestId;
  logger.warn(JSON.stringify({ type: 'csp-report', requestId, body: req.body }));
  res.status(204).end();
});

// Mount routers under /api
app.use('/api', homeRouter);
app.use('/api', marketplaceRouter);
app.use('/api', cargoRouter);
app.use('/api', quotesRouter);
app.use('/api', dealsRouter);
app.use('/api', agentRouter);
app.use('/api', fleetRouter);
app.use('/api', settingsRouter);
app.use('/api', loadsRouter);
app.use('/api', uploadRouter);

// Sentry error handler (must be after all routes)
Sentry.setupExpressErrorHandler(app);

// Error handler
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const requestId = req.context?.requestId;
  logger.error(JSON.stringify({ message: err?.message || 'Unexpected error', requestId }));
  res.status(err?.status || 500).json({ error: 'Server error', requestId });
});

const httpServer = createServer(app);
createSocketServer(httpServer);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => logger.info(`[backend] listening on http://localhost:${PORT}`));


