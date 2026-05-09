import type { Metadata } from "next";

import { ClientPortalPage } from "@/components/client-portal/client-portal-page";

export const metadata: Metadata = {
	title: "Acme Website Redesign Portal",
	description:
		"A guided client portal for reviewing the latest Acme Website Redesign approval.",
};

export default function Page() {
	return <ClientPortalPage />;
}
