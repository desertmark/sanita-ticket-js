import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://d00e9c0b431040d0e9029bfc806891fc@o4510302920966144.ingest.de.sentry.io/4510302923194448',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
export default Sentry;
