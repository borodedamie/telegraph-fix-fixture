import { z } from "zod";

export const User = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be text",
  }),
  tags: z.record(z.string()),
  ip: z.string().ip({ message: "Not an IP address" }),
});

export type User = z.infer<typeof User>;

export type ParseResult =
  | { ok: true; user: User }
  | { ok: false; errors: string[] };

export const parseUser = (input: unknown): ParseResult => {
  const result = User.safeParse(input);
  if (result.success) return { ok: true, user: result.data };
  return { ok: false, errors: result.error.errors.map((issue) => issue.message) };
};
