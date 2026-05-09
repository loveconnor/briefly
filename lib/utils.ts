import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Metadata } from "next";
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
    title: `${title} for Shadcn UI${additionalTitle ? " – Admin Dashboard Template" : ""}`,
    description: description,
    metadataBase: new URL(`https://shadcnuikit.com`),
    alternates: {
      canonical: `/dashboard${canonical}`
    },
    openGraph: {
      images: [`/images/seo.jpg`]
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