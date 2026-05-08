"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useSyncExternalStore } from "react";

const themeStorageKey = "briefly-theme";
const themeChangeEvent = "briefly-theme-change";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.documentElement.style.colorScheme = theme;
}

function subscribe(callback: () => void) {
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const handleChange = () => callback();
	const handleSystemChange = () => {
		const storedTheme = window.localStorage.getItem(themeStorageKey);

		if (storedTheme !== "light" && storedTheme !== "dark") {
			applyTheme(mediaQuery.matches ? "dark" : "light");
		}

		callback();
	};

	window.addEventListener(themeChangeEvent, handleChange);
	mediaQuery.addEventListener("change", handleSystemChange);

	return () => {
		window.removeEventListener(themeChangeEvent, handleChange);
		mediaQuery.removeEventListener("change", handleSystemChange);
	};
}

function getThemeSnapshot(): Theme {
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
	const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => "light");

	const nextTheme = theme === "dark" ? "light" : "dark";
	const Icon = theme === "dark" ? SunIcon : MoonIcon;

	return (
		<Button
			aria-label={`Switch to ${nextTheme} theme`}
			onClick={() => {
				applyTheme(nextTheme);
				window.localStorage.setItem(themeStorageKey, nextTheme);
				window.dispatchEvent(new Event(themeChangeEvent));
			}}
			size="icon-sm"
			title={`Switch to ${nextTheme} theme`}
			variant="ghost"
		>
			<Icon />
			<span className="sr-only">{`Switch to ${nextTheme} theme`}</span>
		</Button>
	);
}
