import assert from "node:assert/strict";
import { test } from "node:test";
import { parseUser } from "../src/user.js";

const valid = { name: "Ada", tags: { team: "core" }, ip: "127.0.0.1" };

test("accepts a valid user", () => {
  assert.deepEqual(parseUser(valid), { ok: true, user: valid });
});

test("says when the name is missing", () => {
  const { name: _name, ...rest } = valid;
  assert.deepEqual(parseUser(rest), { ok: false, errors: ["Name is required"] });
});

test("says when the name is not text", () => {
  assert.deepEqual(parseUser({ ...valid, name: 42 }), { ok: false, errors: ["Name must be text"] });
});

test("rejects tags that are not strings", () => {
  const result = parseUser({ ...valid, tags: { team: 1 } });
  assert.equal(result.ok, false);
});

test("rejects an address that is not an IP", () => {
  assert.deepEqual(parseUser({ ...valid, ip: "nope" }), { ok: false, errors: ["Not an IP address"] });
});

test("accepts an IPv6 address", () => {
  assert.equal(parseUser({ ...valid, ip: "::1" }).ok, true);
});
