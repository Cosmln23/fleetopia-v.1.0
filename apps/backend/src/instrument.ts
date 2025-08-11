import * as Sentry from '@sentry/node';
import '@sentry/profiling-node';

Sentry.init({
  dsn: process.env.SENTRY_DSN_BACKEND || undefined,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});


