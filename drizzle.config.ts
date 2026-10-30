import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	out: "./drizzle",
	schema: "./src/schemas",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
