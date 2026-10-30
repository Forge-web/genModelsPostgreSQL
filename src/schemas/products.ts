import {
	bigint,
	bigserial,
	decimal,
	integer,
	pgTable,
	varchar,
} from "drizzle-orm/pg-core";
import { productTypes } from "./productTypes";
import { genTimestamp } from "./helpers/columns.helpers";

export const products = pgTable("products", {
	id: bigserial("id", { mode: "bigint" }).primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	product_type: integer("product_type").references(
		() => productTypes.id,
		{ onDelete: "cascade" },
	),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	...genTimestamp,
});
