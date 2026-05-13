import {
	ArrowDownToLineIcon,
	BellRingIcon,
	CircleDollarSignIcon,
	FileTextIcon,
	RefreshCwIcon,
} from "lucide-react";
import type { BillingIcon } from "./billing-data";

export const billingIconMap = {
	download: ArrowDownToLineIcon,
	invoice: FileTextIcon,
	payment: CircleDollarSignIcon,
	reminder: BellRingIcon,
	retainer: RefreshCwIcon,
} satisfies Record<BillingIcon, typeof FileTextIcon>;
