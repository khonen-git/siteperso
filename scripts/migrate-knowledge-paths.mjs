/**
 * Migre les chemins MDX knowledge (PR2).
 * Usage: node scripts/migrate-knowledge-paths.mjs
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const CONTENT = path.join(root, 'src/content');

const LOCALES = ['fr', 'en'];

function knowledgePath(locale, ...segments) {
  return path.join(CONTENT, locale, 'knowledge', ...segments);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function gitMv(from, to) {
  if (!fs.existsSync(from)) {
    console.warn(`skip (missing): ${from}`);
    return;
  }
  ensureDir(path.dirname(to));
  if (fs.existsSync(to)) {
    console.warn(`skip (target exists): ${to}`);
    return;
  }
  execSync(`git mv "${from}" "${to}"`, { cwd: root, stdio: 'inherit' });
}

function removeDirIfEmpty(dir) {
  if (!fs.existsSync(dir)) return;
  if (fs.readdirSync(dir).length === 0) {
    fs.rmdirSync(dir);
  }
}

for (const locale of LOCALES) {
  const k = (...s) => knowledgePath(locale, ...s);

  // programming → engineering
  for (const dir of ['python', 'design-patterns', 'data-structures']) {
    gitMv(k('programming', dir), k('engineering', dir));
  }

  ensureDir(k('engineering', 'hardware'));
  for (const entry of fs.existsSync(k('programming', 'hardware'))
    ? fs.readdirSync(k('programming', 'hardware'))
    : []) {
    gitMv(k('programming', 'hardware', entry), k('engineering', 'hardware', entry));
  }

  // finance → quantitative-finance
  ensureDir(k('quantitative-finance', 'markets-products'));
  ensureDir(k('quantitative-finance', 'options-derivatives'));
  ensureDir(k('quantitative-finance', 'volatility', 'implied-vs-realized'));

  for (const file of ['asset-classes.mdx', 'contract-types.mdx']) {
    gitMv(
      k('finance', file),
      k('quantitative-finance', 'markets-products', file),
    );
  }

  gitMv(
    k('finance', 'options.mdx'),
    k('quantitative-finance', 'options-derivatives', 'options.mdx'),
  );

  gitMv(
    k('finance', 'black-scholes'),
    k('quantitative-finance', 'options-derivatives', 'black-scholes'),
  );

  gitMv(
    k('finance', 'volatility'),
    k('quantitative-finance', 'volatility', 'implied-vs-realized'),
  );

  // data-science → machine-learning / financial-econometrics
  ensureDir(k('machine-learning', 'general-concepts'));
  ensureDir(k('machine-learning', 'classical-models'));
  ensureDir(k('quantitative-finance', 'financial-econometrics'));

  gitMv(
    k('data-science', 'cross-validation'),
    k('machine-learning', 'general-concepts', 'cross-validation'),
  );

  gitMv(
    k('data-science', 'machine-learning', 'supervised', 'random-forest'),
    k('machine-learning', 'classical-models', 'random-forest'),
  );

  gitMv(
    k('data-science', 'machine-learning', 'supervised', 'xgboost'),
    k('machine-learning', 'classical-models', 'xgboost'),
  );

  gitMv(
    k('data-science', 'machine-learning', 'unsupervised', 'hmm'),
    k('quantitative-finance', 'financial-econometrics', 'regimes-hmm'),
  );

  // probability
  ensureDir(k('probability', 'distributions', 'normal'));
  gitMv(
    k('mathematics', 'probability', 'distributions', 'continuous', 'normal.mdx'),
    k('probability', 'distributions', 'normal', 'index.mdx'),
  );

  // statistics
  ensureDir(k('statistics', 'inference'));
  ensureDir(k('statistics', 'descriptive'));

  gitMv(
    k('mathematics', 'statistics', 'inductive', 'statistical-tests'),
    k('statistics', 'inference', 'statistical-tests'),
  );

  gitMv(
    k('mathematics', 'statistics', 'inductive', 'fundamentals'),
    k('statistics', 'inference', 'fundamentals'),
  );

  gitMv(
    k('mathematics', 'statistics', 'descriptive', 'fundamentals'),
    k('statistics', 'descriptive', 'fundamentals'),
  );

  gitMv(
    k('mathematics', 'statistics', 'descriptive', 'visualization'),
    k('statistics', 'descriptive', 'visualization'),
  );

  // cleanup empty legacy dirs
  for (const legacy of [
    k('programming'),
    k('finance'),
    k('data-science'),
    k('mathematics', 'probability'),
    k('mathematics', 'statistics'),
  ]) {
    if (fs.existsSync(legacy)) {
      fs.rmSync(legacy, { recursive: true, force: true });
      console.log(`removed: ${legacy}`);
    }
  }
}

console.log('Migration PR2 terminée.');
