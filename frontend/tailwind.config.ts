import type { Config } from "tailwindcss";
import PluginCreator from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./views/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/*.{js,ts,jsx,tsx,mdx}",
	],
	plugins: [daisyui],
	daisyui: {
		themes: ["light"],
	},
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
};
export default config;
