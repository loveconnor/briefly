"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/ui/field";

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
	const items = options.map((option) => ({
		label: formatOption(option),
		value: option,
	}));

	return (
		<Field className="md:w-40">
			<Select items={items} onValueChange={(nextValue) => nextValue != null && onChange(nextValue)} value={value}>
				<SelectTrigger aria-label={label} className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent alignItemWithTrigger={false}>
					<SelectGroup>
						{items.map((item) => (
							<SelectItem key={item.value} value={item.value}>
								{item.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</Field>
	);
}
