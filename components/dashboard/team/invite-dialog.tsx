"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
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
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [role, setRole] = useState(roles[0]?.name ?? "Member");
	const [project, setProject] = useState(projectOptions[0] ?? "");
	const [message, setMessage] = useState("");
	const [pending, setPending] = useState(false);
	const [error, setError] = useState("");
	const roleItems = roles.map((role) => ({
		label: role.name,
		value: role.name,
	}));
	const projectItems = projectOptions.map((projectName) => ({
		label: projectName,
		value: projectName,
	}));

	async function sendInvite(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");
		setPending(true);

		try {
			const response = await fetch("/api/team/invitations", {
				body: JSON.stringify({
					email,
					message,
					project,
					role,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});
			const payload = await response.json();

			if (!response.ok) {
				throw new Error(payload.error ?? "Unable to send invite.");
			}

			setEmail("");
			setMessage("");
			onOpenChange(false);
			router.refresh();
		} catch (sendError) {
			setError(sendError instanceof Error ? sendError.message : "Unable to send invite.");
		} finally {
			setPending(false);
		}
	}

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent>
				<form onSubmit={sendInvite}>
					<DialogHeader>
						<DialogTitle>Invite member</DialogTitle>
						<DialogDescription>
							Add someone to the workspace with a simple role and project scope.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<label className="grid gap-2 text-sm font-medium">
							Email
							<Input
								onChange={(event) => setEmail(event.target.value)}
								placeholder="teammate@company.com"
								required
								type="email"
								value={email}
							/>
						</label>
						<label className="grid gap-2 text-sm font-medium">
							Role
							<Field>
								<Select
									items={roleItems}
									onValueChange={(value) => value != null && setRole(value)}
									value={role}
								>
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
								<Select
									items={projectItems}
									onValueChange={(value) => value != null && setProject(value)}
									value={project}
								>
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
							<Input
								onChange={(event) => setMessage(event.target.value)}
								placeholder="Add a short note to the invite email."
								value={message}
							/>
						</label>
						{error ? <p className="text-sm text-destructive-foreground">{error}</p> : null}
					</div>
					<DialogFooter>
						<Button onClick={() => onOpenChange(false)} type="button" variant="outline">
							Cancel
						</Button>
						<Button disabled={pending || !email.includes("@")} type="submit">
							<SendIcon />
							{pending ? "Sending..." : "Send invite"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
