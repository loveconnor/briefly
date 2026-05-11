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
import {
	ArrowRightIcon,
	BellIcon,
	CommandIcon,
	CreditCardIcon,
	GraduationCapIcon,
	LifeBuoyIcon,
	LogOutIcon,
	RefreshCwIcon,
} from "lucide-react";

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
			<DropdownMenuContent align="end" className="w-60 overflow-hidden p-1">
				<div className="flex items-start gap-3 px-4 py-3.5">
					<Avatar className="mt-0.5 size-8">
						{user.image ? <AvatarImage src={user.image} alt={displayName} /> : null}
						<AvatarFallback>{fallback}</AvatarFallback>
					</Avatar>
					<div className="min-w-0">
						<div className="truncate text-sm font-semibold text-foreground">
							{displayName}
						</div>
						<div className="mt-0.5 truncate text-xs text-muted-foreground">
							Owner · Briefly Studio
						</div>
						<button
							className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-muted-foreground"
							onClick={() => router.push("/dashboard/settings")}
							type="button"
						>
							Manage account
							<ArrowRightIcon className="size-3" />
						</button>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="gap-2.5 px-4 py-2 text-sm"
						onClick={() => router.push("/dashboard/notifications")}
					>
						<BellIcon className="size-4" />
						Notifications
					</DropdownMenuItem>
					<DropdownMenuItem className="gap-2.5 px-4 py-2 text-sm">
						<CommandIcon className="size-4" />
						Keyboard shortcuts
					</DropdownMenuItem>
					<DropdownMenuItem
						className="gap-2.5 px-4 py-2 text-sm"
						onClick={() => router.push("/dashboard/billing")}
					>
						<CreditCardIcon className="size-4" />
						Billing &amp; plan
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="gap-2.5 px-4 py-2 text-sm">
						<LifeBuoyIcon className="size-4" />
						Help center
					</DropdownMenuItem>
					<DropdownMenuItem className="gap-2.5 px-4 py-2 text-sm">
						<GraduationCapIcon className="size-4" />
						Training &amp; onboarding
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="gap-2.5 px-4 py-2 text-sm">
						<RefreshCwIcon className="size-4" />
						Switch workspace
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="w-full cursor-pointer gap-2.5 px-4 py-2 text-sm"
						disabled={isSigningOut}
						onClick={handleLogout}
						variant="destructive"
					>
						<LogOutIcon className="size-4" />
						{isSigningOut ? "Logging out..." : "Log out"}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
