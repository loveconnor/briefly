import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { assigneeItems, phaseItems, statusItems } from "./tasks-constants";
import type { TaskProjectOption } from "@/lib/app-data";
import type { TaskStatus } from "./tasks-data";

export type NewTaskFormState = {
	assignee: string;
	clientVisible: boolean;
	dependencies: string;
	dueDate: string;
	phase: TaskStatus | string;
	projectId: string;
	status: TaskStatus;
	taskName: string;
};

export type NewTaskFormSetters = {
	setAssignee: (value: string) => void;
	setClientVisible: (value: boolean) => void;
	setDependencies: (value: string) => void;
	setDueDate: (value: string) => void;
	setPhase: (value: string) => void;
	setProjectId: (value: string) => void;
	setStatus: (value: TaskStatus) => void;
	setTaskName: (value: string) => void;
};

export function NewTaskDialog({
	form,
	onOpenChange,
	onSubmit,
	open,
	projectOptions,
	setters,
}: {
	form: NewTaskFormState;
	onOpenChange: (open: boolean) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	open: boolean;
	projectOptions: TaskProjectOption[];
	setters: NewTaskFormSetters;
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<form onSubmit={onSubmit}>
					<DialogHeader>
						<DialogTitle>New task</DialogTitle>
						<DialogDescription>
							Add delivery work tied to a project, phase, dependency, and owner.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-2">
						<label className="grid gap-2 text-sm">
							<span className="font-medium">Task name</span>
							<Input
								onChange={(event) => setters.setTaskName(event.target.value)}
								required
								value={form.taskName}
							/>
						</label>
						<div className="grid gap-3 sm:grid-cols-2">
							<SelectField
								items={projectOptions.map((project) => ({
									label: project.name,
									value: project.id,
								}))}
								label="Project"
								onValueChange={setters.setProjectId}
								value={form.projectId}
							/>
							<SelectField
								items={phaseItems}
								label="Phase"
								onValueChange={setters.setPhase}
								value={String(form.phase)}
							/>
							<SelectField
								items={assigneeItems}
								label="Assignee"
								onValueChange={setters.setAssignee}
								value={form.assignee}
							/>
							<label className="grid gap-2 text-sm">
								<span className="font-medium">Due date</span>
								<Input
									onChange={(event) => setters.setDueDate(event.target.value)}
									value={form.dueDate}
								/>
							</label>
						</div>
						<SelectField
							items={statusItems}
							label="Status"
							onValueChange={(value) => setters.setStatus(value as TaskStatus)}
							value={form.status}
						/>
						<label className="grid gap-2 text-sm">
							<span className="font-medium">Dependencies</span>
							<Input
								onChange={(event) => setters.setDependencies(event.target.value)}
								placeholder="Client feedback, asset upload"
								value={form.dependencies}
							/>
						</label>
						<label className="flex items-center justify-between gap-4 text-sm">
							<span className="font-medium">Client-visible</span>
							<Switch
								checked={form.clientVisible}
								onCheckedChange={setters.setClientVisible}
							/>
						</label>
					</div>
					<DialogFooter>
						<Button onClick={() => onOpenChange(false)} type="button" variant="outline">
							Cancel
						</Button>
						<Button disabled={!form.taskName.trim() || !form.projectId} type="submit">
							Create task
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

function SelectField({
	items,
	label,
	onValueChange,
	value,
}: {
	items: Array<{ label: string; value: string }> | string[];
	label: string;
	onValueChange: (value: string) => void;
	value: string;
}) {
	const normalizedItems = items.map((item) =>
		typeof item === "string" ? { label: item, value: item } : item
	);

	return (
		<div className="grid gap-2 text-sm">
			<span className="font-medium">{label}</span>
			<Field>
				<Select
					items={normalizedItems}
					onValueChange={(nextValue) => nextValue != null && onValueChange(nextValue)}
					value={value}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent alignItemWithTrigger={false}>
						<SelectGroup>
							{normalizedItems.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Field>
		</div>
	);
}
