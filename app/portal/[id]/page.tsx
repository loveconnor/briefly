import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ClientPortal } from "@/components/client-portal/client-portal";
import { getPortalData } from "@/lib/app-data";

function formatPortalTitle(id: string) {
	return id
		.split("-")
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const title = formatPortalTitle(id);

	return {
		title: `${title} Portal`,
		description: `Client portal for ${title}.`,
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const portal = await getPortalData(id);

	if (!portal) {
		notFound();
	}

	return <ClientPortal data={portal} />;
}
