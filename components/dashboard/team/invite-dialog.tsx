"use client";

import { SendIcon } from "lucide-react";
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
import { Field } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Role } from "@/components/dashboard/team/team-types";

export function InviteDialog({
	open,
	onOpenChange,
	projectOptions,
	roles,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	projectOptions: string[];
	roles: Role[];
}) {
	const roleItems = roles.map((role) => ({
		label: role.name,
		value: role.name,
	}));
	const projectItems = projectOptions.map((projectName) => ({
		label: projectName,
		value: projectName,
	}));

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite member</DialogTitle>
					<DialogDescription>
						Add someone to the workspace with a simple role and project scope.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4">
					<label className="grid gap-2 text-sm font-medium">
						Email
						<Input placeholder="teammate@company.com" type="email" />
					</label>
					<label className="grid gap-2 text-sm font-medium">
						Role
						<Field>
							<Select items={roleItems}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent alignItemWithTrigger={false}>
									<SelectGroup>
										{roleItems.map((item) => (
											<SelectItem key={item.value} value={item.value}>
												{item.label}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</Field>
					</label>
					<label className="grid gap-2 text-sm font-medium">
						Projects
						<Field>
							<Select items={projectItems}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent alignItemWithTrigger={false}>
									<SelectGroup>
										{projectItems.map((item) => (
											<SelectItem key={item.value} value={item.value}>
												{item.label}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</Field>
					</label>
					<label className="grid gap-2 text-sm font-medium">
						Message <span className="text-xs font-normal text-muted-foreground">(optional)</span>
						<Input placeholder="Add a short note to the invite email." />
					</label>
				</div>
				<DialogFooter>
					<Button onClick={() => onOpenChange(false)} variant="outline">
						Cancel
					</Button>
					<Button onClick={() => onOpenChange(false)}>
						<SendIcon />
						Send invite
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
