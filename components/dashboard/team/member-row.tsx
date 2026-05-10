import { MoreHorizontalIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Member } from "@/components/dashboard/team/team-types";
import { getPresence, getPresenceContext } from "@/components/dashboard/team/team-utils";

export function MemberRow({
	member,
	onOpen,
}: {
	member: Member;
	onOpen: (member: Member) => void;
}) {
	const presence = getPresence(member.status);
	const presenceContext = getPresenceContext(member);

	return (
		<div className="group px-2 py-1.5 transition-colors duration-200 hover:bg-accent/25">
			<div
				className="grid w-full cursor-pointer gap-4 px-1 py-3 text-left focus-visible:ring-2 focus-visible:ring-ring/24 focus-visible:outline-none md:grid-cols-[minmax(14rem,1fr)_minmax(14rem,.95fr)_10rem_2rem]"
				onClick={() => onOpen(member)}
				onKeyDown={(event) => {
					if (event.key === "Enter" || event.key === " ") {
						event.preventDefault();
						onOpen(member);
					}
				}}
				role="button"
				tabIndex={0}
			>
				<div className="flex min-w-0 gap-3">
					<Avatar className="size-11 rounded-full border">
						<AvatarFallback className="rounded-full bg-accent text-sm">
							{member.initials}
						</AvatarFallback>
					</Avatar>
					<div className="min-w-0">
						<div className="truncate text-sm font-semibold">{member.name}</div>
						<div className="truncate text-sm text-muted-foreground">{member.email}</div>
						<div className="mt-1 text-xs font-medium text-muted-foreground">{member.role}</div>
					</div>
				</div>
				<div className="min-w-0 self-center text-sm leading-5">
					<div className="font-medium">{member.projects}</div>
					<div className="mt-1 truncate text-muted-foreground">
						<span className="text-foreground/80">Last activity:</span>{" "}
						{presenceContext}
					</div>
				</div>
				<div className="self-center text-sm">
					<div className="grid w-40 grid-cols-[0.5rem_minmax(0,1fr)] items-center gap-x-2 text-muted-foreground">
						<div className="contents">
							<span className={cn("size-2 rounded-full bg-muted-foreground/40", presence === "Online" && "bg-success")} />
							<span>{presence}</span>
						</div>
						{presenceContext && (
							<div className="col-start-2 mt-1 hidden truncate text-xs md:block">{presenceContext}</div>
						)}
					</div>
				</div>
				<div className="flex justify-end self-center">
					<DropdownMenu>
						<DropdownMenuTrigger
							aria-label={`Actions for ${member.name}`}
							className={cn(
								buttonVariants({ variant: "ghost", size: "icon-sm" }),
								"opacity-70 transition-opacity group-hover:opacity-100"
							)}
							onClick={(event) => event.stopPropagation()}
						>
							<MoreHorizontalIcon />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-40">
							<DropdownMenuItem>Message</DropdownMenuItem>
							<DropdownMenuItem>Change role</DropdownMenuItem>
							{member.role !== "Owner" && (
								<DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
}
