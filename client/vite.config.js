import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs"

export default defineConfig(({mode}) => {
const env = loadEnv(mode,process.cwd(),'VITE_');

	return {
		plugins: [react()],
		define: {
			"process.env":JSON.stringify(env),
		},
		server: {
			https: {
				key:fs.readFileSync("ssl/server.key"),
				cert:fs.readFileSync("ssl/server.cert")
			},
			host:"127.0.0.1",
			open:true,
		},
		preview: {
			host: "0.0.0.0",
			open:true,
		}
	}
})
