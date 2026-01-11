import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ai-first-dev-kit.github.io',

  integrations: [
    starlight({
      title: 'AI-First Dev Kit',
      description: 'A methodology reference for AI-assisted software development',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/ai-first-dev-kit/ai-first-dev-kit' },
      ],
      head: [],
      favicon: '/favicon.svg',
      customCss: ['./src/styles/global.css'],
      components: {
        ThemeSelect: './src/components/ThemeToggle.astro',
      },
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { slug: 'index', label: 'Introduction' },
            { slug: 'quick-start', label: 'Quick Start' },
            { slug: 'prompts', label: 'Prompt Library' },
            { slug: 'workflow', label: 'Development Workflow' },
          ],
        },
        {
          label: 'Templates',
          items: [
            { slug: 'templates', label: 'Overview' },
            { slug: 'templates/agents-md', label: 'AGENTS.md' },
            { slug: 'templates/claude-md', label: 'CLAUDE.md' },
            { slug: 'templates/copilot-instructions', label: 'Copilot Instructions' },
            { slug: 'templates/cursor-rules', label: 'Cursor Rules' },
            { slug: 'templates/prd-lite', label: 'PRD-lite Spec' },
            { slug: 'templates/feature-docs', label: 'Feature Docs' },
            { slug: 'templates/adr', label: 'ADR' },
            { slug: 'templates/project-structure', label: 'Project Structure' },
            { slug: 'templates/docs-index', label: 'Docs Index' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { slug: 'guides', label: 'Overview' },
            { slug: 'guides/new-project', label: 'New Project' },
            { slug: 'guides/existing-project', label: 'Existing Project' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { slug: 'methodology', label: 'Methodology' },
          ],
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/ai-first-dev-kit/ai-first-dev-kit/edit/main/site/',
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});