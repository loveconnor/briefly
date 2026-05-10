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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { roles } from "@/components/dashboard/team/team-data";

export function InviteDialog({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
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
						<Select defaultValue="Designer">
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{roles.map((role) => (
									<SelectItem key={role.name} value={role.name}>
										{role.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</label>
					<label className="grid gap-2 text-sm font-medium">
						Projects
						<Select defaultValue="Acme Website Redesign">
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Acme Website Redesign">Acme Website Redesign</SelectItem>
								<SelectItem value="Nova Launch">Nova Launch</SelectItem>
								<SelectItem value="Brightside Landing Page">Brightside Landing Page</SelectItem>
							</SelectContent>
						</Select>
					</label>
					<label className="grid gap-2 text-sm font-medium">
						Message <span className="text-xs font-normal text-muted-foreground">(optional)</span>
						<Input placeholder="Can you review the latest portal updates?" />
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
