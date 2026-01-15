#!/usr/bin/env node

/**
 * sync-docs.js
 * 
 * Syncs content from source directories to site/src/content/docs/
 * Single source of truth: content/ and root METHODOLOGY.md
 * 
 * Usage: node scripts/sync-docs.js
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..', '..');
const CONTENT_DIR = join(ROOT_DIR, 'content');
const SITE_DOCS_DIR = join(__dirname, '..', 'src', 'content', 'docs');

// File mapping configuration
const FILE_MAPPINGS = [
  // Root METHODOLOGY.md
  {
    source: join(ROOT_DIR, 'METHODOLOGY.md'),
    dest: join(SITE_DOCS_DIR, 'methodology.md'),
    transform: transformMethodology
  },
  // Prompts
  {
    source: join(CONTENT_DIR, 'prompts.md'),
    dest: join(SITE_DOCS_DIR, 'prompts.md'),
    transform: transformSimple
  },
  // Workflow from rules
  {
    source: join(CONTENT_DIR, 'rules', '01-workflow.md'),
    dest: join(SITE_DOCS_DIR, 'workflow.md'),
    transform: transformWorkflow
  },
  // Guides
  {
    source: join(CONTENT_DIR, 'guides', 'existing-project.md'),
    dest: join(SITE_DOCS_DIR, 'guides', 'existing-project.md'),
    transform: transformGuide
  },
  {
    source: join(CONTENT_DIR, 'guides', 'new-project.md'),
    dest: join(SITE_DOCS_DIR, 'guides', 'new-project.md'),
    transform: transformGuide
  },
  // Templates
  {
    source: join(CONTENT_DIR, 'templates', 'AGENTS.md'),
    dest: join(SITE_DOCS_DIR, 'templates', 'agents-md.md'),
    transform: transformTemplate
  },
  {
    source: join(CONTENT_DIR, 'templates', 'CLAUDE.md'),
    dest: join(SITE_DOCS_DIR, 'templates', 'claude-md.md'),
    transform: transformTemplate
  },
  {
    source: join(CONTENT_DIR, 'templates', 'copilot-instructions.md'),
    dest: join(SITE_DOCS_DIR, 'templates', 'copilot-instructions.md'),
    transform: transformTemplate
  },
  {
    source: join(CONTENT_DIR, 'templates', 'prd-lite.md'),
    dest: join(SITE_DOCS_DIR, 'templates', 'prd-lite.md'),
    transform: transformTemplate
  },
  {
    source: join(CONTENT_DIR, 'templates', 'adr.md'),
    dest: join(SITE_DOCS_DIR, 'templates', 'adr.md'),
    transform: transformTemplate
  },
  {
    source: join(CONTENT_DIR, 'templates', 'feature-readme.md'),
    dest: join(SITE_DOCS_DIR, 'templates', 'feature-docs.md'),
    transform: transformTemplate
  },
  {
    source: join(CONTENT_DIR, 'templates', 'README.md'),
    dest: join(SITE_DOCS_DIR, 'templates', 'docs-index.md'),
    transform: transformTemplate
  },
  {
    source: join(CONTENT_DIR, 'rules', '00-structure.md'),
    dest: join(SITE_DOCS_DIR, 'templates', 'project-structure.md'),
    transform: transformTemplate
  },
];

// Cursor rules templates - handled separately due to folder structure
const CURSOR_RULES_SOURCE = join(CONTENT_DIR, 'templates', 'cursor-rules');
const CURSOR_RULES_DEST = join(SITE_DOCS_DIR, 'templates', 'cursor-rules.md');

/**
 * Parse <!-- site: ... --> enrichment block from markdown
 */
function parseEnrichment(content) {
  const enrichmentRegex = /<!--\s*site:\s*([\s\S]*?)-->/;
  const match = content.match(enrichmentRegex);
  
  if (!match) return { enrichment: null, content };
  
  const enrichmentYaml = match[1].trim();
  const cleanContent = content.replace(enrichmentRegex, '').trim();
  
  // Simple YAML-like parsing for our use case
  const enrichment = {};
  let currentKey = null;
  let currentValue = [];
  
  for (const line of enrichmentYaml.split('\n')) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      if (currentKey) {
        enrichment[currentKey] = currentValue.length === 1 ? currentValue[0] : currentValue;
      }
      currentKey = keyMatch[1];
      currentValue = keyMatch[2] ? [keyMatch[2]] : [];
    } else if (currentKey && line.trim().startsWith('-')) {
      currentValue.push(line.trim().substring(1).trim());
    } else if (currentKey && line.trim()) {
      currentValue.push(line.trim());
    }
  }
  
  if (currentKey) {
    enrichment[currentKey] = currentValue.length === 1 ? currentValue[0] : currentValue;
  }
  
  return { enrichment, content: cleanContent };
}

