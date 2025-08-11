import * as Sentry from '@sentry/nextjs';

if (process.env.NEXT_PUBLIC_SENTRY_DSN_FRONTEND) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN_FRONTEND,
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV || 'development',
  });
}


