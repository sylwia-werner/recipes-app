import { MouseEventHandler, ReactNode } from "react";
import Icon from "@mdi/react";
import clsx from "clsx";
import Link from "next/link";

export type IconButton = {
	title: string;
	path: string;
};

interface Props {
	type?: "button" | "submit" | "reset";
	outline?: boolean;
	children?: ReactNode;
	icon?: IconButton;
	size?: "btn-md" | "btn-sm";
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	isLoading?: boolean;
	fullWidth?: boolean;
	className?: string;
	href?: string;
	externalHref?: string;
	iconOnly?: boolean;
	onMouseDown?: MouseEventHandler<HTMLButtonElement>;
	onMouseUp?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
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
	iconOnly,
	onMouseDown,
	onMouseUp,
	...attrs
}: Props) => {
	const currentClassName = clsx(
		"btn",
		"gap-3",
		size === "btn-md" && "",
		size === "btn-sm" && "btn-sm",
		iconOnly && "btn-square",
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
			{...attrs}
			type={type}
			className={currentClassName}
			aria-disabled={!!disabled}
			disabled={!!disabled}
			onClick={onClick}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		>
			{content}
		</button>
	);
};
