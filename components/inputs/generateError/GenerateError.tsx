import { mdiAlertCircle } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";

interface Props {
	isError: boolean;
	textError?: string;
	length?: number;
	maxLength?: number;
	required?: boolean;
}

export const GenerateError = ({
	isError,
	length,
	maxLength,
	textError,
	required,
}: Props) => {
	const generateErrorMessage = () => {
		if (!isError && !textError && !maxLength) {
			return "";
		}

		if (required && length === 0) {
			return "This field is required";
		}

		if (isError && textError) {
			return textError;
		}

		if (length && maxLength && length > maxLength) {
			return `Maximum length allowed: ${maxLength}`;
		}

		return "";
	};
	return (
		<div className="flex gap-1 text-xs leading-4 text-red-500 mt-1">
			{isError && textError && (
				<Icon
					path={mdiAlertCircle}
					aria-label="Error"
					className={clsx("w-4", "h-4")}
				/>
			)}

			<span>{generateErrorMessage()}</span>
		</div>
	);
};
