import { useState } from "react";
import { Clock3Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { notificationRows } from "./workspace-data";
import {
	SettingRow,
	SettingsSection,
} from "./workspace-primitives";

const digestLabels: Record<string, string> = {
	"daily-9": "Daily at 9:00 AM",
	"daily-4": "Daily at 4:00 PM",
	"weekly-mon": "Weekly on Monday",
	off: "Off",
};

const deliveryLabels: Record<string, string> = {
	"approvals-instant": "Approvals instant",
	"all-instant": "All important instant",
	batched: "Batch non-critical",
	"digest-only": "Digest only",
};

function formatTime(value: string) {
	const [hours = "0", minutes = "00"] = value.split(":");
	const hourNumber = Number(hours);
	const period = hourNumber >= 12 ? "PM" : "AM";
	const displayHour = hourNumber % 12 || 12;

	return `${String(displayHour).padStart(2, "0")}:${minutes} ${period}`;
}

export function NotificationsPage() {
	const [quietStart, setQuietStart] = useState("18:00");
	const [quietEnd, setQuietEnd] = useState("08:00");
	const [digestFrequency, setDigestFrequency] = useState("daily-9");
	const [deliveryMode, setDeliveryMode] = useState("approvals-instant");

	return (
		<div className="space-y-12">
			<section>
				<h2 className="text-base font-semibold">Delivery matrix</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Choose channels by event so routing follows the work, not the tool.
				</p>
				<div className="mt-6 overflow-hidden border-y">
					<div className="grid grid-cols-[minmax(12rem,1fr)_5rem_5rem_5rem] py-3 text-xs font-medium uppercase text-muted-foreground">
						<span>Event</span>
						<span>Email</span>
						<span>Slack</span>
						<span>In-app</span>
					</div>
					{notificationRows.map((row) => (
						<div
							className="grid grid-cols-[minmax(12rem,1fr)_5rem_5rem_5rem] items-center border-t py-4"
							key={row.event}
						>
							<div>
								<p className="text-sm font-medium">{row.event}</p>
								{row.event === "Client overdue reminders" ? (
									<p className="mt-1 max-w-md text-sm text-muted-foreground">
										Automatically follows up when approvals stall.
									</p>
								) : null}
							</div>
							<Switch defaultChecked={row.email} />
							<Switch defaultChecked={row.slack} />
							<Switch defaultChecked={row.app} />
						</div>
					))}
				</div>
			</section>
			<SettingsSection
				description="Advanced controls reduce notification fatigue without hiding urgent client events."
				title="Quiet delivery"
			>
				<SettingRow
					action={
						<Popover>
							<PopoverTrigger asChild>
								<Button className="w-72 justify-between" variant="outline">
									<span>
										{formatTime(quietStart)} - {formatTime(quietEnd)}
									</span>
									<Clock3Icon />
								</Button>
							</PopoverTrigger>
							<PopoverContent align="end" className="w-72 min-w-0">
								<PopoverTitle className="text-sm">Quiet hours</PopoverTitle>
								<div className="mt-4 grid gap-4">
									<label className="grid gap-2 text-sm">
										<span className="font-medium">Start</span>
										<Input
											aria-label="Quiet hours start"
											onChange={(event) => setQuietStart(event.target.value)}
											type="time"
											value={quietStart}
										/>
									</label>
									<label className="grid gap-2 text-sm">
										<span className="font-medium">End</span>
										<Input
											aria-label="Quiet hours end"
											onChange={(event) => setQuietEnd(event.target.value)}
											type="time"
											value={quietEnd}
										/>
									</label>
								</div>
							</PopoverContent>
						</Popover>
					}
					description="Non-urgent alerts wait until the next working window."
					label="Quiet hours"
				/>
				<SettingRow
					action={
						<Select
							onValueChange={setDigestFrequency}
							value={digestFrequency}
						>
							<SelectTrigger className="w-72">
								<SelectValue>{digestLabels[digestFrequency]}</SelectValue>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="daily-9">Daily at 9:00 AM</SelectItem>
								<SelectItem value="daily-4">Daily at 4:00 PM</SelectItem>
								<SelectItem value="weekly-mon">Weekly on Monday</SelectItem>
								<SelectItem value="off">Off</SelectItem>
							</SelectContent>
						</Select>
					}
					description="A digest of lower-priority updates across clients."
					label="Notification digest frequency"
				/>
				<SettingRow
					action={
						<Select onValueChange={setDeliveryMode} value={deliveryMode}>
							<SelectTrigger className="w-72">
								<SelectValue>{deliveryLabels[deliveryMode]}</SelectValue>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="approvals-instant">Approvals instant</SelectItem>
								<SelectItem value="all-instant">All important instant</SelectItem>
								<SelectItem value="batched">Batch non-critical</SelectItem>
								<SelectItem value="digest-only">Digest only</SelectItem>
							</SelectContent>
						</Select>
					}
					description="Approval requests bypass batching so work does not stall."
					label="Instant vs batched delivery"
				/>
			</SettingsSection>
		</div>
	);
}
