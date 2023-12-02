import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<main className="flex justify-center pt-24 px-4 sm:px-0">
			<div
				className={clsx(
					"container",
					"max-w-sm",
					"flex",
					"justify-center",
					"bg-white",
					"text-color",
					"rounded-md",
					"px-4",
					"py-8",
					"sm:px-8",
					"shadow-md"
				)}
			>
				{children}
			</div>
		</main>
	);
}
