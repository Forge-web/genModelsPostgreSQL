import { numeric, pgTable, uuid } from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers";
import { productItems } from "./product_items";
import { receipts } from "./receipt";

export const items = pgTable("items", {
	...genId,
	product_items_id: uuid("product_items_id")
		.references(() => productItems.id, { onDelete: "restrict" })
		.notNull(),
	receipt_id: uuid("receipt_id")
		.references(() => receipts.id, { onDelete: "restrict" })
		.notNull(),
	quantity: numeric("quantity", {
		precision: 10,
		scale: 2,
	}).notNull(),
	items_sum: numeric("items_sum", {
		precision: 10,
		scale: 2,
	}).notNull(),
	...genTimestamp,
});
