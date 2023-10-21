"use client";

import { Button } from "@/components/button/Button";
import { mdiLogin } from "@mdi/js";
import { clsx } from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginView = () => {
	const { push } = useRouter();

	const handleSubmit = () => {
		push("/");
	};

	return (
		<div className="w-full text-center">
			<p className="font-normal">Welcome</p>
			<h1 className="text-xl font-bold mt-2">Sign in to continue</h1>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-4 mt-8">
					<input
						type="text"
						placeholder="Login"
						className="input input-bordered input-ghost w-full "
					/>
					<input
						type="password"
						placeholder="Password"
						className="input input-bordered w-full "
					/>
				</div>
				<Button
					className="btn-primary w-full mt-8"
					icon={{ path: mdiLogin, title: "Sign in" }}
					size="btn-md"
					type="submit"
				>
					Sign in
				</Button>
			</form>
			<div className="flex flex-col gap-6 mt-4">
				<Button>Forgot password?</Button>

				<Link href="/register" className="text-sm">
					Dont have an account?
				</Link>
			</div>
		</div>
	);
};
