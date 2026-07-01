/**
 * Génère les fichiers MDX stub pour la section knowledge.
 * Ne remplace pas un fichier existant.
 *
 * Usage: node scripts/generate-knowledge-stubs.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'knowledge-stub-manifest.json'), 'utf8'),
);

const CONTENT_ROOT = path.join(root, 'src/content');
const LOCALES = ['fr', 'en'];

const STUB_BODY = {
  fr: 'Ce contenu est en cours de rédaction.',
  en: 'This content is being written.',
};

function mdxContent(locale, meta) {
  const body = STUB_BODY[locale];
  return `---
title: ${meta.title}
description: ${meta.description}
---

# ${meta.title}

${body}
`;
}

let created = 0;
let skipped = 0;

for (const entry of manifest) {
  for (const locale of LOCALES) {
    const meta = entry[locale];
    const dir = path.join(CONTENT_ROOT, locale, 'knowledge', entry.slug);
    const filePath = path.join(dir, 'index.mdx');

    if (fs.existsSync(filePath)) {
      skipped += 1;
      continue;
    }

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, mdxContent(locale, meta), 'utf8');
    created += 1;
  }
}

console.log(`Knowledge stubs: ${created} created, ${skipped} skipped (already exist).`);
