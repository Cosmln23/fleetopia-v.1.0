import { Server } from 'socket.io';
import type { Server as HttpServer } from 'http';
import { logger } from '../lib/logger.js';

export function createSocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    logger.info(`socket connected ${socket.id}`);
    socket.on('disconnect', () => logger.info(`socket disconnected ${socket.id}`));
  });
  return io;
}


