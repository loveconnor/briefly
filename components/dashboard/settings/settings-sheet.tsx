"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SegmentedControl } from "./settings-layout";
import type { SheetState } from "./settings-types";

export function SettingsSheet({
	onClose,
	sheet,
}: {
	onClose: () => void;
	sheet: SheetState;
}) {
	return (
		<Sheet onOpenChange={(open) => !open && onClose()} open={Boolean(sheet)}>
			<SheetContent className="w-[calc(100%-(--spacing(8)))] max-w-md overflow-y-auto p-0 sm:max-w-lg">
				{sheet ? (
					<>
						<SheetHeader className="border-b p-6">
							<SheetTitle className="text-xl">{sheet.title}</SheetTitle>
							<SheetDescription>{sheet.description}</SheetDescription>
						</SheetHeader>
						<div className="space-y-8 p-6">
							<SheetEditor sheet={sheet} />
							<div className="flex justify-end gap-2 border-t pt-5">
								<Button onClick={onClose} variant="ghost">
									Cancel
								</Button>
								<Button onClick={onClose}>Save</Button>
							</div>
						</div>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	);
}

function SheetEditor({ sheet }: { sheet: NonNullable<SheetState> }) {
	switch (sheet.content) {
		case "member":
			return <MemberEditor />;
		case "domain":
			return <DomainEditor />;
		case "role":
			return <RoleEditor role={sheet.title} />;
		case "automation":
			return <AutomationEditor />;
		case "invoice":
			return <InvoiceEditor />;
		case "webhook":
			return <WebhookEditor />;
	}
}

function MemberEditor() {
	const [role, setRole] = useState("Admin");

	return (
		<>
			<SheetField label="Role">
				<SegmentedControl
					onChange={setRole}
					options={["Admin", "Project lead", "Client"]}
					value={role}
				/>
			</SheetField>
			<SheetGroup
				title="Assigned projects"
				description="Choose the project spaces this member can access."
			>
				<p className="text-sm text-muted-foreground">
					Project assignments will appear after projects are stored in the workspace database.
				</p>
			</SheetGroup>
			<SheetGroup
				title="Access"
				description="Fine tune sensitive workspace areas for this member."
			>
				<ToggleRow
					defaultChecked
					label="Can manage billing"
					text="Allows invoice and payout settings access."
				/>
				<ToggleRow
					defaultChecked
					label="Can invite members"
					text="Allows inviting internal and client users."
				/>
				<ToggleRow
					label="Require password reset"
					text="Prompts this member to reset credentials on next login."
				/>
			</SheetGroup>
		</>
	);
}

function DomainEditor() {
	return (
		<>
			<SheetField label="Domain">
				<Input />
			</SheetField>
			<SheetField label="Redirect target">
				<Input />
			</SheetField>
			<SheetGroup
				title="DNS records"
				description="Copy these records into your DNS provider before verifying."
			>
				<ReadonlyRecord label="CNAME" value="cname.briefly.so" />
				<ReadonlyRecord label="TXT" value="briefly-verify=studio-4821" />
			</SheetGroup>
			<ToggleRow
				defaultChecked
				label="Use as primary client portal domain"
				text="Client portal links will prefer this branded URL."
			/>
		</>
	);
}

function RoleEditor({ role }: { role: string }) {
	const isOwner = role === "Owner";

	return (
		<>
			<SheetField label="Role name">
				<Input defaultValue={role} disabled={isOwner} />
			</SheetField>
			<SheetField label="Description">
				<Textarea
					defaultValue={
						isOwner
							? "Full workspace administration and billing ownership."
							: "Configurable workspace access for project delivery."
					}
				/>
			</SheetField>
			<SheetGroup
				title="Permissions"
				description="Control what this role can view, change, and approve."
			>
				{[
					"Manage projects",
					"Manage portals",
					"Approve deliverables",
					"Manage billing",
					"Manage members",
					"Edit workspace settings",
				].map((permission, index) => (
					<CheckboxRow
						defaultChecked={isOwner || index < 3}
						disabled={isOwner}
						key={permission}
						label={permission}
					/>
				))}
			</SheetGroup>
			{isOwner ? (
				<p className="rounded-md bg-muted/55 px-3 py-2 text-sm text-muted-foreground">
					Owner permissions are fixed so the workspace always has a full
					administrator.
				</p>
			) : null}
		</>
	);
}

function AutomationEditor() {
	const [reminderDelay, setReminderDelay] = useState("3 days");

	return (
		<>
			<SheetField label="Reminder delay">
				<SegmentedControl
					onChange={setReminderDelay}
					options={["1 day", "3 days", "5 days"]}
					value={reminderDelay}
				/>
			</SheetField>
			<SheetField label="Retry attempts">
				<Input defaultValue="2" inputMode="numeric" />
			</SheetField>
			<SheetField label="Escalate to">
				<Input defaultValue="Project lead" />
			</SheetField>
			<SheetGroup title="Behavior">
				<ToggleRow
					defaultChecked
					label="Pause after final retry"
					text="Prevents repeated client notifications."
				/>
				<ToggleRow
					label="Expose automation activity to clients"
					text="Shows automated reminders in the portal activity feed."
				/>
			</SheetGroup>
		</>
	);
}

function InvoiceEditor() {
	const [paymentTerms, setPaymentTerms] = useState("Net 15");

	return (
		<>
			<SheetField label="Payment terms">
				<SegmentedControl
					onChange={setPaymentTerms}
					options={["Due now", "Net 15", "Net 30"]}
					value={paymentTerms}
				/>
			</SheetField>
			<SheetField label="Currency">
				<Input defaultValue="USD" />
			</SheetField>
			<SheetField label="Invoice footer">
				<Textarea />
			</SheetField>
			<SheetGroup title="Payment methods">
				<CheckboxRow defaultChecked label="Card payments" />
				<CheckboxRow defaultChecked label="ACH transfers" />
				<CheckboxRow label="Wire transfer instructions" />
			</SheetGroup>
		</>
	);
}

function WebhookEditor() {
	return (
		<>
			<SheetField label="Endpoint URL">
				<Input />
			</SheetField>
			<SheetField label="Signing secret">
				<Input />
			</SheetField>
			<SheetGroup
				title="Events"
				description="Choose the events this endpoint receives."
			>
				<CheckboxRow defaultChecked label="approval.completed" />
				<CheckboxRow defaultChecked label="file.uploaded" />
				<CheckboxRow defaultChecked label="invoice.paid" />
				<CheckboxRow label="member.invited" />
			</SheetGroup>
			<ToggleRow
				defaultChecked
				label="Retry failed deliveries"
				text="Briefly will retry failed webhook deliveries for 24 hours."
			/>
		</>
	);
}

function SheetGroup({
	children,
	description,
	title,
}: {
	children: ReactNode;
	description?: string;
	title: string;
}) {
	return (
		<section>
			<h3 className="text-sm font-semibold">{title}</h3>
			{description ? (
				<p className="mt-1 text-sm leading-6 text-muted-foreground">
					{description}
				</p>
			) : null}
			<div className="mt-4 space-y-3">{children}</div>
		</section>
	);
}

function SheetField({
	children,
	label,
}: {
	children: ReactNode;
	label: string;
}) {
	return (
		<label className="block space-y-2">
			<span className="text-sm font-medium">{label}</span>
			{children}
		</label>
	);
}

function ToggleRow({
	defaultChecked,
	label,
	text,
}: {
	defaultChecked?: boolean;
	label: string;
	text: string;
}) {
	return (
		<div className="flex items-start justify-between gap-4">
			<div>
				<div className="text-sm font-medium">{label}</div>
				<p className="mt-1 text-sm leading-5 text-muted-foreground">{text}</p>
			</div>
			<Switch defaultChecked={defaultChecked} />
		</div>
	);
}

function CheckboxRow({
	defaultChecked,
	disabled,
	label,
}: {
	defaultChecked?: boolean;
	disabled?: boolean;
	label: string;
}) {
	return (
		<label className="flex items-center gap-3 text-sm">
			<Checkbox defaultChecked={defaultChecked} disabled={disabled} />
			<span className={disabled ? "text-muted-foreground" : undefined}>
				{label}
			</span>
		</label>
	);
}

function ReadonlyRecord({ label, value }: { label: string; value: string }) {
	return (
		<div className="grid gap-2 rounded-md bg-muted/45 p-3 text-sm">
			<div className="font-medium">{label}</div>
			<code className="break-all font-mono text-xs text-muted-foreground">
				{value}
			</code>
		</div>
	);
}
