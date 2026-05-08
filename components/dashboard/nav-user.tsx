"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import type { AppShellUser } from "@/components/dashboard/app-shell";
import { UserIcon, BellIcon, CommandIcon, LifeBuoyIcon, GraduationCapIcon, CreditCardIcon, LogOutIcon } from "lucide-react";

function getDisplayName(user: AppShellUser) {
	return user.name?.trim() || user.email;
}

function getInitials(name: string) {
	const parts = name
		.split(/\s+/)
		.map((part) => part[0])
		.filter(Boolean);

	return (parts.length > 1 ? `${parts[0]}${parts[1]}` : name[0] ?? "?").toUpperCase();
}

export function NavUser({ user }: { user: AppShellUser }) {
	const router = useRouter();
	const [isSigningOut, setIsSigningOut] = useState(false);
	const displayName = getDisplayName(user);
	const fallback = getInitials(displayName);

	async function handleLogout() {
		if (isSigningOut) {
			return;
		}

		setIsSigningOut(true);
		await authClient.signOut();
		router.push("/login");
		router.refresh();
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-label="Open user menu"
				className="rounded-full outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
			>
				<Avatar className="size-8">
					{user.image ? <AvatarImage src={user.image} alt={displayName} /> : null}
					<AvatarFallback>{fallback}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-60">
				<div className="px-1.5 py-1.5">
					<div className="flex items-center gap-3">
						<Avatar className="size-10">
							{user.image ? <AvatarImage src={user.image} alt={displayName} /> : null}
							<AvatarFallback>{fallback}</AvatarFallback>
						</Avatar>
						<div>
							<span className="font-medium text-foreground">{displayName}</span>{" "}
							<br />
							<div className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-muted-foreground text-xs">
								{user.email}
							</div>
						</div>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<UserIcon
						/>
						Profile
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<BellIcon
						/>
						Notifications
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CommandIcon
						/>
						Keyboard shortcuts
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<LifeBuoyIcon
						/>
						Help center
					</DropdownMenuItem>
					<DropdownMenuItem>
						<GraduationCapIcon
						/>
						Agent training
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<CreditCardIcon
						/>
						Subscription
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="w-full cursor-pointer"
						disabled={isSigningOut}
						onClick={handleLogout}
						variant="destructive"
					>
						<LogOutIcon
						/>
						{isSigningOut ? "Logging out..." : "Log out"}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
