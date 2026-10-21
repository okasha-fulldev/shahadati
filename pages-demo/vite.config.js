import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));

// Static, GitHub Pages friendly build of the public pages (no Laravel needed).
export default defineConfig({
    root: here,
    base: './',
    publicDir: false,
    build: { outDir: path.resolve(here, 'dist'), emptyOutDir: true },
    resolve: {
        alias: [
            { find: '@inertiajs/react', replacement: path.resolve(here, 'src/inertia-shim.jsx') },
            { find: '@', replacement: path.resolve(here, '../resources/js') },
        ],
    },
    esbuild: { jsx: 'automatic' },
    plugins: [
        {
            // Copy only the assets the public pages need.
            name: 'demo-copy-assets',
            closeBundle() {
                const out = path.resolve(here, 'dist');
                fs.mkdirSync(path.join(out, 'image'), { recursive: true });
                fs.copyFileSync(path.resolve(here, '../public/image/logono.png'), path.join(out, 'image/logono.png'));
                fs.copyFileSync(path.resolve(here, '../public/favicon.ico'), path.join(out, 'favicon.ico'));
            },
        },
        {
            // Pages use absolute "/image/..." paths; make them relative to the site base.
            name: 'demo-asset-base',
            enforce: 'pre',
            transform(code, id) {
                if (!/\.jsx$/.test(id)) return null;
                const out = code.replace(/src="\/image\/([^"]+)"/g, 'src={import.meta.env.BASE_URL + "image/$1"}');
                return out === code ? null : { code: out, map: null };
            },
        },
    ],
});
