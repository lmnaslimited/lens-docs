// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { generateSidebar } from './scripts/generateSidebar.js';

const sidebar = generateSidebar('src/content/docs');

// https://astro.build/config
export default defineConfig({
	site: 'https://lmnaslimited.github.io',
  	base: '/lens-docs',
	markdown: {
		shikiConfig: {
		  themes: {
			   light: "github-light",
			   dark: "github-dark"
			},
		  wrap: true,
		},
	  },
	integrations: [
		starlight({
			title: 'LENS Docs',
			logo: {
				light: "./src/assets/icon.png",
				dark: "./src/assets/icon.png",
				replacesTitle: true,
			  },
			head: [
				{
				  tag: 'link',
				  attrs: {
					rel: 'icon',
					href: '/lens-docs/favicon.ico',
					type: 'image/x-icon',
				  },
				},
			  ],
			social: {
				youtube: "https://www.youtube.com/channel/UCq5S8zxFv7e0bd23nq_hpWg",
        		github: "https://github.com/lmnaslimited",
        		"x.com": "https://x.com/lmnaslimited",
			},
			sidebar, // ✅ Pass in the generated sidebar
		
		}),
	],
});
