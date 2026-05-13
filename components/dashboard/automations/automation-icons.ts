import {
	ArchiveRestoreIcon,
	BellRingIcon,
	CheckIcon,
	Clock3Icon,
	FileCheck2Icon,
	FileTextIcon,
	FlagIcon,
	MailCheckIcon,
	RefreshCcwIcon,
	ShieldCheckIcon,
	SparklesIcon,
	UploadCloudIcon,
} from "lucide-react";
import type { AutomationIcon } from "./automations-data";

export const automationIconMap = {
	approval: FileCheck2Icon,
	archive: ArchiveRestoreIcon,
	bell: BellRingIcon,
	check: CheckIcon,
	clock: Clock3Icon,
	file: FileTextIcon,
	flag: FlagIcon,
	mail: MailCheckIcon,
	refresh: RefreshCcwIcon,
	shield: ShieldCheckIcon,
	sparkles: SparklesIcon,
	upload: UploadCloudIcon,
} satisfies Record<AutomationIcon, typeof BellRingIcon>;
