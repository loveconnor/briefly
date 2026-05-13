"use client";

import { useState } from "react";
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

function keySuffix(seed: number) {
	return `${["a8Kp", "z4Lm", "q9Nt"][seed % 3] ?? "n6Qr"}${Math.random()
		.toString(36)
		.slice(2, 10)}`;
}

export function ApiPage({
	apiKeys,
	onOpenWebhook,
	webhooks,
}: {
	apiKeys: WorkspaceData["apiKeys"];
	onOpenWebhook: (webhook: Webhook) => void;
	webhooks: Webhook[];
}) {
	const [keys, setKeys] = useState<ApiKey[]>(apiKeys);
	const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
	const [webhookRows, setWebhookRows] = useState<Webhook[]>(webhooks);
	const [isEndpointDialogOpen, setIsEndpointDialogOpen] = useState(false);
	const [newEvent, setNewEvent] = useState("client.approved");
	const [newEndpoint, setNewEndpoint] = useState("");

	const createKey = () => {
		const count = keys.length + 1;
		const id = `key-${Date.now()}`;
		const secret = `brf_live_${keySuffix(count)}`;

		setKeys((current) => [
			...current,
			{
				id,
				name: `Production key ${count}`,
				created: "Created just now",
				used: "Never used",
				key: `••••••••••••••••${secret.slice(-4)}`,
				secret,
			},
		]);
		setRevealedKeys((current) => ({ ...current, [id]: true }));
	};

	const rotateKey = (id: string) => {
		const secret = `brf_live_${keySuffix(keys.length)}`;

		setKeys((current) =>
			current.map((key) =>
				key.id === id
					? {
							...key,
							key: `••••••••••••••••${secret.slice(-4)}`,
							secret,
							used: "Rotated just now",
						}
					: key
			)
		);
		setRevealedKeys((current) => ({ ...current, [id]: true }));
	};

	const revokeKey = (id: string) => {
		setKeys((current) => current.filter((key) => key.id !== id));
		setRevealedKeys((current) => {
			const next = { ...current };
			delete next[id];
			return next;
		});
	};

	const addEndpoint = () => {
		if (!newEvent.trim() || !newEndpoint.trim()) return;

		setWebhookRows((current) => [
			...current,
			{
				event: newEvent.trim(),
				endpoint: newEndpoint.trim(),
				status: "DNS pending",
				last: "Added just now",
			},
		]);
		setNewEvent("client.approved");
		setNewEndpoint("");
		setIsEndpointDialogOpen(false);
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
					<Button onClick={createKey}>
						<KeyRoundIcon /> Create key
					</Button>
				</div>
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
									{isRevealed ? key.secret : key.key}
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
										onClick={() => rotateKey(key.id)}
										size="sm"
										variant="outline"
									>
										Rotate
									</Button>
									<Button
										onClick={() => revokeKey(key.id)}
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
						<Button disabled={!newEndpoint.trim()} onClick={addEndpoint}>
							<PlusIcon /> Add endpoint
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
