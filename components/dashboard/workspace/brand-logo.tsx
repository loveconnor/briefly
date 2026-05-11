import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
	ComponentIcon,
	DiscordIcon,
	DropboxIcon,
	GoogleDriveIcon,
	Mail01Icon,
	MicrosoftIcon,
	MoneyReceiveFlowIcon,
	NotionIcon,
	SlackIcon,
	StripeIcon,
	ZapIcon,
} from "@hugeicons/core-free-icons";
import { LinkIcon } from "lucide-react";

const iconMap: Record<string, IconSvgElement> = {
	Slack: SlackIcon,
	Email: Mail01Icon,
	Discord: DiscordIcon,
	"Google Drive": GoogleDriveIcon,
	Dropbox: DropboxIcon,
	OneDrive: MicrosoftIcon,
	Stripe: StripeIcon,
	QuickBooks: MoneyReceiveFlowIcon,
	Notion: NotionIcon,
	Airtable: ComponentIcon,
	Zapier: ZapIcon,
};

export function BrandLogo({ name }: { name: string }) {
	const icon = iconMap[name] ?? LinkIcon;

	return (
		<div className="flex size-16 shrink-0 items-center justify-center rounded-lg border bg-background shadow-xs">
			<HugeiconsIcon aria-label={`${name} logo`} icon={icon} size={44} />
		</div>
	);
}
