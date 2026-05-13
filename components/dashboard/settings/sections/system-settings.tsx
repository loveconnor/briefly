"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	OptionSetting,
	SettingRow,
	SettingsSection,
} from "../settings-layout";
import type { DirtyHandler, SheetHandler } from "../settings-types";

export function SecuritySettings({ onDirty }: { onDirty: DirtyHandler }) {
	const [sessionsOpen, setSessionsOpen] = useState(false);
	const [twoFactor, setTwoFactor] = useState("Required for admins");
	const [loginMethods, setLoginMethods] = useState("Email, Google");
	const [retention, setRetention] = useState("365 days");
	const [alerts, setAlerts] = useState("Owner and admins");

	return (
		<>
			<SettingsSection title="Access controls">
				<OptionSetting
					label="Two-factor authentication"
					onChange={(value) => {
						setTwoFactor(value);
						onDirty();
					}}
					options={[
						"Required for admins",
						"Required for all members",
						"Optional for all members",
						"Disabled",
					]}
					value={twoFactor}
				/>
				<OptionSetting
					label="Login methods"
					onChange={(value) => {
						setLoginMethods(value);
						onDirty();
					}}
					options={[
						"Email, Google",
						"Email only",
						"Google only",
						"Email, Google, SSO",
					]}
					value={loginMethods}
				/>
				<SettingRow title="Active sessions" value="12 active sessions">
					<Button
						onClick={() => setSessionsOpen(true)}
						size="sm"
						variant="outline"
					>
						Review
					</Button>
				</SettingRow>
			</SettingsSection>
			<SettingsSection title="Audit">
				<OptionSetting
					label="Security event retention"
					onChange={(value) => {
						setRetention(value);
						onDirty();
					}}
					options={["90 days", "180 days", "365 days", "Indefinitely"]}
					value={retention}
				/>
				<OptionSetting
					label="Sensitive action alerts"
					onChange={(value) => {
						setAlerts(value);
						onDirty();
					}}
					options={[
						"Owner and admins",
						"Owner only",
						"All admins",
						"Security channel",
					]}
					value={alerts}
				/>
			</SettingsSection>
			<SessionsDialog onClose={() => setSessionsOpen(false)} open={sessionsOpen} />
		</>
	);
}

export function ApiSettings({ onOpenSheet }: { onOpenSheet: SheetHandler }) {
	const [tokensOpen, setTokensOpen] = useState(false);
	const [secret, setSecret] = useState("**** **** **** 4721");

	return (
		<>
			<SettingsSection title="Developer access">
				<SettingRow title="API tokens" value="2 active tokens">
					<Button
						onClick={() => setTokensOpen(true)}
						size="sm"
						variant="outline"
					>
						Manage
					</Button>
				</SettingRow>
				<SettingRow title="Webhook setup" value="3 endpoints">
					<Button
						onClick={() =>
							onOpenSheet({
								title: "Webhook setup",
								description:
									"Configure endpoints, signing secrets, and delivery retries.",
								content: "webhook",
							})
						}
						size="sm"
						variant="outline"
					>
						Open
					</Button>
				</SettingRow>
				<EditableSecret value={secret} onChange={setSecret} />
			</SettingsSection>
			<ApiTokensDialog onClose={() => setTokensOpen(false)} open={tokensOpen} />
		</>
	);
}

