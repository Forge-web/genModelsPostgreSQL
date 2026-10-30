import { integer, numeric, pgTable, uuid } from "drizzle-orm/pg-core";
import { genId, genTimestamp } from "./helpers/columns.helpers";
import { users } from "./users";
import { organizations } from "./organizations";
import { paymentTypes } from "./paymetTypes";

export const receipts = pgTable("receipts", {
	...genId,
	users_id: uuid("users_id")
		.references(() => users.id)
		.notNull(),
	organizations_id: uuid("organizations_id")
		.references(() => organizations.id, { onDelete: "set null" })
		.notNull(),
	payment_types: integer("payment_types")
		.references(() => paymentTypes.id)
		.notNull(),
	check_sum: numeric("check_sum", {
		precision: 10,
		scale: 2,
	}).notNull(),
	...genTimestamp,
});
