import { Button } from "@/components/button/Button";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { useLongPress } from "@uidotdev/usehooks";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";
import { GenerateError } from "../generateError/GenerateError";

interface Props {
	label: string;
	placeholder: string;
	className?: string;
	isError?: boolean;
	type?: "text" | "password" | "email";
	required?: boolean;
	maxLength?: number;
	textError?: string;
	value: string;
	onChange?: (el: string) => void;
}

export const TextInput = ({
	label,
	placeholder,
	className,
	isError,
	type = "text",
	required,
	maxLength,
	textError,
	value,
	onChange,
}: Props) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const attrs = useLongPress(
		() => {
			setIsPasswordVisible(true);
		},
		{
			onFinish: () => setIsPasswordVisible(false),
			onCancel: () => setIsPasswordVisible(false),
			threshold: 100,
		}
	);

	const passwordIcon = isPasswordVisible
		? { path: mdiEyeOff, title: "Hide password" }
		: { path: mdiEye, title: "Show password" };

	const shouldGenerateErrorMessage =
		isError || textError || maxLength || required;

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange?.(event.target.value);
	};

	return (
		<div className="relative flex flex-col">
			<label
				className={clsx(
					"font-semibold",
					"leading-4",
					"text-left",
					"text-gray-700"
				)}
			>
				{label}
			</label>
			<input
				type={isPasswordVisible ? "text" : type}
				placeholder={placeholder}
				className={clsx(
					"w-full",
					"input",
					"input-ghost mt-2",
					className,
					isError && "input-error"
				)}
				value={value}
				onChange={handleOnChange}
			/>
			{type === "password" && (
				<Button
					className="absolute right-0 top-6 btn-ghost hover:bg-gray-200"
					icon={passwordIcon}
					iconOnly
					onClick={() => setIsPasswordVisible(false)}
					{...attrs}
				/>
			)}
			{shouldGenerateErrorMessage && (
				<GenerateError
					isError={!!isError}
					length={value.length}
					maxLength={maxLength}
					required={required}
					textError={textError}
				/>
			)}
		</div>
	);
};
