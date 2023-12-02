"use client";
import { Button } from "@/components/button/Button";
import { TextInput } from "@/components/inputs/text/TextInput";
import { mdiCreation } from "@mdi/js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

type FormType = {
	login: string;
	email: string;
	password: string;
};

export const RegisterView = () => {
	const [form, setForm] = useState<FormType>({
		login: "",
		email: "",
		password: "",
	});

	const { push } = useRouter();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		// TODO: VALIDATION

		push("/login");
	};

	return (
		<div className="w-full text-center">
			<p className="font-normal">Welcome</p>
			<h1 className="mt-2 text-xl font-bold">Create your account</h1>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-4 mt-8">
					<TextInput
						type="text"
						placeholder="Enter your login"
						label="Login"
						className="w-full input input-bordered input-ghost"
						value={form.login}
						onChange={value => setForm({ ...form, login: value })}
					/>
					<TextInput
						type="text"
						placeholder="Enter your email"
						label="Email"
						className="w-full input input-bordered input-ghost"
						value={form.email}
						onChange={value => setForm({ ...form, email: value })}
					/>

					<TextInput
						type="password"
						placeholder="Enter your password"
						label="Password"
						className="w-full input input-bordered input-ghost"
						value={form.password}
						onChange={value =>
							setForm({ ...form, password: value })
						}
					/>
				</div>
				<Button
					className="w-full mt-8 btn-primary"
					icon={{ path: mdiCreation, title: "Sign in" }}
					size="btn-md"
					type="submit"
				>
					Sign up
				</Button>
			</form>

			<Link href="/login" className="flex justify-center mt-6 text-sm">
				Have an account?
			</Link>
		</div>
	);
};
