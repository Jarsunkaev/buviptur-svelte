import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import compression from 'vite-plugin-compression';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
			},
			includeAssets: ['favicon.png', '*.webp'],
			manifest: {
				name: 'BuVipTur - Premium Central Europe Tours',
				short_name: 'BuVipTur',
				description: 'Discover authentic Central Europe with expert guides',
				theme_color: '#113946',
				background_color: '#ffffff',
				display: 'standalone',
				start_url: '/',
				icons: [
					{
						src: '/favicon.png',
						sizes: '192x192',
						type: 'image/png'
					}
				]
			}
		}),
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
					vendor: ['svelte-i18n'],
					utils: ['flatpickr', 'vanilla-cookieconsent']
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
