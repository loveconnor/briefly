import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Metadata } from "next";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://briefly.so";

export function generateMeta({
  title,
  additionalTitle = false,
  description,
  canonical
}: {
  title: string;
  additionalTitle?: boolean;
  description: string;
  canonical: string;
}): Metadata {
  return {
    title: `${title}${additionalTitle ? " | Briefly" : ""}`,
    description: description,
    metadataBase: new URL(appUrl),
    alternates: {
      canonical
    },
    openGraph: {
      title: `${title} | Briefly`,
      description,
      siteName: "Briefly",
      images: [`/assets/welcome.png`]
    }
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

// a function to get the first letter of the first and last name of names
export const getInitials = (fullName: string) => {
  const nameParts = fullName.split(" ");
  const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
  const lastNameInitial = nameParts[1].charAt(0).toUpperCase();
  return `${firstNameInitial}${lastNameInitial}`;
};
