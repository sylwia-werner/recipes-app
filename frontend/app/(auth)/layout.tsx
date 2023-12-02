import Link from "next/link";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<>
			<header>
				<nav>
					<Link href="/posts">Home</Link>
				</nav>
			</header>
			<main>
				<h1>Auth layout</h1>
				{children}
			</main>
		</>
	);
}
