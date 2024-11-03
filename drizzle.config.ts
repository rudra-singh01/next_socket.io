import type { Config } from "drizzle-kit";

const config: Config = {
    schema: "./src/utils/schema.tsx",
    dialect: "postgresql",
    dbCredentials: {
        url:'postgresql://neondb_owner:AVYSeQb6FHR0@ep-solitary-cell-a568pkkj.us-east-2.aws.neon.tech/todo?sslmode=require',
    }
};

export default config;