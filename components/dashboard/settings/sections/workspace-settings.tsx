"use client";

import { useState, type ReactNode } from "react";
import { ChevronRightIcon, UploadIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { members } from "../settings-data";
import {
	SegmentedControl,
	OptionSetting,
	SettingRow,
	SettingsSection,
} from "../settings-layout";
import type { DirtyHandler, SheetHandler } from "../settings-types";

export function GeneralSettings({ onDirty }: { onDirty: DirtyHandler }) {
	const [workspaceName, setWorkspaceName] = useState("Briefly Studio");
	const [workspaceUrl, setWorkspaceUrl] = useState("briefly.so/studio");
	const [timezone, setTimezone] = useState("Eastern Time (UTC-5)");
	const [dateFormat, setDateFormat] = useState("May 10, 2026");
	const [currency, setCurrency] = useState("USD");
	const [projectView, setProjectView] = useState("List");
	const [visibility, setVisibility] = useState("Internal");
	const [dangerDialog, setDangerDialog] = useState<"transfer" | "delete" | null>(
		null
	);

	return (
		<>
			<SettingsSection
				title="Workspace identity"
				description="Stable identifiers used across projects, portals, and client communications."
			>
				<EditableTextSetting
					label="Workspace name"
					onChange={(value) => {
						setWorkspaceName(value);
						onDirty();
					}}
					value={workspaceName}
				/>
				<EditableTextSetting
					actionLabel="Change"
					description="Clients see this base path when visiting shared portals."
					label="Workspace URL"
					onChange={(value) => {
						setWorkspaceUrl(value);
						onDirty();
					}}
					value={workspaceUrl}
				/>
				<SelectSetting
					label="Timezone"
					onChange={(value) => {
						setTimezone(value);
						onDirty();
					}}
					options={[
						"Eastern Time (UTC-5)",
						"Central Time (UTC-6)",
						"Mountain Time (UTC-7)",
						"Pacific Time (UTC-8)",
						"UTC",
					]}
					value={timezone}
				/>
			</SettingsSection>

			<SettingsSection title="Defaults">
				<SelectSetting
					label="Date formatting"
					onChange={(value) => {
						setDateFormat(value);
						onDirty();
					}}
					options={[
						"May 10, 2026",
						"10 May 2026",
						"05/10/2026",
						"10/05/2026",
						"2026-05-10",
					]}
					value={dateFormat}
				/>
				<SelectSetting
					label="Currency"
					onChange={(value) => {
						setCurrency(value);
						onDirty();
					}}
					options={["USD", "CAD", "EUR", "GBP", "AUD"]}
					value={currency}
				/>
				<SettingRow title="Default project view">
					<SegmentedControl
						onChange={(value) => {
							setProjectView(value);
							onDirty();
						}}
						options={["List", "Board", "Timeline"]}
						value={projectView}
					/>
				</SettingRow>
				<SettingRow
					title="Default visibility"
					description="New projects start with this visibility until a manager changes it."
				>
					<SegmentedControl
						onChange={(value) => {
							setVisibility(value);
							onDirty();
						}}
						options={["Internal", "Client-visible"]}
						value={visibility}
					/>
				</SettingRow>
			</SettingsSection>

			<SettingsSection
				title="Danger zone"
				description="Destructive workspace actions stay isolated at the bottom."
			>
				<SettingRow title="Transfer workspace" value="Requires owner approval">
					<Button
						onClick={() => setDangerDialog("transfer")}
						size="sm"
						variant="outline"
					>
						Start transfer
					</Button>
				</SettingRow>
				<SettingRow title="Delete workspace" value="Permanent after 14 days">
					<Button
						onClick={() => setDangerDialog("delete")}
						size="sm"
						variant="destructive-outline"
					>
						Request deletion
					</Button>
				</SettingRow>
			</SettingsSection>

			<DangerZoneDialog
				onClose={() => setDangerDialog(null)}
				open={dangerDialog}
				workspaceName={workspaceName}
			/>
		</>
	);
}

function EditableTextSetting({
	actionLabel = "Edit",
	description,
	label,
	onChange,
	value,
}: {
	actionLabel?: string;
	description?: string;
	label: string;
	onChange: (value: string) => void;
	value: string;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [draftValue, setDraftValue] = useState(value);

	if (isEditing) {
		return (
			<SettingRow title={label} description={description}>
				<div className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center">
					<Input
						aria-label={label}
						onChange={(event) => setDraftValue(event.target.value)}
						value={draftValue}
					/>
					<div className="flex items-center gap-2">
						<Button
							onClick={() => {
								setDraftValue(value);
								setIsEditing(false);
							}}
							size="sm"
							variant="ghost"
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								onChange(draftValue);
								setIsEditing(false);
							}}
							size="sm"
						>
							Done
						</Button>
					</div>
				</div>
			</SettingRow>
		);
	}

	return (
		<SettingRow title={label} description={description} value={value}>
			<Button
				onClick={() => {
					setDraftValue(value);
					setIsEditing(true);
				}}
				size="sm"
				variant="outline"
			>
				{actionLabel}
			</Button>
		</SettingRow>
	);
}

