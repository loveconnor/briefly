import { useMemo, useState } from "react";
import {
	CheckCircle2Icon,
	CopyIcon,
	RefreshCwIcon,
	RotateCwIcon,
	Trash2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { BrandLogo } from "./brand-logo";
import type { Domain } from "./workspace-data";
import {
	PlainValue,
	QuietNote,
	SettingRow,
	SettingsSection,
	StatusText,
	SheetStep,
} from "./workspace-primitives";

export function DomainSheet({ onSaved }: { onSaved?: () => void }) {
	const [domain, setDomain] = useState("");
	const [isChecking, setIsChecking] = useState(false);
	const [error, setError] = useState("");
	const [pending, setPending] = useState(false);
	const normalizedDomain = domain.trim() || "portal.acme.com";
	const dnsHost = useMemo(() => {
		const parts = normalizedDomain.split(".");
		return parts.length > 2 ? parts[0] : "@";
	}, [normalizedDomain]);

	async function saveDomain() {
		setError("");
		setPending(true);
		setIsChecking(true);

		try {
			const response = await fetch("/api/workspace/domains", {
				body: JSON.stringify({ name: domain }),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});
			const payload = await response.json();

			if (!response.ok) {
				throw new Error(payload.error ?? "Unable to add domain.");
			}

			onSaved?.();
		} catch (saveError) {
			setError(saveError instanceof Error ? saveError.message : "Unable to add domain.");
			setIsChecking(false);
		} finally {
			setPending(false);
		}
	}

	return (
		<>
			<SheetHeader className="border-b p-6">
				<SheetTitle>Add domain</SheetTitle>
				<SheetDescription>
					Connect a portal domain and verify DNS before traffic is routed.
				</SheetDescription>
			</SheetHeader>
			<div className="flex-1 space-y-8 overflow-y-auto p-6">
				<SheetStep number="1" title="Enter domain">
					<Input
						aria-label="Portal domain"
						className="font-mono"
						onChange={(event) => {
							setDomain(event.target.value);
							setIsChecking(false);
						}}
						placeholder="portal.yourdomain.com"
						value={domain}
					/>
				</SheetStep>
				<SheetStep number="2" title="DNS instructions">
					<div className="overflow-hidden rounded-md border">
						{[
							["Type", "CNAME"],
							["Host", dnsHost],
							["Value", "cname.briefly.app"],
						].map(([label, value]) => (
							<div className="grid grid-cols-[6rem_minmax(0,1fr)_2rem] items-center border-t px-3 py-3 first:border-t-0" key={label}>
								<span className="text-sm text-muted-foreground">{label}</span>
								<code className="truncate text-sm">{value}</code>
								<Button aria-label={`Copy ${label}`} size="icon-sm" variant="ghost">
									<CopyIcon />
								</Button>
							</div>
						))}
					</div>
				</SheetStep>
				<SheetStep number="3" title="Verification status">
					{isChecking ? (
						<>
							<div className="flex items-center gap-3 text-sm text-muted-foreground">
								<RefreshCwIcon className="size-4 animate-spin" />
								<span>Waiting for DNS propagation...</span>
							</div>
							<p className="mt-2 text-xs text-muted-foreground">
								Last checked just now
							</p>
						</>
					) : (
						<div className="text-sm leading-6 text-muted-foreground">
							Verification has not started. Add the DNS record, then run a check.
						</div>
					)}
					{error ? <p className="mt-2 text-sm text-destructive-foreground">{error}</p> : null}
				</SheetStep>
			</div>
			<SheetFooter className="border-t p-6">
				<Button disabled={!domain.trim() || pending} onClick={() => void saveDomain()}>
					Verify domain
				</Button>
			</SheetFooter>
		</>
	);
}

export function ManageDomainSheet({
	name,
	status,
	ssl,
	connected,
	onChanged,
}: Domain & { onChanged?: () => void }) {
	const [isChecking, setIsChecking] = useState(false);
	const [error, setError] = useState("");
	const [pending, setPending] = useState("");
	const dnsHost = useMemo(() => {
		const parts = name.split(".");
		return parts.length > 2 ? parts[0] : "@";
	}, [name]);

	async function recheck() {
		setError("");
		setPending("recheck");
		setIsChecking(true);

		try {
			const response = await fetch(`/api/workspace/domains/${encodeURIComponent(name)}`, {
				method: "PATCH",
			});
			const payload = await response.json();

			if (!response.ok) {
				throw new Error(payload.error ?? "Unable to recheck domain.");
			}

			onChanged?.();
		} catch (checkError) {
			setError(checkError instanceof Error ? checkError.message : "Unable to recheck domain.");
			setIsChecking(false);
		} finally {
			setPending("");
		}
	}

	async function remove() {
		setError("");
		setPending("remove");

		try {
			const response = await fetch(`/api/workspace/domains/${encodeURIComponent(name)}`, {
				method: "DELETE",
			});
			const payload = await response.json();

			if (!response.ok) {
				throw new Error(payload.error ?? "Unable to remove domain.");
			}

			onChanged?.();
		} catch (removeError) {
			setError(removeError instanceof Error ? removeError.message : "Unable to remove domain.");
		} finally {
			setPending("");
		}
	}

	return (
		<>
			<SheetHeader className="border-b p-6">
				<SheetTitle>{name}</SheetTitle>
				<SheetDescription>
					Manage DNS verification, SSL state, and routing for this portal domain.
				</SheetDescription>
			</SheetHeader>
			<div className="flex-1 space-y-8 overflow-y-auto p-6">
				<SettingsSection
					description="Briefly keeps checking this domain after DNS records are added."
					title="Domain status"
				>
					<SettingRow
						action={<StatusText status={status} />}
						description={connected}
						label="DNS verification"
					/>
					<SettingRow
						action={<StatusText status={ssl} />}
						description="TLS is provisioned automatically after DNS is verified."
						label="SSL certificate"
					/>
					<SettingRow
						action={<PlainValue>Client portals</PlainValue>}
						description="Traffic for this domain routes to workspace client portals."
						label="Routing"
					/>
				</SettingsSection>

				<SheetStep number="1" title="DNS record">
					<div className="overflow-hidden rounded-md border">
						{[
							["Type", "CNAME"],
							["Host", dnsHost],
							["Value", "cname.briefly.app"],
						].map(([label, value]) => (
							<div className="grid grid-cols-[6rem_minmax(0,1fr)_2rem] items-center border-t px-3 py-3 first:border-t-0" key={label}>
								<span className="text-sm text-muted-foreground">{label}</span>
								<code className="truncate text-sm">{value}</code>
								<Button aria-label={`Copy ${label}`} size="icon-sm" variant="ghost">
									<CopyIcon />
								</Button>
							</div>
						))}
					</div>
				</SheetStep>

				<SheetStep number="2" title="Verification check">
					{isChecking ? (
						<>
							<div className="flex items-center gap-3 text-sm text-muted-foreground">
								<RefreshCwIcon className="size-4 animate-spin" />
								<span>Checking DNS and SSL status...</span>
							</div>
							<p className="mt-2 text-xs text-muted-foreground">
								Last checked just now
							</p>
						</>
					) : (
						<div className="text-sm leading-6 text-muted-foreground">
							No active check is running. Use recheck when DNS records have changed.
						</div>
					)}
					{error ? <p className="mt-2 text-sm text-destructive-foreground">{error}</p> : null}
				</SheetStep>
			</div>
			<SheetFooter className="border-t p-6">
				<Button disabled={pending === "recheck"} onClick={() => void recheck()}>
					<RefreshCwIcon /> Recheck domain
				</Button>
				<Button disabled={pending === "remove"} onClick={() => void remove()} variant="destructive">
					<Trash2Icon /> Remove domain
				</Button>
			</SheetFooter>
		</>
	);
}

export function IntegrationSheet({
	name,
	status,
	detail,
}: {
	name: string;
	status: string;
	detail: string;
}) {
	const connected = status === "Connected";
	return (
		<>
			<SheetHeader className="border-b p-6">
				<div className="flex items-start gap-4">
					<BrandLogo name={name} />
					<div>
						<SheetTitle>{name}</SheetTitle>
						<SheetDescription>
							{connected ? detail : "Configure this integration for the workspace."}
						</SheetDescription>
					</div>
				</div>
			</SheetHeader>
			<div className="flex-1 space-y-8 overflow-y-auto p-6">
				<SettingsSection
					description="Review the operational surface this integration can access."
					title="Permissions"
				>
					<SettingRow
						action={<Switch defaultChecked={connected} />}
						description="Read project, client, and approval state."
						label="Workspace events"
					/>
					<SettingRow
						action={<Switch defaultChecked={connected} />}
						description="Send delivery and reminder notifications."
						label="Notification routing"
					/>
				</SettingsSection>
				<SettingsSection
					description="Advanced routing stays in the sheet so the page remains quiet."
					title="Sync behavior"
				>
					<SettingRow
						action={<PlainValue>#client-updates</PlainValue>}
						description="Default destination for client-facing updates."
						label="Workspace mapping"
					/>
					<SettingRow
						action={<PlainValue>Important only</PlainValue>}
						description="Send approvals, deliveries, and payment events."
						label="Automation mapping"
					/>
				</SettingsSection>
			</div>
			<SheetFooter className="border-t p-6">
				<Button>{connected ? "Save changes" : "Connect"}</Button>
				{connected ? (
					<Button variant="destructive">
						<Trash2Icon /> Disconnect
					</Button>
				) : null}
			</SheetFooter>
		</>
	);
}

export function WebhookSheet({
	event,
	endpoint,
}: {
	event: string;
	endpoint: string;
}) {
	return (
		<>
			<SheetHeader className="border-b p-6">
				<SheetTitle>Webhook delivery</SheetTitle>
				<SheetDescription>{event} delivered to {endpoint}</SheetDescription>
			</SheetHeader>
			<div className="flex-1 space-y-8 overflow-y-auto p-6">
				<QuietNote
					icon={<CheckCircle2Icon className="size-4 text-success-foreground" />}
					title="200 OK"
					copy="Delivery completed in 186 ms. No retry is scheduled."
				/>
				<SheetStep number="1" title="Payload">
					<pre className="overflow-auto rounded-md bg-muted p-4 text-xs leading-6">
{`{
  "event": "${event}",
  "workspace_id": "wrk_8N3a",
  "created": "2026-05-11T14:24:18Z"
}`}
					</pre>
				</SheetStep>
				<SheetStep number="2" title="Response">
					<pre className="overflow-auto rounded-md bg-muted p-4 text-xs leading-6">
{`{
  "received": true,
  "status": "queued"
}`}
					</pre>
				</SheetStep>
				<SheetStep number="3" title="Retries">
					<p className="text-sm text-muted-foreground">
						No retries were needed for this delivery.
					</p>
				</SheetStep>
			</div>
			<SheetFooter className="border-t p-6">
				<Button variant="outline">
					<RotateCwIcon /> Replay delivery
				</Button>
			</SheetFooter>
		</>
	);
}
