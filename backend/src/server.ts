import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { createSocketServer } from './ws/index';
import { apiLimiter } from './lib/rateLimit';
import logger from './lib/logger';
import { clerkMiddleware } from '@clerk/express';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.local' });

// Routers
import homeRouter from './routes/home';
import marketplaceRouter from './routes/marketplace';
import cargoRouter from './routes/cargo';
import quotesRouter from './routes/quotes';
import dealsRouter from './routes/deals';
import agentRouter from './routes/agent';
import fleetRouter from './routes/fleet';
import settingsRouter from './routes/settings';

const app = express();

// CORS origins din env
const allowedOrigins = (process.env.CLERK_ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((s) => s.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(apiLimiter);

// Logging requests basic
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Clerk middleware real
app.use(clerkMiddleware());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Mount routers under /api
app.use('/api', homeRouter);
app.use('/api', marketplaceRouter);
app.use('/api', cargoRouter);
app.use('/api', quotesRouter);
app.use('/api', dealsRouter);
app.use('/api', agentRouter);
app.use('/api', fleetRouter);
app.use('/api', settingsRouter);

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err?.message || 'Unexpected error');
  res.status(err?.status || 500).json({ error: 'Server error' });
});

const httpServer = createServer(app);
createSocketServer(httpServer);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => logger.info(`[backend] listening on http://localhost:${PORT}`));


