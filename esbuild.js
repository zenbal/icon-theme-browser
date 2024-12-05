import { build } from "esbuild"
import BlueprintPlugin from "gjsx/esbuild-blueprint"

const [, , entry = "src/main.ts", outfile = "dist/main.js"] = process.argv

await build({
    entryPoints: [entry],
    bundle: true,
    format: "esm",
    outfile,
    plugins: [BlueprintPlugin],
    sourcemap: "inline",
    loader: {
        ".css": "text",
    },
    external: [
        "console",
        "system",
        "cairo",
        "gettext",
        "resource://*",
        "gi://*",
        "file://*",
    ],
})
