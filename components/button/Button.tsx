import { MouseEventHandler, ReactNode } from "react";
import Icon from "@mdi/react";
import cx from "clsx";
import clsx from "clsx";
import Link from "next/link";
import { Url } from "url";

export type IconButton = {
	title: string;
	path: string;
};

export type ButtonKind =
	| "btn"
	| "primary"
	| "secondary"
	| "accent"
	| "ghost"
	| "link";

interface Props {
	kind?: ButtonKind;
	type?: "button" | "submit" | "reset";
	outline?: boolean;
	children: ReactNode;
	icon?: IconButton;
	size?: "btn-md" | "btn-sm";
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	isLoading?: boolean;
	fullWidth?: boolean;
	className?: string;
	href?: string;
	externalHref?: string;
}

export const Button = ({
	kind = "btn",
	outline,
	children,
	icon,
	disabled,
	onClick,
	isLoading,
	fullWidth,
	className,
	size = "btn-md",
	href,
	externalHref,
	type = "button",
}: Props) => {
	const currentClassName = clsx(
		"btn",
		"gap-3",
		size === "btn-md" && "",
		size === "btn-sm" && "btn-sm",
		className
	);

	const content = (
		<>
			{children}
			{isLoading ? (
				<span className="loading loading-spinner" />
			) : (
				<>
					{icon && (
						<Icon
							path={icon.path}
							aria-label={icon.title}
							className={clsx(
								size === "btn-md" && "w-6 h-6",
								size === "btn-sm" && "w-4 h-4"
							)}
						/>
					)}
				</>
			)}
		</>
	);

	if (href) {
		return (
			<Link className={currentClassName} href={href}>
				{content}
			</Link>
		);
	}

	if (externalHref) {
		return (
			<Link
				className={currentClassName}
				href={externalHref}
				target="_blank"
			>
				{content}
			</Link>
		);
	}

	return (
		<button
			type={type}
			className={currentClassName}
			aria-disabled={!!disabled}
			disabled={!!disabled}
			onClick={onClick}
		>
			{content}
		</button>
	);
};
