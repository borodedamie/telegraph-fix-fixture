# telegraph-fix-fixture

A small TypeScript project on zod 3, used to test [Telegraph PR Agent](https://github.com/borodedamie/telegraph-pr-agent)
on a real breaking upgrade: zod 3.25.75 → 4.x (3.25.76 until 23 Nov; moved so the bot buys a fresh answer after a miner update).

`src/user.ts` uses four zod 3 APIs that zod 4 removed: `required_error` / `invalid_type_error`,
one-argument `z.record`, `z.string().ip()` and `ZodError.errors`. `test/user.test.ts` checks the
behaviour that must survive the upgrade, including the exact error messages.

| State | Typecheck | Tests |
| --- | --- | --- |
| zod 3, as committed | passes | 6 of 6 pass |
| zod 4, code unchanged | 5 errors | fail |
| zod 4, correctly migrated | passes | 6 of 6 pass |

The Action runs here with the team's test wallet (Ethereum Sepolia test USDC). Its purchases and
PR outcomes are on this repository's `ledger` branch and on the
[dashboard](https://telegraph-pr-agent.vercel.app/?repo=borodedamie/telegraph-fix-fixture).
This is a team-owned test repository, not independent adoption.

```sh
npm ci
npm run typecheck
npm test
```
