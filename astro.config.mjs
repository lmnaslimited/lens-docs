// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Introduction',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'LENS AI Test Pilot', slug: 'introduction/lens_ai_test_pilot' },
						{ label: 'How it Works?', slug: 'introduction/how_it_works' },
					],
				},
				{
					label: 'Getting Started',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'System Requirement', slug: 'getting_started/system_requirement' },
						{ label: 'Prerequisites', slug: 'getting_started/prerequisites' },
						{ label: 'How to Install?', slug: 'getting_started/how_to_install' },
					],
				},
				{
					label: 'Test Steps',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Parent Fields in Configurator', slug: 'test_steps/fields_in_configurator' },
						{ label: 'Child Fields in Configurator', slug: 'test_steps/child_field' },
						{ label: 'On Load', slug: 'test_steps/on_load' },
						{ label: 'On Change', slug: 'test_steps/on_change' },
						{ label: 'On Tab', slug: 'test_steps/on_tab' },
						{ label: 'After Save', slug: 'test_steps/after_save' },
						{ label: 'On Submit', slug: 'test_steps/on_submit' },
						{ label: 'After Submit', slug: 'test_steps/after_submit' },
						{ label: 'On Validate', slug: 'test_steps/on_validate' },
					],
				},
				{
					label: 'Configure Test Pilot',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Setting up Configurator', slug: 'configure_test_pilot/setting_up_configurator' },
						{ label: 'Adding Test Configuration', slug: 'configure_test_pilot/adding_test_configurations' },
					],
				},
				{
					label: 'Troubleshooting & FAQs',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'What are the Common Issues', slug: 'troubleshoot/common_issues' },
						{ label: 'FAQs', slug: 'troubleshoot/faq' },
					],
				},
			],
		}),
	],
});
