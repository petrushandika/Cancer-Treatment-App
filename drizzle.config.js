import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://cancer-treatment_owner:vVXu9ge3AQjC@ep-odd-frog-a5ruqq4g.us-east-2.aws.neon.tech/cancer-treatment?sslmode=require",
  },
});
