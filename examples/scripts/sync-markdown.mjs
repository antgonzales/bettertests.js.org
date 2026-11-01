#!/usr/bin/env node
/**
 * Keeps the code blocks in ../_recommendations/*.md identical to the
 * marked regions in rules/*.test.jsx.
 *
 * In a test file, a region is delimited by
 *   // example:bad      or   // example:good
 *   ...code...
 *   // example:end
 *
 * In a Markdown file, the block that mirrors it is delimited by
 *   <!-- example:bad rules/01-describe-the-object.test.jsx -->
 *   ```jsx
 *   ...code...
 *   ```
 *   <!-- /example -->
 *
 *   --write   rewrite the Markdown from the tests
 *   --check   exit 1 if any Markdown block differs from its test (CI)
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const examplesDir = resolve(here, '..');
const recommendationsDir = resolve(examplesDir, '..', '_recommendations');

const mode = process.argv.includes('--write') ? 'write' : process.argv.includes('--check') ? 'check' : null;
if (!mode) {
  console.error('usage: sync-markdown.mjs --write | --check');
  process.exit(2);
}

const MARKDOWN_BLOCK = /<!-- example:(bad|good) (\S+) -->\n([\s\S]*?)<!-- \/example -->/g;

function extractRegion(testSource, kind, testPath) {
  const start = `// example:${kind}`;
  const startIndex = testSource.indexOf(start);
  if (startIndex === -1) throw new Error(`${testPath}: missing "${start}"`);
  const bodyStart = startIndex + start.length;
  const endIndex = testSource.indexOf('// example:end', bodyStart);
  if (endIndex === -1) throw new Error(`${testPath}: "${start}" has no "// example:end"`);
  return testSource.slice(bodyStart, endIndex).replace(/^\n+|\n+$/g, '');
}

function renderBlock(kind, testPath, code) {
  return `<!-- example:${kind} ${testPath} -->\n\`\`\`jsx\n${code}\n\`\`\`\n<!-- /example -->`;
}

const problems = [];
const referencedTests = new Set();

for (const file of readdirSync(recommendationsDir).filter((f) => f.endsWith('.md')).sort()) {
  const mdPath = join(recommendationsDir, file);
  const original = readFileSync(mdPath, 'utf8');
  const kinds = new Set();

  const updated = original.replace(MARKDOWN_BLOCK, (_match, kind, testPath) => {
    kinds.add(kind);
    referencedTests.add(testPath);
    const absolute = join(examplesDir, testPath);
    if (!existsSync(absolute)) {
      problems.push(`${file}: references ${testPath}, which does not exist`);
      return _match;
    }
    const code = extractRegion(readFileSync(absolute, 'utf8'), kind, testPath);
    return renderBlock(kind, testPath, code);
  });

  for (const kind of ['bad', 'good']) {
    if (!kinds.has(kind)) problems.push(`${file}: has no <!-- example:${kind} --> block`);
  }

  if (updated !== original) {
    if (mode === 'write') {
      writeFileSync(mdPath, updated);
      console.log(`updated ${file}`);
    } else {
      problems.push(`${file}: code blocks differ from their tests (run "npm run sync" in examples/)`);
    }
  }
}

for (const test of readdirSync(join(examplesDir, 'rules')).filter((f) => f.endsWith('.test.jsx'))) {
  if (!referencedTests.has(`rules/${test}`)) {
    problems.push(`rules/${test}: no Markdown file in _recommendations/ includes it`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(mode === 'write' ? 'Markdown is in sync.' : 'Markdown matches the tests.');
