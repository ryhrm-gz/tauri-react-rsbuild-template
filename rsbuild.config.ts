import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
	plugins: [pluginReact()],

	source: {
		entry: {
			index: "./src/index.tsx",
		},
	},

	server: {
		port: 1420,
		strictPort: true,
		host,
	},

	dev: {
		client: host
			? {
					protocol: "ws",
					host,
					port: 1421,
				}
			: undefined,
	},

	tools: {
		rspack: {
			watchOptions: {
				ignored: ["**/src-tauri/**"],
			},
		},
	},
});