/**
 * Extract title from first heading in markdown
 */
function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].replace(/[[\]]/g, '').trim() : 'Untitled';
}

/**
 * Generate Starlight frontmatter
 */
function generateFrontmatter(title, description = '') {
  return `---
title: ${title}
description: ${description || title}
head: []
---

`;
}

/**
 * Transform METHODOLOGY.md for site
 */
function transformMethodology(content) {
  const { enrichment, content: cleanContent } = parseEnrichment(content);
  
  const title = enrichment?.title || 'Methodology';
  const description = enrichment?.description || 'A document lifecycle system for AI-assisted software development';
  
  // Remove the original title heading if present
  let body = cleanContent.replace(/^#\s+AI Context Docs Lifecycle\s*\n+/m, '');
  // Remove the blockquote tagline if present
  body = body.replace(/^>\s+\*\*A document lifecycle methodology.*?\*\*\s*\n+/m, '');
  // Remove leading horizontal rule if present (to avoid double ---)
  body = body.replace(/^---\s*\n+/, '');
  
  return generateFrontmatter(title, description) + body.trim();
}

/**
 * Transform simple content files (prompts, etc.)
 */
function transformSimple(content) {
  const { enrichment, content: cleanContent } = parseEnrichment(content);
  
  let title = enrichment?.title || extractTitle(cleanContent);
  // Clean up common prefixes
  title = title.replace(/^#\s*/, '').replace(/^AI\s+/, '');
  
  const description = enrichment?.description || '';
  
  // Remove original title heading
  let body = cleanContent.replace(/^#\s+.+\n+/m, '');
  // Remove blockquote taglines
  body = body.replace(/^>\s+.+\n+/m, '');
  
  return generateFrontmatter(title, description) + body.trim();
}

/**
 * Transform workflow content
 */
function transformWorkflow(content) {
  const { enrichment, content: cleanContent } = parseEnrichment(content);
  
  const title = enrichment?.title || 'Development Workflow';
  const description = enrichment?.description || 'Day-to-day prompts for building features with AI assistance';
  
  // Remove original title and tagline
  let body = cleanContent.replace(/^#\s+Required Workflow\s*\n+/m, '');
  body = body.replace(/^>\s+\*\*For AI Agents\*\*.*?\n+/m, '');
  
  return generateFrontmatter(title, description) + body.trim();
}

/**
 * Transform guide content
 */
function transformGuide(content, sourcePath) {
  const { enrichment, content: cleanContent } = parseEnrichment(content);
  
  const filename = basename(sourcePath, '.md');
  let title = enrichment?.title;
  let description = enrichment?.description || '';
  
  if (!title) {
    if (filename === 'existing-project') {
      title = 'Existing Project Guide';
      description = 'Add AI Context Docs Lifecycle to an existing codebase';
    } else if (filename === 'new-project') {
      title = 'New Project Guide';
      description = 'Set up AI Context Docs Lifecycle for a new project';
    } else {
      title = extractTitle(cleanContent);
    }
  }
  
  // Remove original title and tagline
  let body = cleanContent.replace(/^#\s+.+\n+/m, '');
  body = body.replace(/^>\s+\*\*For AI Agents\*\*.*?\n+/m, '');
  
  return generateFrontmatter(title, description) + body.trim();
}

/**
 * Transform template content with enrichment
 */
function transformTemplate(content, sourcePath) {
  const { enrichment, content: cleanContent } = parseEnrichment(content);
  
  const filename = basename(sourcePath, '.md');
  let title = enrichment?.title;
  let description = enrichment?.description || '';
  let purpose = enrichment?.purpose || '';
  let updateWhen = enrichment?.updateWhen || '';
  
  // Default titles based on filename
  if (!title) {
    const titleMap = {
      'AGENTS': 'AGENTS.md Template',
      'CLAUDE': 'CLAUDE.md Template',
      'copilot-instructions': 'Copilot Instructions Template',
      'prd-lite': 'PRD-lite Spec Template',
      'adr': 'ADR Template',
      'feature-readme': 'Feature Documentation Template',
      'README': 'Docs Index Template',
      '00-structure': 'Project Structure'
    };
    title = titleMap[filename] || extractTitle(cleanContent);
  }
  
  // Default descriptions
  if (!description) {
    const descMap = {
      'AGENTS': 'Root context file that gives AI instant understanding of your project',
      'CLAUDE': 'Context file for Claude Code AI assistant',
      'copilot-instructions': 'Instructions file for GitHub Copilot',
      'prd-lite': 'Lightweight product requirements document for features',
      'adr': 'Architecture Decision Record template',
      'feature-readme': 'Documentation structure for feature folders',
      'README': 'Index file for the docs folder',
      '00-structure': 'Required folder structure for projects'
    };
    description = descMap[filename] || '';
  }
  
  // Build the output
  let output = generateFrontmatter(title, description);
  
  // Add purpose section if available
  if (purpose) {
    output += `## Purpose\n\n${purpose}\n\n`;
  }
  
  if (updateWhen) {
    output += `**Update when:** ${updateWhen}\n\n---\n\n`;
  }
  
  // Remove template header and notes
  let body = cleanContent;
  body = body.replace(/^#\s+.+\n+/m, ''); // Remove title
  body = body.replace(/^>\s+\*\*TEMPLATE\*\*.*?\n+/m, ''); // Remove template note
  body = body.replace(/^>\s+See `\.\.\/examples\/.*?`.*?\n+/m, ''); // Remove example reference
  
  // Wrap the template content in a code block for display
  if (enrichment?.wrapInCodeBlock !== false && !body.includes('````markdown')) {
    output += `## Template\n\n\`\`\`\`markdown\n${body.trim()}\n\`\`\`\`\n`;
  } else {
    output += body.trim();
  }
  
  return output;
}

/**
 * Transform cursor rules templates
 */
function transformCursorRules() {
  const title = 'Cursor Rules Templates';
  const description = 'Rule files that guide AI behavior in Cursor IDE';
  
  let output = generateFrontmatter(title, description);
  
  output += `## Purpose

Cursor rules are MDC files that automatically load when you work with matching files. They contain patterns and conventions that guide AI code generation.

**Update when:** New patterns emerge, conventions change, or you want AI to follow new rules.

---

## Rule Index Template (00-index.mdc)

`;
  
  // Read 00-index.mdc
  const indexPath = join(CURSOR_RULES_SOURCE, '00-index.mdc');
  if (existsSync(indexPath)) {
    const indexContent = readFileSync(indexPath, 'utf-8');
    output += `\`\`\`\`markdown\n${indexContent.trim()}\n\`\`\`\`\n\n---\n\n`;
  }
  
  // Add other rule templates
  const ruleFiles = [
    { file: 'coding-patterns.mdc', title: 'Coding Patterns Template' },
    { file: 'project-architecture.mdc', title: 'Project Architecture Template' },
    { file: 'state-management.mdc', title: 'State Management Template' },
    { file: 'testing-strategy.mdc', title: 'Testing Strategy Template' },
    { file: 'documentation.mdc', title: 'Documentation Template' },
  ];
  
  for (const { file, title } of ruleFiles) {
    const filePath = join(CURSOR_RULES_SOURCE, file);
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf-8');
      output += `## ${title}\n\n\`\`\`\`markdown\n${content.trim()}\n\`\`\`\`\n\n---\n\n`;
    }
  }
  
  return output.trim();
}

/**
 * Main sync function
 */
function sync() {
  console.log('🔄 Syncing docs from content/ to site/src/content/docs/\n');
  
  let synced = 0;
  let errors = 0;
  
  // Process file mappings
  for (const mapping of FILE_MAPPINGS) {
    try {
      if (!existsSync(mapping.source)) {
        console.log(`⚠️  Source not found: ${mapping.source}`);
        continue;
      }
      
      const content = readFileSync(mapping.source, 'utf-8');
      const transformed = mapping.transform(content, mapping.source);
      
      // Ensure destination directory exists
      mkdirSync(dirname(mapping.dest), { recursive: true });
      
      writeFileSync(mapping.dest, transformed);
      console.log(`✅ ${basename(mapping.source)} → ${mapping.dest.replace(SITE_DOCS_DIR + '/', '')}`);
      synced++;
    } catch (err) {
      console.error(`❌ Error processing ${mapping.source}: ${err.message}`);
      errors++;
    }
  }
  
  // Process cursor rules
  try {
    const cursorRulesContent = transformCursorRules();
    mkdirSync(dirname(CURSOR_RULES_DEST), { recursive: true });
    writeFileSync(CURSOR_RULES_DEST, cursorRulesContent);
    console.log(`✅ cursor-rules/ → templates/cursor-rules.md`);
    synced++;
  } catch (err) {
    console.error(`❌ Error processing cursor rules: ${err.message}`);
    errors++;
  }
  
  console.log(`\n📊 Synced ${synced} files${errors > 0 ? `, ${errors} errors` : ''}`);
  
  if (errors > 0) {
    process.exit(1);
  }
}

// Run sync
sync();
