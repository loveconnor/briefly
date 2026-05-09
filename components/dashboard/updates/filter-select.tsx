"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function FilterSelect({
	formatOption = (option) => option,
	label,
	onChange,
	options,
	value,
}: {
	formatOption?: (option: string) => string;
	label: string;
	onChange: (value: string) => void;
	options: string[];
	value: string;
}) {
	return (
		<Select onValueChange={onChange} value={value}>
			<SelectTrigger aria-label={label} className="md:w-40">
				<SelectValue>{formatOption(value)}</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option} value={option}>
						{formatOption(option)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
