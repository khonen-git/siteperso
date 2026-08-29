import fs from 'fs';
import path from 'path';

const ROOT = path.join(process.cwd(), 'src/content');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (entry.name.endsWith('.mdx')) files.push(fullPath);
  }
  return files;
}

/** Single-token MathInline → explicit string literal (MDX-safe). */
const SIMPLE_MATH_INLINE = /<MathInline>([A-Za-z0-9_]+)<\/MathInline>/g;

let updated = 0;

for (const filePath of walk(ROOT)) {
  const original = fs.readFileSync(filePath, 'utf8');
  const next = original.replace(SIMPLE_MATH_INLINE, '<MathInline>{"$1"}</MathInline>');
  if (next !== original) {
    fs.writeFileSync(filePath, next, 'utf8');
    updated++;
  }
}

console.log(`Normalized MathInline in ${updated} file(s).`);
