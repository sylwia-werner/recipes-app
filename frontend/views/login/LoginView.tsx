"use client";

import { Button } from "@/components/button/Button";
import { TextInput } from "@/components/inputs/text/TextInput";
import { mdiLogin } from "@mdi/js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

type FormType = {
	login: string;
	password: string;
};

export const LoginView = () => {
	const [form, setForm] = useState<FormType>({
		login: "",
		password: "",
	});
	const { push } = useRouter();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		// TODO: VALIDATION

		push("/");
	};

	return (
		<div className="w-full text-center">
			<p className="font-normal">Welcome</p>
			<h1 className="mt-2 text-xl font-bold">Sign in to continue</h1>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-4 mt-8">
					<TextInput
						label="Login"
						placeholder="Please enter your login"
						className="input-bordered"
						value={form.login}
						onChange={value => setForm({ ...form, login: value })}
					/>
					<TextInput
						type="password"
						label="Password"
						placeholder="Please enter your password"
						className="w-full input input-bordered"
						value={form.password}
						onChange={value =>
							setForm({ ...form, password: value })
						}
					/>
				</div>
				<Button
					className="w-full mt-8 font-bold btn-primary"
					icon={{ path: mdiLogin, title: "Sign in" }}
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
