const express = require('express');

module.exports = function createApp() {
  const app = express();
  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.get('/{*splat}', (_req, res) => res.status(404).send('Not found'));
  return app;
};