function SelectSetting({
	description,
	label,
	onChange,
	options,
	value,
}: {
	description?: string;
	label: string;
	onChange: (value: string) => void;
	options: string[];
	value: string;
}) {
	return (
		<OptionSetting
			description={description}
			label={label}
			onChange={onChange}
			options={options}
			value={value}
			width="w-64"
		/>
	);
}

function DangerZoneDialog({
	onClose,
	open,
	workspaceName,
}: {
	onClose: () => void;
	open: "transfer" | "delete" | null;
	workspaceName: string;
}) {
	const [transferEmail, setTransferEmail] = useState("");
	const [deleteConfirmation, setDeleteConfirmation] = useState("");
	const isDelete = open === "delete";

	return (
		<Dialog onOpenChange={(nextOpen) => !nextOpen && onClose()} open={Boolean(open)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isDelete ? "Request workspace deletion" : "Transfer workspace"}
					</DialogTitle>
					<DialogDescription>
						{isDelete
							? "Deletion starts a 14-day recovery window and requires owner confirmation."
							: "Transfer ownership to another workspace member. The new owner will control billing, security, and deletion."}
					</DialogDescription>
				</DialogHeader>

				{isDelete ? (
					<div className="space-y-4">
						<div className="rounded-lg border border-destructive/30 bg-destructive/6 p-3 text-sm text-destructive-foreground">
							This does not delete the workspace immediately. It sends a deletion
							request to the owner approval queue.
						</div>
						<label className="block space-y-2">
							<span className="text-sm font-medium">
								Type <strong>{workspaceName}</strong> to continue
							</span>
							<Input
								aria-label="Confirm workspace name"
								onChange={(event) => setDeleteConfirmation(event.target.value)}
								value={deleteConfirmation}
							/>
						</label>
					</div>
				) : (
					<div className="space-y-4">
						<label className="block space-y-2">
							<span className="text-sm font-medium">New owner email</span>
							<Input
								aria-label="New owner email"
								onChange={(event) => setTransferEmail(event.target.value)}
								placeholder="owner@example.com"
								type="email"
								value={transferEmail}
							/>
						</label>
						<div className="grid gap-2 text-sm text-muted-foreground">
							<p>The recipient must already be a workspace member.</p>
							<p>They will receive an approval request before ownership changes.</p>
						</div>
					</div>
				)}

				<DialogFooter>
					<DialogClose render={<Button variant="ghost">Cancel</Button>} />
					<Button
						disabled={
							isDelete
								? deleteConfirmation !== workspaceName
								: !transferEmail.includes("@")
						}
						onClick={() => {
							setTransferEmail("");
							setDeleteConfirmation("");
							onClose();
						}}
						variant={isDelete ? "destructive" : "default"}
					>
						{isDelete ? "Request deletion" : "Send transfer request"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export function BrandingSettings({ onDirty }: { onDirty: DirtyHandler }) {
	return (
		<div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_28rem]">
			<div className="min-w-0">
				<div className="max-w-2xl">
					<h2 className="text-lg font-semibold">Brand system</h2>
					<p className="mt-2 text-sm leading-6 text-muted-foreground">
						Keep client-facing surfaces visually consistent across portals,
						emails, invoices, and shared deliverables.
					</p>
				</div>

				<div className="mt-8 divide-y">
					<BrandSettingRow
						title="Logo"
						description="Used in portals, invoice headers, and client emails."
						value="Logo uploaded"
					>
						<Button onClick={onDirty} size="sm" variant="outline">
							<UploadIcon />
							Replace
						</Button>
					</BrandSettingRow>
					<BrandSettingRow title="Accent color" value="#1F2937">
						<div className="size-5 rounded-full border bg-[#1f2937]" />
						<Button onClick={onDirty} size="sm" variant="outline">
							Edit
						</Button>
					</BrandSettingRow>
					<BrandSettingRow
						title="Typography"
						description="Applied to client portal headings and email layouts."
						value="LoveSans"
					/>
					<BrandSettingRow
						title="Portal background"
						description="Sets the base surface behind client-facing project content."
						value="Soft white"
					/>
					<BrandSettingRow
						title="Email signature branding"
						description="Adds the workspace mark and footer treatment to client emails."
					>
						<Switch defaultChecked onCheckedChange={onDirty} />
					</BrandSettingRow>
				</div>
			</div>

			<aside className="xl:sticky xl:top-20 xl:self-start">
				<div className="mb-3 flex items-center justify-between">
					<h2 className="text-base font-semibold">Client portal preview</h2>
					<Badge variant="secondary">Live</Badge>
				</div>
				<div className="overflow-hidden rounded-lg border bg-background">
					<div className="border-b px-5 py-4">
						<div className="flex items-center gap-3">
							<div className="flex size-9 items-center justify-center rounded-md bg-foreground text-sm font-semibold text-background">
								B
							</div>
							<div>
								<div className="text-base font-semibold">Briefly Studio</div>
								<div className="text-sm text-muted-foreground">Client Portal</div>
							</div>
						</div>
					</div>
					<div className="space-y-5 p-5">
						<div>
							<div className="text-xl font-semibold">Acme Website Redesign</div>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								Homepage concepts are ready for review.
							</p>
						</div>
						<div className="space-y-3">
							{["Creative direction", "Homepage approval", "Launch files"].map(
								(item, index) => (
									<div
										className="flex items-center justify-between rounded-md bg-muted/50 px-4 py-3 text-sm"
										key={item}
									>
										<span>{item}</span>
										<span
											className={cn(
												"size-2 rounded-full",
												index === 1 ? "bg-warning" : "bg-success"
											)}
										/>
									</div>
								)
							)}
						</div>
						<Button className="w-full" size="sm">
							Approve direction
						</Button>
					</div>
				</div>
			</aside>
		</div>
	);
}

function BrandSettingRow({
	children,
	description,
	title,
	value,
}: {
	children?: ReactNode;
	description?: string;
	title: string;
	value?: string;
}) {
	return (
		<div className="grid gap-5 py-7 md:grid-cols-[minmax(0,1fr)_minmax(12rem,auto)] md:items-center">
			<div className="min-w-0">
				<div className="font-medium">{title}</div>
				{description ? (
					<p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
						{description}
					</p>
				) : null}
			</div>
			<div className="flex min-w-0 items-center justify-start gap-3 md:justify-end">
				{value ? (
					<span className="text-sm text-muted-foreground">{value}</span>
				) : null}
				{children}
			</div>
		</div>
	);
}

export function DomainSettings({ onOpenSheet }: { onOpenSheet: SheetHandler }) {
	return (
		<SettingsSection
			title="Connected domains"
			description="Keep client-facing access predictable and trusted."
		>
			<SettingRow
				title="briefly.so/studio"
				value="Primary workspace URL"
				status={<Badge variant="success">Verified</Badge>}
			/>
			<SettingRow
				title="portal.brieflystudio.com"
				value="Client portal domain"
				status={<Badge variant="success">Verified</Badge>}
			>
				<Button
					onClick={() =>
						onOpenSheet({
							title: "Domain setup",
							description: "Review DNS records and verification status.",
							content: "domain",
						})
					}
					size="sm"
					variant="outline"
				>
					Manage
				</Button>
			</SettingRow>
			<SettingRow
				title="Add domain"
				description="Connect a branded URL for client portals."
			>
				<Button
					onClick={() =>
						onOpenSheet({
							title: "Add domain",
							description: "Add a domain and copy the required DNS records.",
							content: "domain",
						})
					}
					size="sm"
				>
					Add domain
				</Button>
			</SettingRow>
		</SettingsSection>
	);
}

export function MemberSettings({ onOpenSheet }: { onOpenSheet: SheetHandler }) {
	const [isInviteOpen, setIsInviteOpen] = useState(false);

	return (
		<>
			<section>
				<div className="mb-6 flex items-center justify-between gap-4">
					<div>
						<h2 className="text-base font-semibold">Members</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							Open a member to edit permissions, assigned projects, billing access,
							and security actions.
						</p>
					</div>
					<Button onClick={() => setIsInviteOpen(true)} size="sm">
						Invite member
					</Button>
				</div>
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead>Name</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Projects</TableHead>
							<TableHead>Last active</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-10" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{members.map((member) => (
							<TableRow
								className="cursor-pointer hover:bg-muted/40"
								key={member[0]}
								onClick={() =>
									onOpenSheet({
										title: member[0],
										description: `${member[1]} access across ${member[2]}.`,
										content: "member",
									})
								}
							>
								{member.map((value, index) => (
									<TableCell
										className={
											index === 0 ? "font-medium" : "text-muted-foreground"
										}
										key={`${member[0]}-${value}`}
									>
										{index === 4 ? (
											<Badge
												variant={value === "Active" ? "success" : "secondary"}
											>
												{value}
											</Badge>
										) : (
											value
										)}
									</TableCell>
								))}
								<TableCell>
									<ChevronRightIcon className="size-4 text-muted-foreground" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>
			<InviteMemberDialog
				onClose={() => setIsInviteOpen(false)}
				open={isInviteOpen}
			/>
		</>
	);
}

function InviteMemberDialog({
	onClose,
	open,
}: {
	onClose: () => void;
	open: boolean;
}) {
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("Project lead");
	const [project, setProject] = useState("All projects");
	const [portalOnly, setPortalOnly] = useState(false);
	const [note, setNote] = useState("");

	return (
		<Dialog onOpenChange={(nextOpen) => !nextOpen && onClose()} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite member</DialogTitle>
					<DialogDescription>
						Send an invite with the right role, project access, and client
						visibility defaults.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-5">
					<label className="block space-y-2">
						<span className="text-sm font-medium">Email address</span>
						<Input
							aria-label="Invite email address"
							onChange={(event) => setEmail(event.target.value)}
							placeholder="teammate@example.com"
							type="email"
							value={email}
						/>
					</label>

					<div className="grid gap-4 sm:grid-cols-2">
						<label className="block space-y-2">
							<span className="text-sm font-medium">Role</span>
							<Select onValueChange={setRole} value={role}>
								<SelectTrigger aria-label="Invite role">
									<SelectValue>{role}</SelectValue>
								</SelectTrigger>
								<SelectContent>
									{[
										"Admin",
										"Project lead",
										"Designer",
										"Client collaborator",
									].map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</label>

						<label className="block space-y-2">
							<span className="text-sm font-medium">Project access</span>
							<Select onValueChange={setProject} value={project}>
								<SelectTrigger aria-label="Invite project access">
									<SelectValue>{project}</SelectValue>
								</SelectTrigger>
								<SelectContent>
									{[
										"All projects",
										"Acme Website",
										"Nova Redesign",
										"Gym Launch",
									].map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</label>
					</div>

					<div className="flex items-start justify-between gap-4 rounded-lg bg-muted/45 p-3">
						<div>
							<div className="text-sm font-medium">Portal-only access</div>
							<p className="mt-1 text-sm leading-5 text-muted-foreground">
								Limit this invite to client-facing portal visibility and responses.
							</p>
						</div>
						<Switch checked={portalOnly} onCheckedChange={setPortalOnly} />
					</div>

					<label className="block space-y-2">
						<span className="text-sm font-medium">Invite note</span>
						<Textarea
							aria-label="Invite note"
							onChange={(event) => setNote(event.target.value)}
							placeholder="Add a short note to the invite email."
							value={note}
						/>
					</label>
				</div>

				<DialogFooter>
					<DialogClose render={<Button variant="ghost">Cancel</Button>} />
					<Button
						disabled={!email.includes("@")}
						onClick={() => {
							setEmail("");
							setRole("Project lead");
							setProject("All projects");
							setPortalOnly(false);
							setNote("");
							onClose();
						}}
					>
						Send invite
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export function RoleSettings({ onOpenSheet }: { onOpenSheet: SheetHandler }) {
	return (
		<SettingsSection
			title="Role profiles"
			description="Use sheets for detail editing so permissions stay readable."
		>
			{["Owner", "Admin", "Project lead", "Designer", "Client collaborator"].map(
				(role) => (
					<SettingRow
						key={role}
						title={role}
						value={role === "Owner" ? "Full access" : "Custom permissions"}
					>
						<Button
							onClick={() =>
								onOpenSheet({
									title: role,
									description:
										"Edit project, billing, portal, and workspace permissions.",
									content: "role",
								})
							}
							size="sm"
							variant="outline"
						>
							Edit
						</Button>
					</SettingRow>
				)
			)}
		</SettingsSection>
	);
}
