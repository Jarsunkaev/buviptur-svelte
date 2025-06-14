import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: [
			'flatpickr',
			'vanilla-cookieconsent',
			'unsplash-js'
		]
	}
});
