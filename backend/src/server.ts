import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { createSocketServer } from './ws/index.js';
import { apiLimiter } from './lib/rateLimit.js';
import { logger } from './lib/logger.js';
import { clerkMiddleware } from './util/clerk.js';

// Routers
import homeRouter from './routes/home.js';
import marketplaceRouter from './routes/marketplace.js';
import cargoRouter from './routes/cargo.js';
import quotesRouter from './routes/quotes.js';
import dealsRouter from './routes/deals.js';
import agentRouter from './routes/agent.js';
import fleetRouter from './routes/fleet.js';
import settingsRouter from './routes/settings.js';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(apiLimiter);
app.use(clerkMiddleware);

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
  logger.error(String(err?.message || err));
  res.status(500).json({ error: 'Internal Server Error' });
});

const httpServer = createServer(app);
createSocketServer(httpServer);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => logger.info(`[backend] listening on http://localhost:${PORT}`));


