import type { ComponentType, SVGProps } from "react";
import {
	ArrowDownToLineIcon,
	BadgeCheckIcon,
	BellRingIcon,
	CircleDollarSignIcon,
	CreditCardIcon,
	FileTextIcon,
	RefreshCwIcon,
	SendIcon,
	ShieldCheckIcon,
} from "lucide-react";

export type BillingStatus = "paid" | "overdue" | "draft" | "processing" | "scheduled";

export type BillingActivityItem = {
	id: string;
	type: "invoice" | "retainer" | "payment" | "reminder" | "payout";
	title: string;
	project: string;
	detail: string;
	status: BillingStatus;
	amount: string;
	meta: string;
	amountDetail: string;
	timestamp: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	operationalNote?: string;
	lineItems?: { label: string; amount: string }[];
	timeline?: string[];
	actions?: string[];
};

export type Retainer = {
	id: string;
	client: string;
	name: string;
	state: "active" | "paused" | "renewal";
	amount: string;
	renewal: string;
	method: string;
};

export type AttentionItem = {
	label: string;
	detail: string;
	status: BillingStatus;
};

export const billingActivity: BillingActivityItem[] = [
	{
		id: "inv-0042",
		type: "invoice",
		title: "Homepage Review",
		project: "Acme Website Redesign",
		detail: "Invoice #0042 · Due Aug 12",
		status: "paid",
		amount: "$8,400",
		meta: "via ACH",
		amountDetail: "$8,400 via ACH",
		timestamp: "Sent yesterday",
		icon: FileTextIcon,
		operationalNote: "Project phase unlocked after payment.",
		lineItems: [
			{ label: "Homepage design revisions", amount: "$2,000" },
			{ label: "Development sprint", amount: "$4,000" },
			{ label: "Launch prep", amount: "$2,400" },
		],
		timeline: ["Sent Aug 1", "Viewed Aug 2", "Paid Aug 2", "Receipt delivered"],
		actions: ["Send reminder", "Download PDF", "Duplicate"],
	},
	{
		id: "ret-nova",
		type: "retainer",
		title: "Nova Launch Retainer",
		project: "Nova Brand Launch",
		detail: "Monthly retainer · Auto-renewing",
		status: "overdue",
		amount: "$2,000",
		meta: "4 days late",
		amountDetail: "$2,000 due · 4 days late",
		timestamp: "Due Friday",
		icon: RefreshCwIcon,
		operationalNote: "Reminder scheduled after 3 overdue days.",
		lineItems: [
			{ label: "Launch support retainer", amount: "$2,000" },
			{ label: "Late payment grace period", amount: "$0" },
		],
		timeline: ["Auto-invoice sent Aug 5", "Viewed Aug 5", "Reminder sent Aug 8"],
		actions: ["Send reminder", "Pause deliverables", "Download PDF"],
	},
	{
		id: "pay-acme",
		type: "payment",
		title: "$4,000 received from Acme Studio",
		project: "Brand & SEO Retainer",
		detail: "via Visa ending 4242",
		status: "paid",
		amount: "$4,000",
		meta: "receipt delivered",
		amountDetail: "$4,000 via Visa ending 4242",
		timestamp: "Yesterday",
		icon: CircleDollarSignIcon,
	},
	{
		id: "inv-forge",
		type: "invoice",
		title: "Development Support",
		project: "Forge Fitness Portal",
		detail: "Invoice #0041 · Awaiting contract signature",
		status: "draft",
		amount: "$6,000",
		meta: "not sent",
		amountDetail: "$6,000 not sent",
		timestamp: "Draft",
		icon: FileTextIcon,
		operationalNote: "Delivery remains paused until contract approval.",
		lineItems: [
			{ label: "Support sprint", amount: "$3,500" },
			{ label: "Portal QA and launch", amount: "$2,500" },
		],
		timeline: ["Draft created Aug 7", "Contract signature pending"],
		actions: ["Send invoice", "Download PDF", "Duplicate"],
	},
	{
		id: "reminder-northstar",
		type: "reminder",
		title: "Reminder scheduled",
		project: "Northstar Growth Retainer",
		detail: "Sends after 3 days overdue",
		status: "scheduled",
		amount: "$3,200",
		meta: "automation active",
		amountDetail: "$3,200 watched by automation",
		timestamp: "Tomorrow",
		icon: BellRingIcon,
	},
	{
		id: "payout-friday",
		type: "payout",
		title: "Next payout",
		project: "Stripe connected account",
		detail: "$12,800 expected to bank account",
		status: "processing",
		amount: "$12,800",
		meta: "arrives Friday",
		amountDetail: "$12,800 arrives Friday",
		timestamp: "Processing",
		icon: ArrowDownToLineIcon,
	},
];

export const retainers: Retainer[] = [
	{
		id: "acme-studio",
		client: "Acme Studio",
		name: "Brand & SEO Retainer",
		state: "active",
		amount: "$4,000/mo",
		renewal: "Renews Sep 1",
		method: "Auto-paid via card",
	},
	{
		id: "northstar",
		client: "Northstar Labs",
		name: "Growth Operations Retainer",
		state: "active",
		amount: "$3,200/mo",
		renewal: "Renews Aug 28",
		method: "ACH on file",
	},
	{
		id: "forge-fitness",
		client: "Forge Fitness",
		name: "Development Support Retainer",
		state: "paused",
		amount: "$6,000/mo",
		renewal: "Awaiting renewal approval",
		method: "Deliverables paused",
	},
];

export const attentionItems: AttentionItem[] = [
	{ label: "3 invoices overdue", detail: "Acme Co. · 4 days late", status: "overdue" },
	{ label: "Failed subscription payment", detail: "Nova Studio", status: "overdue" },
	{ label: "Awaiting contract signature", detail: "Forge Fitness", status: "draft" },
];

export const billingAttentionSummary = [
	{ label: "3 overdue invoices", status: "overdue" as const },
	{ label: "payout Friday", status: "processing" as const },
	{ label: "1 failed payment", status: "overdue" as const },
	{ label: "contract signature waiting", status: "draft" as const },
];

export const billingAutomations = [
	{ icon: SendIcon, label: "Send reminder after 3 days overdue" },
	{ icon: ShieldCheckIcon, label: "Unlock project phase after payment" },
	{ icon: RefreshCwIcon, label: "Auto-send monthly retainers" },
	{ icon: BadgeCheckIcon, label: "Notify internal team on failed payment" },
];

export const paymentSettings = [
	{ icon: CreditCardIcon, label: "Client portal payments", value: "Enabled" },
	{ icon: ArrowDownToLineIcon, label: "Next payout", value: "Friday" },
	{ icon: ShieldCheckIcon, label: "Stripe account", value: "Connected" },
];
