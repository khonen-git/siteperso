import fs from 'fs';
import path from 'path';

const ROOT = path.join(process.cwd(), 'src/content');
const issues = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.endsWith('.mdx')) scanFile(fullPath);
  }
}

function scanFile(filePath) {
  const rel = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  const text = fs.readFileSync(filePath, 'utf8');

  for (const match of text.matchAll(/<a\s+href="(https?:[^"]+)"[^>]*>\s*(https?:\/\/[^<\s]+)\s*<\/a>/gi)) {
    issues.push({
      file: rel,
      type: 'duplicate-url-in-anchor',
      detail: match[1],
    });
  }

  for (const match of text.matchAll(/<a\s+href="[^"]+"[^>]*>([\s\S]*?)<\/a>/gi)) {
    if (/https?:\/\//.test(match[1]) && !/duplicate-url/.test(JSON.stringify(match))) {
      const inner = match[1].trim();
      if (inner.length < 120) {
        issues.push({
          file: rel,
          type: 'nested-link-risk',
          detail: inner.replace(/\s+/g, ' ').slice(0, 80),
        });
      }
    }
  }

  if (/<MdxCard[^>]*>\n- /.test(text)) {
    issues.push({ file: rel, type: 'mdxcard-immediate-list', detail: 'List directly after <MdxCard> (fragile MDX)' });
  }
}

walk(ROOT);

for (const item of issues) {
  console.log(`${item.type}\t${item.file}\t${item.detail}`);
}
console.log(`\nTotal issues: ${issues.length}`);
