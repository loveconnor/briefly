"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	OptionSetting,
	SettingRow,
	SettingsSection,
} from "../settings-layout";
import type { DirtyHandler, SheetHandler } from "../settings-types";

export function AutomationSettings({
	onDirty,
}: {
	onDirty: DirtyHandler;
}) {
	const [reminderDefaults, setReminderDefaults] = useState("3 business days");
	const [retryRules, setRetryRules] = useState("Retry twice before pausing");
	const [escalationBehavior, setEscalationBehavior] =
		useState("Notify project lead");
	const [automationVisibility, setAutomationVisibility] =
		useState("Internal only");

	return (
		<SettingsSection
			title="Automation behavior"
			description="Configure defaults and routing without recreating the automation builder."
		>
			<OptionSetting
				label="Reminder defaults"
				onChange={(value) => {
					setReminderDefaults(value);
					onDirty();
				}}
				options={[
					"1 business day",
					"3 business days",
					"5 business days",
					"Weekly",
				]}
				value={reminderDefaults}
			/>
			<OptionSetting
				label="Retry rules"
				onChange={(value) => {
					setRetryRules(value);
					onDirty();
				}}
				options={[
					"Retry once before pausing",
					"Retry twice before pausing",
					"Retry three times before pausing",
					"Pause immediately",
				]}
				value={retryRules}
			/>
			<OptionSetting
				label="Escalation behavior"
				onChange={(value) => {
					setEscalationBehavior(value);
					onDirty();
				}}
				options={[
					"Notify project lead",
					"Notify workspace admins",
					"Notify project lead and admins",
					"Do not escalate",
				]}
				value={escalationBehavior}
			/>
			<OptionSetting
				label="Automation visibility"
				onChange={(value) => {
					setAutomationVisibility(value);
					onDirty();
				}}
				options={[
					"Internal only",
					"Visible in client portal",
					"Visible to admins only",
				]}
				value={automationVisibility}
			/>
		</SettingsSection>
	);
}

export function BillingSettings({ onOpenSheet }: { onOpenSheet: SheetHandler }) {
	return (
		<>
			<SettingsSection title="Financial setup">
				<SettingRow
					title="Payout account"
					value="Stripe connected"
					status={<Badge variant="success">Connected</Badge>}
				>
					<Button size="sm" variant="outline">
						Manage
					</Button>
				</SettingRow>
				<SettingRow
					title="Tax info"
					value="W-9 verified"
					status={<Badge variant="success">Verified</Badge>}
				/>
			</SettingsSection>
			<SettingsSection title="Invoices">
				<SettingRow title="Invoice defaults" value="Net 15, USD">
					<Button
						onClick={() =>
							onOpenSheet({
								title: "Invoice defaults",
								description:
									"Edit due dates, terms, tax display, and footer notes.",
								content: "invoice",
							})
						}
						size="sm"
						variant="outline"
					>
						Edit
					</Button>
				</SettingRow>
				<SettingRow title="Client payment methods" value="Cards and ACH" />
				<SettingRow
					title="Auto reminders"
					value="Before due, due date, 7 days late"
				/>
			</SettingsSection>
		</>
	);
}

export function TemplateSettings({ onDirty }: { onDirty: DirtyHandler }) {
	const [portalSections, setPortalSections] = useState("Hidden until assigned");
	const [automationStartingPoints, setAutomationStartingPoints] =
		useState("Draft state");
	const [defaultOwner, setDefaultOwner] = useState("Project lead");

	return (
		<SettingsSection title="Template defaults">
			<OptionSetting
				label="Portal sections"
				onChange={(value) => {
					setPortalSections(value);
					onDirty();
				}}
				options={[
					"Hidden until assigned",
					"Visible by default",
					"Visible after project kickoff",
					"Manual visibility per section",
				]}
				value={portalSections}
			/>
			<OptionSetting
				label="Automation starting points"
				onChange={(value) => {
					setAutomationStartingPoints(value);
					onDirty();
				}}
				options={[
					"Draft state",
					"Enabled when template is used",
					"Ask during project setup",
					"Disabled by default",
				]}
				value={automationStartingPoints}
			/>
			<OptionSetting
				label="Default owner"
				onChange={(value) => {
					setDefaultOwner(value);
					onDirty();
				}}
				options={["Project lead", "Workspace owner", "Template creator", "Unassigned"]}
				value={defaultOwner}
			/>
		</SettingsSection>
	);
}

export function IntegrationSettings() {
	return (
		<SettingsSection
			title="Connected services"
			description="Status-first rows keep integrations calm and readable."
		>
			<SettingRow
				title="Stripe"
				description="Handles invoices, payouts, and client payment methods."
				value="Last payout Friday"
				status={<Badge variant="success">Connected</Badge>}
			>
				<Button size="sm" variant="ghost">
					Manage connection
				</Button>
			</SettingRow>
			<SettingRow
				title="Slack"
				description="Routes project and approval notifications."
				value="#project-ops"
				status={<Badge variant="success">Connected</Badge>}
			/>
			<SettingRow
				title="Google Drive"
				description="Syncs approved deliverables and shared files."
				value="Needs reauthorization"
				status={<Badge variant="warning">Attention</Badge>}
			/>
		</SettingsSection>
	);
}
