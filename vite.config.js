import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import compression from 'vite-plugin-compression';

export default defineConfig({
	plugins: [
		sveltekit(),
		ViteImageOptimizer({
			png: {
				quality: 80
			},
			jpeg: {
				quality: 80
			},
			jpg: {
				quality: 80
			},
			webp: {
				quality: 80
			}
		}),
		compression({
			algorithm: 'gzip',
			ext: '.gz'
		}),
		compression({
			algorithm: 'brotliCompress',
			ext: '.br'
		})
	],
	optimizeDeps: {
		exclude: [
			'vanilla-cookieconsent',
			'unsplash-js'
		],
		include: [
			'svelte-i18n'
		]
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['svelte-i18n']
				}
			}
		},
		chunkSizeWarningLimit: 1000,
		sourcemap: false
	},
	server: {
		fs: {
			allow: ['..']
		}
	}
});
