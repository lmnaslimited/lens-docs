// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://lmnaslimited.github.io',
  	base: '/lens_ai_test_pilot_docs',
	markdown: {
		shikiConfig: {
		  theme: "github-dark",
		  wrap: true,
		},
	  },
	integrations: [
		starlight({
			title: 'LENS Docs',
			logo: {
				light: "./src/assets/lmnaslogo.png",
				dark: "./src/assets/lmnaswhite.png",
				replacesTitle: true,
			  },
			social: {
				youtube: "https://www.youtube.com/channel/UCq5S8zxFv7e0bd23nq_hpWg",
        		github: "https://github.com/lmnaslimited",
        		"x.com": "https://x.com/lmnaslimited",
			},
			sidebar: [
				{
					label: "Documentation Standards",
					items: [
							{ label: 'General Story Structure', slug: 'doc-std/hls-guide/general-story-structure' },
							{
								label: "High-Level Solution",
								items: [
									{
										label: 'Issue Story',
										slug: 'doc-std/hls-guide/issue-story',
									},
									{
										label: 'Testing Story',
										slug: 'doc-std/hls-guide/testing-story',
									},
									{
										label: 'Automation Story',
										slug: 'doc-std/hls-guide/automation',
									},
									{
										label: 'POC Story',
										slug: 'doc-std/hls-guide/poc-story',
									},
									
								]
							},
							{
								label: "Low-Level Solution",
								items: [
									{
										label: 'Issue Story',
										slug: 'doc-std/lls-guide/issue-story',
									},
									{
										label: 'Testing Story',
										slug: 'doc-std/lls-guide/testing-story',
									},
									{
										label: 'Automation Story',
										slug: 'doc-std/lls-guide/automation',
									},
									{
										label: 'POC Story',
										slug: 'doc-std/lls-guide/poc',
									},
									
								]
							},
					
					]
				},

				{
					label: "Programming Standards",
					items: [
							{ label: 'Introduction', slug: 'prog-std/introduction' },
							{
								label: "Naming Convention",
								items: [
									{ label: 'Introduction', slug: 'prog-std/naming-convention/introduction' },
									{ label: 'Javascript Naming Convention', slug: 'prog-std/naming-convention/javascript-standards' },
									{ label: 'Python Naming Convention', slug: 'prog-std/naming-convention/python-standards' },
									{ label: 'Typescript Naming Convention', slug: 'prog-std/naming-convention/typescript-standards' },
									
								]
							},
							{ label: 'Performance Standards', slug: 'prog-std/performance-standards' },
					
					]
				},

				{
					label: "LENS AI Test Pilot",
					items: [
				{
					label: 'Introduction',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'LENS AI Test Pilot', slug: 'ai-test-pilot/introduction/lens_ai_test_pilot' },
						{ label: 'How it Works?', slug: 'ai-test-pilot/introduction/how_it_works' },
					],
				},
				{
					label: 'Getting Started',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Prerequisites', slug: 'ai-test-pilot/getting_started/prerequisites' },
						{ label: 'How to Install?', slug: 'ai-test-pilot/getting_started/how_to_install' },
					],
				},
				{
					label: 'Test Steps',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Parent Fields in Configurator', slug: 'ai-test-pilot/test_steps/fields_in_configurator' },
						{ label: 'Child Fields in Configurator', slug: 'ai-test-pilot/test_steps/child_field' },
						{ label: 'On Load', slug: 'ai-test-pilot/test_steps/on_load' },
						{ label: 'On Change', slug: 'ai-test-pilot/test_steps/on_change' },
						{ label: 'On Tab', slug: 'ai-test-pilot/test_steps/on_tab' },
						{ label: 'After Save', slug: 'ai-test-pilot/test_steps/after_save' },
						{ label: 'On Submit', slug: 'ai-test-pilot/test_steps/on_submit' },
						{ label: 'After Submit', slug: 'ai-test-pilot/test_steps/after_submit' },
						{ label: 'On Validate', slug: 'ai-test-pilot/test_steps/on_validate' },
					],
				},
				{
					label: 'Configure Test Pilot',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Setting up Configurator', slug: 'ai-test-pilot/configure_test_pilot/setting_up_configurator' },
						{ label: 'Adding Test Configuration', slug: 'ai-test-pilot/configure_test_pilot/adding_test_configurations' },
					],
				},
				{
					label: 'Troubleshooting & FAQs',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'What are the Common Issues', slug: 'ai-test-pilot/troubleshoot/common_issues' },
						{ label: 'FAQs', slug: 'ai-test-pilot/troubleshoot/faq' },
					],
				},
			]
		},

			],
		}),
	],
});
