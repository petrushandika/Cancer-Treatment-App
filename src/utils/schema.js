import { sql } from "drizzle-orm";
import { integer, varchar, pgTable, serial, text } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username").notNull(),
  age: integer("age").notNull(),
  location: varchar("location").notNull(),
  createdBy: varchar("createdBy").notNull(),
});

export const Records = pgTable("records", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .references(() => Users.id)
    .notNull(),
  recordName: varchar("recordName").notNull(),
  analysisResult: varchar("analysisResult").notNull(),
  kanbanRecords: varchar("kanbanRecords").notNull(),
  createdBy: varchar("createdBy").notNull(),
});
