"use client";

import { useState } from "react";

import { Switch } from "@/components/ui/switch";
import {
	OptionSelectControl,
	OptionSetting,
	SettingRow,
	SettingsSection,
} from "../settings-layout";
import type { DirtyHandler } from "../settings-types";

export function PortalSettings({ onDirty }: { onDirty: DirtyHandler }) {
	const [portalAccessExpiry, setPortalAccessExpiry] = useState(
		"Never expire by default"
	);
	const [clientFileDownloads, setClientFileDownloads] = useState(
		"Enabled for approved deliverables"
	);

	return (
		<>
			<SettingsSection
				title="Client visibility"
				description="Every portal setting explains what the client experiences."
			>
				<SettingRow
					title="Enable client portals"
					description="Clients can access live project phases, files, updates, and approvals."
				>
					<Switch defaultChecked onCheckedChange={onDirty} />
				</SettingRow>
				<SettingRow
					title="Allow client uploads"
					description="Clients can upload files directly into project phases."
				>
					<Switch defaultChecked onCheckedChange={onDirty} />
				</SettingRow>
				<SettingRow
					title="Show internal phase names"
					description="Clients see agency phase labels instead of simplified client labels."
				>
					<Switch onCheckedChange={onDirty} />
				</SettingRow>
			</SettingsSection>
			<SettingsSection title="Advanced">
				<OptionSetting
					label="Portal access expiry"
					onChange={(value) => {
						setPortalAccessExpiry(value);
						onDirty();
					}}
					options={[
						"Never expire by default",
						"Expire after 30 days",
						"Expire after 90 days",
						"Expire when project closes",
					]}
					value={portalAccessExpiry}
				/>
				<OptionSetting
					label="Client file downloads"
					onChange={(value) => {
						setClientFileDownloads(value);
						onDirty();
					}}
					options={[
						"Enabled for approved deliverables",
						"Enabled for all visible files",
						"Require approval before download",
						"Disabled",
					]}
					value={clientFileDownloads}
				/>
			</SettingsSection>
		</>
	);
}

export function ApprovalSettings({ onDirty }: { onDirty: DirtyHandler }) {
	const [approvalReminders, setApprovalReminders] = useState(
		"Every 3 business days"
	);

	return (
		<SettingsSection title="Approval behavior">
			<SettingRow
				title="Enable client approvals"
				description="Clients can approve deliverables directly inside their portal."
			>
				<Switch defaultChecked onCheckedChange={onDirty} />
			</SettingRow>
			<SettingRow
				title="Require approval notes"
				description="Clients must leave a note when requesting changes."
			>
				<Switch defaultChecked onCheckedChange={onDirty} />
			</SettingRow>
			<OptionSetting
				label="Approval reminders"
				onChange={(value) => {
					setApprovalReminders(value);
					onDirty();
				}}
				options={[
					"Every business day",
					"Every 3 business days",
					"Every 5 business days",
					"Weekly",
					"Never",
				]}
				value={approvalReminders}
			/>
		</SettingsSection>
	);
}

export function NotificationSettings({ onDirty }: { onDirty: DirtyHandler }) {
	const [approvalNotifications, setApprovalNotifications] = useState(
		"#approvals and email"
	);
	const [fileUploadNotifications, setFileUploadNotifications] =
		useState("#project-ops");
	const [quietHours, setQuietHours] = useState("6:00 PM to 8:00 AM");

	return (
		<SettingsSection title="Routing">
			<OptionSetting
				label="Client approval notifications"
				onChange={(value) => {
					setApprovalNotifications(value);
					onDirty();
				}}
				options={[
					"#approvals and email",
					"#project-ops only",
					"Email only",
					"Assigned project lead",
				]}
				value={approvalNotifications}
			/>
			<OptionSetting
				label="File upload notifications"
				onChange={(value) => {
					setFileUploadNotifications(value);
					onDirty();
				}}
				options={[
					"#project-ops",
					"#files",
					"Project channel",
					"Assigned project lead",
					"Do not notify",
				]}
				value={fileUploadNotifications}
			/>
			<SettingRow title="Quiet hours">
				<OptionSelectControl
					label="Quiet hours window"
					onChange={(value) => {
						setQuietHours(value);
						onDirty();
					}}
					options={[
						"6:00 PM to 8:00 AM",
						"5:00 PM to 9:00 AM",
						"8:00 PM to 7:00 AM",
						"Disabled",
					]}
					value={quietHours}
					width="w-56"
				/>
				<Switch defaultChecked onCheckedChange={onDirty} />
			</SettingRow>
		</SettingsSection>
	);
}

export function UpdatesSettings({ onDirty }: { onDirty: DirtyHandler }) {
	const [defaultAudience, setDefaultAudience] = useState("Client-visible");
	const [internalNotes, setInternalNotes] = useState("Hidden from client portals");
	const [approvalTemplate, setApprovalTemplate] = useState(
		"Concise summary + next action"
	);

	return (
		<SettingsSection title="Update defaults">
			<OptionSetting
				label="Default audience"
				onChange={(value) => {
					setDefaultAudience(value);
					onDirty();
				}}
				options={["Client-visible", "Internal only", "Project team", "Draft"]}
				value={defaultAudience}
			/>
			<OptionSetting
				label="Internal notes"
				onChange={(value) => {
					setInternalNotes(value);
					onDirty();
				}}
				options={[
					"Hidden from client portals",
					"Visible to internal team",
					"Visible to admins only",
				]}
				value={internalNotes}
			/>
			<OptionSetting
				label="Approval update template"
				onChange={(value) => {
					setApprovalTemplate(value);
					onDirty();
				}}
				options={[
					"Concise summary + next action",
					"Detailed changelog",
					"Approval request",
					"Milestone recap",
				]}
				value={approvalTemplate}
			/>
		</SettingsSection>
	);
}
