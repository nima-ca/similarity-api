const { z } = require("zod");

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().nonempty(),
  NEXTAUTH_URL: z.string().nonempty(),
  GOOGLE_CLIENT_ID: z.string().nonempty(),
  GOOGLE_CLIENT_SECRET: z.string().nonempty(),
  GITHUB_CLIENT_ID: z.string().nonempty(),
  GITHUB_CLIENT_SECRET: z.string().nonempty(),
  DATABASE_URL: z.string().nonempty(),
  OPENAI_API_KEY: z.string().nonempty(),
});

try {
  const env = envSchema.parse({
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  if (error instanceof z.ZodError) {
    const issues = error.issues.map((err) => err.path);
    throw new Error(`These environments variables are not provided: [
        ${issues.join(", ")}
    ]`);
  }
}