export function DataSettings({ onDirty }: { onDirty: DirtyHandler }) {
	const [exportOpen, setExportOpen] = useState(false);
	const [retention, setRetention] = useState("Keep deleted items for 90 days");
	const [clientRequests, setClientRequests] = useState("Owner approval required");

	return (
		<>
			<SettingsSection title="Exports and retention">
				<SettingRow title="Workspace export" value="Projects, clients, files, logs">
					<Button
						onClick={() => setExportOpen(true)}
						size="sm"
						variant="outline"
					>
						Prepare export
					</Button>
				</SettingRow>
				<OptionSetting
					label="Data retention"
					onChange={(value) => {
						setRetention(value);
						onDirty();
					}}
					options={[
						"Keep deleted items for 30 days",
						"Keep deleted items for 90 days",
						"Keep deleted items for 180 days",
						"Keep deleted items indefinitely",
					]}
					value={retention}
				/>
				<OptionSetting
					label="Client data requests"
					onChange={(value) => {
						setClientRequests(value);
						onDirty();
					}}
					options={[
						"Owner approval required",
						"Admin approval required",
						"Auto-approve verified requests",
						"Disable client requests",
					]}
					value={clientRequests}
				/>
			</SettingsSection>
			<ExportDialog onClose={() => setExportOpen(false)} open={exportOpen} />
		</>
	);
}

export function LogsSettings() {
	return (
		<SettingsSection title="Recent system events">
			<p className="text-sm text-muted-foreground">
				System events will appear here after audit logging records activity.
			</p>
		</SettingsSection>
	);
}

function SessionsDialog({ onClose, open }: { onClose: () => void; open: boolean }) {
	return (
		<Dialog onOpenChange={(nextOpen) => !nextOpen && onClose()} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Active sessions</DialogTitle>
					<DialogDescription>
						Review current workspace sessions and revoke access when needed.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-3">
					<p className="rounded-lg bg-muted/45 p-3 text-sm text-muted-foreground">
						Session records will appear here after session tracking records activity.
					</p>
				</div>
				<DialogFooter>
					<DialogClose render={<Button>Done</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function ApiTokensDialog({ onClose, open }: { onClose: () => void; open: boolean }) {
	const [tokenName, setTokenName] = useState("");

	return (
		<Dialog onOpenChange={(nextOpen) => !nextOpen && onClose()} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>API tokens</DialogTitle>
					<DialogDescription>
						Create, review, and revoke tokens used by integrations and scripts.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<p className="rounded-lg bg-muted/45 p-3 text-sm text-muted-foreground">
						Tokens created in this workspace will appear here.
					</p>
					<label className="block space-y-2">
						<span className="text-sm font-medium">New token name</span>
						<Input
							onChange={(event) => setTokenName(event.target.value)}
							placeholder="Internal reporting"
							value={tokenName}
						/>
					</label>
				</div>
				<DialogFooter>
					<DialogClose render={<Button variant="ghost">Cancel</Button>} />
					<Button disabled={!tokenName.trim()} onClick={onClose}>Create token</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function ExportDialog({ onClose, open }: { onClose: () => void; open: boolean }) {
	return (
		<Dialog onOpenChange={(nextOpen) => !nextOpen && onClose()} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Prepare workspace export</DialogTitle>
					<DialogDescription>
						Choose what to include. Briefly will prepare a downloadable archive.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-3">
					{["Projects", "Clients", "Files", "Logs", "Billing records"].map((item) => (
						<label className="flex items-center gap-3 text-sm" key={item}>
							<Checkbox defaultChecked />
							{item}
						</label>
					))}
				</div>
				<DialogFooter>
					<DialogClose render={<Button variant="ghost">Cancel</Button>} />
					<Button onClick={onClose}>Prepare export</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function EditableSecret({
	onChange,
	value,
}: {
	onChange: (value: string) => void;
	value: string;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [draft, setDraft] = useState(value);

	if (isEditing) {
		return (
			<SettingRow title="Signing secret">
				<div className="flex gap-2">
					<Input onChange={(event) => setDraft(event.target.value)} value={draft} />
					<Button
						onClick={() => {
							onChange(draft);
							setIsEditing(false);
						}}
						size="sm"
					>
						Done
					</Button>
				</div>
			</SettingRow>
		);
	}

	return (
		<SettingRow title="Signing secret" value={value}>
			<Button onClick={() => setIsEditing(true)} size="sm" variant="outline">
				Edit
			</Button>
		</SettingRow>
	);
}
