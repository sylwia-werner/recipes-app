import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<main className="flex justify-center pt-24 px-4 sm:px-0">
			<div className="container max-w-sm flex justify-center bg-white text-color rounded-md p-8 shadow-md">
				{children}
			</div>
		</main>
	);
}
