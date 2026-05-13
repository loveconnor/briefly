"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	CheckIcon,
	ExternalLinkIcon,
	KeyRoundIcon,
	PlusIcon,
	WebhookIcon,
} from "lucide-react";

import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Webhook, WorkspaceData } from "./workspace-data";
import { StatusText } from "./workspace-primitives";

type ApiKey = {
	id: string;
	name: string;
	created: string;
	used: string;
	key: string;
	secret: string;
};

export function ApiPage({
	apiKeys,
	onOpenWebhook,
	webhooks,
}: {
	apiKeys: WorkspaceData["apiKeys"];
	onOpenWebhook: (webhook: Webhook) => void;
	webhooks: Webhook[];
}) {
	const router = useRouter();
	const [keys, setKeys] = useState<ApiKey[]>(apiKeys);
	const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
	const [webhookRows, setWebhookRows] = useState<Webhook[]>(webhooks);
	const [isEndpointDialogOpen, setIsEndpointDialogOpen] = useState(false);
	const [newEvent, setNewEvent] = useState("client.approved");
	const [newEndpoint, setNewEndpoint] = useState("");
	const [error, setError] = useState("");
	const [pendingAction, setPendingAction] = useState("");

	const createKey = async () => {
		setError("");
		setPendingAction("create-key");
		const count = keys.length + 1;

		try {
			const response = await fetch("/api/workspace/api-keys", {
				body: JSON.stringify({ name: `Production key ${count}` }),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});
			const payload = await response.json();

			if (!response.ok) {
				throw new Error(payload.error ?? "Unable to create API key.");
			}

			setKeys((current) => [payload.key, ...current]);
			setRevealedKeys((current) => ({ ...current, [payload.key.id]: true }));
			router.refresh();
		} catch (createError) {
			setError(createError instanceof Error ? createError.message : "Unable to create API key.");
		} finally {
			setPendingAction("");
		}
	};

	const rotateKey = async (id: string) => {
		setError("");
		setPendingAction(`rotate-${id}`);

		try {
			const response = await fetch(`/api/workspace/api-keys/${encodeURIComponent(id)}`, {
				method: "PATCH",
			});
			const payload = await response.json();

			if (!response.ok) {
				throw new Error(payload.error ?? "Unable to rotate API key.");
			}

			setKeys((current) =>
				current.map((key) =>
					key.id === id
						? {
								...key,
								key: payload.key.key,
								secret: payload.key.secret,
								used: payload.key.used,
							}
						: key
				)
			);
			setRevealedKeys((current) => ({ ...current, [id]: true }));
			router.refresh();
		} catch (rotateError) {
			setError(rotateError instanceof Error ? rotateError.message : "Unable to rotate API key.");
		} finally {
			setPendingAction("");
		}
	};

	const revokeKey = async (id: string) => {
		setError("");
		setPendingAction(`revoke-${id}`);

		try {
			const response = await fetch(`/api/workspace/api-keys/${encodeURIComponent(id)}`, {
				method: "DELETE",
			});
			const payload = await response.json();

			if (!response.ok) {
				throw new Error(payload.error ?? "Unable to revoke API key.");
			}

			setKeys((current) => current.filter((key) => key.id !== id));
			setRevealedKeys((current) => {
				const next = { ...current };
				delete next[id];
				return next;
			});
			router.refresh();
		} catch (revokeError) {
			setError(revokeError instanceof Error ? revokeError.message : "Unable to revoke API key.");
		} finally {
			setPendingAction("");
		}
	};

	const addEndpoint = async () => {
		if (!newEvent.trim() || !newEndpoint.trim()) return;
		setError("");
		setPendingAction("add-webhook");

		try {
			const response = await fetch("/api/workspace/webhooks", {
				body: JSON.stringify({
					endpoint: newEndpoint,
					event: newEvent,
				}),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});
			const payload = await response.json();

			if (!response.ok) {
				throw new Error(payload.error ?? "Unable to add webhook endpoint.");
			}

			setWebhookRows((current) => [payload.webhook, ...current]);
			setNewEvent("client.approved");
			setNewEndpoint("");
			setIsEndpointDialogOpen(false);
			router.refresh();
		} catch (webhookError) {
			setError(webhookError instanceof Error ? webhookError.message : "Unable to add webhook endpoint.");
		} finally {
			setPendingAction("");
		}
	};

	return (
		<div className="space-y-12">
			<section id="api-docs" className="scroll-mt-24">
				<div className="flex items-center justify-between gap-4">
					<div>
						<h2 className="text-base font-semibold">API keys</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							Keys are scoped to this workspace and should be rotated regularly.
						</p>
					</div>
					<Button disabled={pendingAction === "create-key"} onClick={() => void createKey()}>
						<KeyRoundIcon /> Create key
					</Button>
				</div>
				{error ? <p className="mt-3 text-sm text-destructive-foreground">{error}</p> : null}
				<div className="mt-6 divide-y border-y">
					{keys.map((key) => {
						const isRevealed = Boolean(revealedKeys[key.id]);

						return (
							<div
								className="grid gap-4 py-5 lg:grid-cols-[minmax(0,1fr)_17rem_auto] lg:items-center"
								key={key.id}
							>
								<div>
									<p className="font-medium">{key.name}</p>
									<p className="mt-1 text-sm text-muted-foreground">
										{key.created} · {key.used}
									</p>
								</div>
								<code className="truncate text-sm text-muted-foreground">
									{isRevealed && key.secret ? key.secret : key.key}
								</code>
								<div className="flex flex-wrap gap-2">
									<Button
										onClick={() =>
											setRevealedKeys((current) => ({
												...current,
												[key.id]: !current[key.id],
											}))
										}
										size="sm"
										variant="outline"
									>
										{isRevealed ? "Hide" : "Reveal"}
									</Button>
									<Button
										disabled={pendingAction === `rotate-${key.id}`}
										onClick={() => void rotateKey(key.id)}
										size="sm"
										variant="outline"
									>
										Rotate
									</Button>
									<Button
										disabled={pendingAction === `revoke-${key.id}`}
										onClick={() => void revokeKey(key.id)}
										size="sm"
										variant="ghost"
									>
										Revoke
									</Button>
								</div>
							</div>
						);
					})}
					{keys.length === 0 ? (
						<DashboardEmptyState className="my-5" icon={KeyRoundIcon} title="No API keys created yet" />
					) : null}
				</div>
			</section>
			<section>
				<div className="flex items-center justify-between gap-4">
					<div>
						<h2 className="text-base font-semibold">Webhooks</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							Inspect recent deliveries, payloads, responses, and retry timing.
						</p>
					</div>
					<Button onClick={() => setIsEndpointDialogOpen(true)} variant="outline">
						<WebhookIcon /> Add endpoint
					</Button>
				</div>
				<div className="mt-6 divide-y border-y">
					{webhookRows.map((webhook) => (
						<button
							className="grid w-full gap-4 py-5 text-left transition-colors hover:text-foreground/80 md:grid-cols-[11rem_minmax(0,1fr)_7rem_10rem_auto] md:items-center"
							key={`${webhook.event}-${webhook.endpoint}`}
							onClick={() => onOpenWebhook(webhook)}
							type="button"
						>
							<p className="font-mono text-sm">{webhook.event}</p>
							<p className="truncate text-sm text-muted-foreground">{webhook.endpoint}</p>
							<StatusText status={webhook.status} />
							<p className="text-sm text-muted-foreground">{webhook.last}</p>
							<ExternalLinkIcon className="size-4 text-muted-foreground" />
						</button>
					))}
					{webhookRows.length === 0 ? (
						<DashboardEmptyState
							className="my-5"
							icon={WebhookIcon}
							title="No webhook endpoints configured"
						/>
					) : null}
				</div>
				<div className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
					<CheckIcon className="mt-0.5 size-4 text-success-foreground" />
					<span>
						Use the documentation link above for event schemas, signature
						verification, and retry behavior.
					</span>
				</div>
			</section>
			<Dialog
				open={isEndpointDialogOpen}
				onOpenChange={setIsEndpointDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add endpoint</DialogTitle>
						<DialogDescription>
							Create a webhook endpoint for workspace events.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-2">
						<label className="grid gap-2 text-sm">
							<span className="font-medium">Event</span>
							<Input
								aria-label="Webhook event"
								className="font-mono"
								onChange={(event) => setNewEvent(event.target.value)}
								value={newEvent}
							/>
						</label>
						<label className="grid gap-2 text-sm">
							<span className="font-medium">Endpoint URL</span>
							<Input
								aria-label="Webhook endpoint URL"
								onChange={(event) => setNewEndpoint(event.target.value)}
								placeholder="https://example.com/webhooks"
								value={newEndpoint}
							/>
						</label>
					</div>
					<DialogFooter>
						<Button
							onClick={() => setIsEndpointDialogOpen(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button
							disabled={!newEndpoint.trim() || pendingAction === "add-webhook"}
							onClick={() => void addEndpoint()}
						>
							<PlusIcon /> Add endpoint
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
