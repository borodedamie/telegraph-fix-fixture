const assert = require('node:assert/strict');
const { once } = require('node:events');
const test = require('node:test');
const createApp = require('./app.cjs');

for (const [path, status, body] of [
  ['/health', 200, '{"ok":true}'],
  ['/', 404, 'Not found'],
  ['/missing/deep', 404, 'Not found'],
]) {
  test(`GET ${path} returns ${status}`, async (t) => {
    const server = createApp().listen(0, '127.0.0.1');
    t.after(() => server.close());
    await once(server, 'listening');
    const response = await fetch(`http://127.0.0.1:${server.address().port}${path}`);
    assert.equal(response.status, status);
    assert.equal(await response.text(), body);
  });
}
