export type UpdateType =
	| "STATUS"
	| "APPROVAL"
	| "DELIVERABLE"
	| "LAUNCH"
	| "REVISION"
	| "FOLLOW-UP";

export type VisibilityState = "viewed" | "awaiting" | "ignored" | "acknowledged";

export type DateGroup = "Today" | "Yesterday" | "This week" | "Earlier";

export type ClientUpdate = {
	id: string;
	title: string;
	project: string;
	type: UpdateType;
	recipients: string[];
	sentMeta: string;
	body: string;
	attachments: string[];
	visibility: {
		state: VisibilityState;
		label: string;
		delivery: string;
		opened: string;
		firstViewed: string;
		replyState: string;
	};
	group: DateGroup;
	recentReply?: string;
};
