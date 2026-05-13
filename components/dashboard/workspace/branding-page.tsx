import { PaintbrushIcon, UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import type { WorkspaceData } from "./workspace-data";
import {
	ColorRow,
	PlainValue,
	SettingRow,
	SettingsSection,
} from "./workspace-primitives";

export function BrandingPage({
	accentColor,
	data,
	onAccentColorChange,
}: {
	accentColor: string;
	data: WorkspaceData;
	onAccentColorChange: (color: string) => void;
}) {
	const colorPresets = data.colorPresets;
	const recentColors = data.recentColors;

	return (
		<div className="grid gap-12 xl:grid-cols-[minmax(0,0.95fr)_minmax(25rem,0.8fr)]">
			<div className="space-y-12">
				<SettingsSection
					description="Core identity appears across the workspace shell and client-facing surfaces."
					title="Workspace identity"
				>
					<SettingRow
						action={<PlainValue>{data.businessName}</PlainValue>}
						description="Shown to team members and clients."
						label="Workspace name"
					/>
					<SettingRow
						action={
							<Button size="sm" variant="outline">
								<UploadIcon /> Upload new
							</Button>
						}
						description={data.logoDataUrl ? "Logo uploaded" : "No logo uploaded"}
						label="Logo"
					/>
					<SettingRow
						action={
							<Button size="sm" variant="outline">
								<UploadIcon /> Replace
							</Button>
						}
						description="Used in browser tabs and compact portal headers."
						label="Icon/favicon"
					/>
					<div className="grid gap-4 border-t pt-6 sm:grid-cols-[minmax(0,1fr)_17rem]">
						<div>
							<p className="text-sm font-medium">Accent color</p>
							<p className="mt-1 max-w-lg text-sm leading-6 text-muted-foreground">
								Used for approvals, buttons, and highlights.
							</p>
						</div>
						<div className="space-y-3">
							<ColorRow
								colors={colorPresets}
								selected={accentColor}
								onSelect={onAccentColorChange}
							/>
							<ColorRow
								colors={recentColors}
								selected={accentColor}
								onSelect={onAccentColorChange}
							/>
							<label className="flex h-9 items-center justify-between rounded-md border px-3 text-sm">
								<span className="text-muted-foreground">Custom hex</span>
								<input
									aria-label="Custom hex color"
									className="w-24 bg-transparent text-right font-mono text-xs outline-none"
									value={accentColor}
									onChange={(event) => onAccentColorChange(event.target.value)}
								/>
							</label>
						</div>
					</div>
					<SettingRow
						action={<PlainValue>LoveSans</PlainValue>}
						description="Curated workspace and portal typography."
						label="Typography"
					/>
				</SettingsSection>

				<SettingsSection
					description="A small set of controls keeps client portals polished and consistent."
					title="Portal appearance"
				>
					<SettingRow
						action={<PlainValue>Warm white</PlainValue>}
						description="A quiet base for client-facing pages."
						label="Portal background"
					/>
					<SettingRow
						action={<Switch defaultChecked />}
						description="Show workspace identity in the client-facing header."
						label="Client-facing header"
					/>
					<SettingRow
						action={<Switch defaultChecked />}
						description="Apply logo and accent color to transactional email."
						label="Email branding"
					/>
					<SettingRow
						action={<PlainValue>Calm emphasis</PlainValue>}
						description="Approval buttons use restrained contrast and clear state language."
						label="Approval styling"
					/>
				</SettingsSection>
			</div>

			<LivePreview accentColor={accentColor} workspaceName={data.businessName} />
		</div>
	);
}

function LivePreview({
	accentColor,
	workspaceName,
}: {
	accentColor: string;
	workspaceName: string;
}) {
	return (
		<section className="xl:sticky xl:top-24 xl:self-start">
			<div className="mb-4 flex items-center gap-2 text-sm font-medium">
				<PaintbrushIcon className="size-4" />
				Live preview
			</div>
			<Tabs className="gap-5" defaultValue="portal">
				<TabsList variant="line">
					<TabsTrigger value="portal">Portal</TabsTrigger>
					<TabsTrigger value="emails">Emails</TabsTrigger>
					<TabsTrigger value="invoices">Invoices</TabsTrigger>
					<TabsTrigger value="approvals">Approvals</TabsTrigger>
				</TabsList>
				<div className="rounded-lg border bg-background p-5 shadow-xs">
					<TabsContent value="portal">
						<PreviewShell accentColor={accentColor} eyebrow="Client portal" workspaceName={workspaceName}>
							<div className="flex items-center justify-between">
								<div>
									<p className="text-lg font-semibold">{workspaceName}</p>
									<p className="text-sm text-muted-foreground">
										Client portal preview
									</p>
								</div>
								<span
									className="rounded-full px-2.5 py-1 text-xs font-medium text-white"
									style={{ backgroundColor: accentColor }}
								>
									Review
								</span>
							</div>
							<div className="mt-8 space-y-3">
								<PreviewLine width="84%" />
								<PreviewLine width="64%" />
								<PreviewLine width="72%" />
							</div>
						</PreviewShell>
					</TabsContent>
					<TabsContent value="emails">
						<PreviewShell accentColor={accentColor} eyebrow="Update email" workspaceName={workspaceName}>
							<p className="text-lg font-semibold">Weekly progress is ready</p>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								A concise client update with branded actions and delivery context.
							</p>
							<div
								className="mt-8 h-9 w-32 rounded-md"
								style={{ backgroundColor: accentColor }}
							/>
						</PreviewShell>
					</TabsContent>
					<TabsContent value="invoices">
						<PreviewShell accentColor={accentColor} eyebrow="Invoice" workspaceName={workspaceName}>
							<div className="flex items-end justify-between">
								<div>
									<p className="text-lg font-semibold">Invoice preview</p>
									<p className="text-sm text-muted-foreground">Due date appears here</p>
								</div>
								<p className="text-2xl font-semibold">$0</p>
							</div>
							<div className="mt-8 h-1.5 rounded-full bg-muted">
								<div
									className="h-full w-2/3 rounded-full"
									style={{ backgroundColor: accentColor }}
								/>
							</div>
						</PreviewShell>
					</TabsContent>
					<TabsContent value="approvals">
						<PreviewShell accentColor={accentColor} eyebrow="Approval screen" workspaceName={workspaceName}>
							<p className="text-lg font-semibold">Homepage direction</p>
							<p className="mt-2 text-sm leading-6 text-muted-foreground">
								Approve the latest visual direction or request focused changes.
							</p>
							<div className="mt-8 flex gap-2">
								<div
									className="h-9 flex-1 rounded-md"
									style={{ backgroundColor: accentColor }}
								/>
								<div className="h-9 flex-1 rounded-md border" />
							</div>
						</PreviewShell>
					</TabsContent>
				</div>
			</Tabs>
		</section>
	);
}

function PreviewShell({
	accentColor,
	eyebrow,
	children,
	workspaceName = "Workspace",
}: {
	accentColor: string;
	eyebrow: string;
	children: React.ReactNode;
	workspaceName?: string;
}) {
	return (
		<div className="min-h-80 rounded-md bg-muted/50 p-4">
			<div className="rounded-md bg-background p-5 shadow-xs">
				<div className="mb-8 flex items-center gap-2">
					<div
						className="flex size-8 items-center justify-center rounded-md text-xs font-semibold text-white"
						style={{ backgroundColor: accentColor }}
					>
						B
					</div>
					<div>
						<p className="text-sm font-medium">{workspaceName}</p>
						<p className="text-xs text-muted-foreground">{eyebrow}</p>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}

function PreviewLine({ width }: { width: string }) {
	return <div className="h-2 rounded-full bg-muted" style={{ width }} />;
}
