import {
	bigint,
	numeric,
	pgTable,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers";
import { productItems } from "./product_items";
import { receipts } from "./receipt";
import { sql, SQL } from "drizzle-orm";
import { products } from "./products";

export const receipt_positions = pgTable("receipt_positions", {
	...genId,
	product_items_id: uuid("product_items_id")
		.references(() => productItems.id, { onDelete: "set null" })
		.notNull(),
	product_id: bigint("product_id", { mode: "bigint" })
		.references(() => products.id, { onDelete: "set null" })
		.notNull(),
	receipt_id: uuid("receipt_id")
		.references(() => receipts.id, { onDelete: "restrict" })
		.notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	quantity: numeric("quantity", {
		precision: 10,
		scale: 2,
	}).notNull(),
	price: numeric("price", {
		precision: 10,
		scale: 2,
	}).notNull(),
	sum: numeric("sum", {
		precision: 10,
		scale: 2,
	}).generatedAlwaysAs(
		(): SQL =>
			sql`${receipt_positions.price} * ${receipt_positions.quantity} `,
	),
	...genTimestamp,
});
