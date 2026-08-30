import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.join(process.cwd(), 'src');

/** Specifiers that must never appear in a Client Component import graph. */
const FORBIDDEN_IMPORT_PATTERNS: RegExp[] = [
  /^node:/,
  /^fs$/,
  /^node:fs$/,
  /^path$/,
  /^node:path$/,
  /^child_process$/,
  /^node:child_process$/,
  /^server-only$/,
  /\.server$/,
  /\.server\.(ts|tsx|js|jsx)$/,
];

const IMPORT_FROM_RE =
  /import\s+(?:type\s+)?(?:[\w*{}\s,$]+)\s+from\s+['"]([^'"]+)['"]/g;
const IMPORT_SIDE_EFFECT_RE = /import\s+['"]([^'"]+)['"]/g;
const DYNAMIC_IMPORT_RE = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

function collectSourceFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
      continue;
    }
    if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function isClientComponent(content: string): boolean {
  const head = content.trimStart().slice(0, 300);
  return /^['"]use client['"];?\s*$/m.test(head.split('\n').slice(0, 3).join('\n'));
}

function extractImportSpecifiers(content: string): string[] {
  const specifiers = new Set<string>();

  for (const re of [IMPORT_FROM_RE, IMPORT_SIDE_EFFECT_RE, DYNAMIC_IMPORT_RE]) {
    re.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = re.exec(content)) !== null) {
      specifiers.add(match[1]);
    }
  }

  return [...specifiers];
}

function isForbiddenImport(specifier: string): boolean {
  const normalized = specifier.replace(/\\/g, '/');
  return FORBIDDEN_IMPORT_PATTERNS.some((pattern) => pattern.test(normalized));
}

describe('client component import boundary', () => {
  it('does not import server-only or Node built-ins from use client modules', () => {
    const violations: string[] = [];

    for (const filePath of collectSourceFiles(SRC_DIR)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (!isClientComponent(content)) continue;

      const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

      for (const specifier of extractImportSpecifiers(content)) {
        if (isForbiddenImport(specifier)) {
          violations.push(`${relPath} → "${specifier}"`);
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('does not import implied-vol.server from client dashboard code', () => {
    const violations: string[] = [];
    const dashboardsDir = path.join(SRC_DIR, 'components', 'dashboards');

    if (!fs.existsSync(dashboardsDir)) return;

    for (const filePath of collectSourceFiles(dashboardsDir)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (!isClientComponent(content)) continue;

      const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

      for (const specifier of extractImportSpecifiers(content)) {
        if (specifier.includes('implied-vol.server')) {
          violations.push(`${relPath} → "${specifier}"`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
