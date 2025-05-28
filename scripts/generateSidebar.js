import fs from 'fs';
import path from 'path';

/**
 * Generate a display label from a filename/foldername:
 * - Removes number prefixes like `01-`
 * - Converts dashes/underscores to spaces
 * - Capitalizes words
 * - Replaces 'lens' (case-insensitive) with 'LENS'
 */
function formatLabel(name) {
	const noPrefix = name.replace(/^\d+-/, '');
	const label = noPrefix
		.replace(/[-_]/g, ' ')
		.replace(/\blens\b/gi, 'LENS') // Replace 'lens' with 'LENS'
		.replace(/\b\w/g, (char) => char.toUpperCase());
	return label;
}
/**
 * Recursively generate the sidebar from directory content.
 * @param {string} dir - The directory path to scan
 * @param {string} baseSlug - Base slug for routing
 * @param {boolean} isRoot - Whether this is the top-level directory
 * @returns {import('@astrojs/starlight').Sidebar}
 */
export function generateSidebar(dir = 'src/content/docs', baseSlug = '', isRoot = true) {
	const entries = fs
		.readdirSync(dir, { withFileTypes: true })
		.filter((entry) => {
			const isIndex = /^index\.mdx?$/.test(entry.name.toLowerCase());
			if (isRoot && isIndex) return false; // Exclude root index
			if (entry.name.startsWith('_') || entry.name.startsWith('.')) return false;
			return true;
		})
		.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name (prefix order)

	return entries.map((entry) => {
		const fullPath = path.join(dir, entry.name);
		const slug = path.join(baseSlug, entry.name.replace(/\.mdx?$/, '')).replace(/\\/g, '/');

		if (entry.isDirectory()) {
			return {
				label: formatLabel(entry.name),
				items: generateSidebar(fullPath, slug, false),
			};
		}

		if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
			return {
				label: formatLabel(entry.name.replace(/\.mdx?$/, '')),
				slug,
			};
		}

		return null;
	}).filter(Boolean);
}