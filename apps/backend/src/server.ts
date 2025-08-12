const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const Sentry = require('@sentry/node');
const { requestIdMiddleware } = require('./middleware/requestId');
const { createServer } = require('http');
const { createSocketServer } = require('./ws/index');
const { apiLimiter } = require('./lib/rateLimit');
const logger = require('./lib/logger').default || require('./lib/logger');
const { clerkMiddleware } = require('@clerk/express');
const dotenv = require('dotenv');
// Load env from repo root if present; fallback to default resolution
dotenv.config({ path: process.cwd() + '/.env' });

// Routers
const homeRouter = require('./routes/home').default || require('./routes/home');
const marketplaceRouter = require('./routes/marketplace').default || require('./routes/marketplace');
const cargoRouter = require('./routes/cargo').default || require('./routes/cargo');
const quotesRouter = require('./routes/quotes').default || require('./routes/quotes');
const dealsRouter = require('./routes/deals').default || require('./routes/deals');
const agentRouter = require('./routes/agent').default || require('./routes/agent');
const fleetRouter = require('./routes/fleet').default || require('./routes/fleet');
const settingsRouter = require('./routes/settings').default || require('./routes/settings');
const loadsRouter = require('./routes/loads').default || require('./routes/loads');
const uploadRouter = require('./routes/upload').default || require('./routes/upload');

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


