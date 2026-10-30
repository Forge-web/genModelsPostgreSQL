import {
	bigint,
	integer,
	numeric,
	pgTable,
	uuid,
} from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers";
import { products } from "./products";
import { invoice } from "./invoice";
import { SQL, sql } from "drizzle-orm";

export const productItems = pgTable("product_items", {
	...genId,
	product_id: bigint("product_id", { mode: "bigint" })
		.references(() => products.id, { onDelete: "restrict" })
		.notNull(),
	invoice_id: uuid("invoice_id")
		.references(() => invoice.id, { onDelete: "set null" })
		.notNull(),
	quantity: numeric("quantity", {
		precision: 10,
		scale: 2,
	}).notNull(),
	price: numeric("price", { precision: 10, scale: 2 }),
	quantity_sum: numeric("quantity_sum", {
		precision: 10,
		scale: 2,
	}).generatedAlwaysAs(
		(): SQL => sql`${productItems.quantity} * ${productItems.price}`,
	),
	...genTimestamp,
});
