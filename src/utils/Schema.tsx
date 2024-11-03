import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const todo = pgTable("todo", {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    comment: text("comment").notNull(),
    timestamp: timestamp("createdAt", { mode: 'string' }).defaultNow(),
});

