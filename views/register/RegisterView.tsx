"use client";
import { Button } from "@/components/button/Button";
import { mdiAccount, mdiCreation, mdiLogin } from "@mdi/js";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const RegisterView = () => {
	const { push } = useRouter();

	const handleSubmit = () => {
		push("/login");
	};

	return (
		<div className="w-full text-center">
			<p className="font-normal">Welcome</p>
			<h1 className="text-xl font-bold mt-2">Create your account</h1>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-4 mt-8">
					<input
						type="text"
						placeholder="Login"
						className="input input-bordered input-ghost w-full max-w-xs"
					/>
					<input
						type="email"
						placeholder="Email Address"
						className="input input-bordered input-ghost w-full max-w-xs"
					/>
					<input
						type="password"
						placeholder="Password"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<Button
					className="btn-primary w-full mt-8"
					icon={{ path: mdiCreation, title: "Sign in" }}
					size="btn-md"
					type="submit"
				>
					Create account
				</Button>
			</form>

			<Link href="/login" className="flex justify-center text-sm mt-6">
				Have an account?
			</Link>
		</div>
	);
};
