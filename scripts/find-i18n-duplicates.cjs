/*
  Simple duplicate key finder for the RO block in utils/i18n.ts
  Usage: node scripts/find-i18n-duplicates.js
*/
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'utils', 'i18n.ts');
const src = fs.readFileSync(filePath, 'utf8');

// Extract the `ro: { ... }` object block (naive but effective for our file)
const roStart = src.indexOf('ro: {');
if (roStart === -1) {
  console.log('RO block not found');
  process.exit(0);
}

let depth = 0;
let i = roStart;
let capture = '';
for (; i < src.length; i++) {
  const ch = src[i];
  capture += ch;
  if (ch === '{') depth++;
  if (ch === '}') {
    depth--;
    if (depth === 0) break;
  }
}

// Now parse lines inside capture, skipping comments
const body = capture.split('\n').slice(1, -1).join('\n');
const keyRegex = /^\s*(?:"([^"]+)"|'([^']+)'|([A-Za-z_$][\w$]*))\s*:/;
const counts = new Map();

body.split('\n').forEach((line, idx) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('//')) return;
  const m = trimmed.match(keyRegex);
  if (m) {
    const key = m[1] || m[2] || m[3];
    const prev = counts.get(key) || [];
    prev.push(idx + 1);
    counts.set(key, prev);
  }
});

const dups = [...counts.entries()].filter(([, lines]) => lines.length > 1);
if (dups.length === 0) {
  console.log('✅ Nicio cheie duplicată în blocul RO.');
} else {
  console.log(`⚠️  Chei duplicate găsite (${dups.length}):`);
  dups.forEach(([k, lines]) => console.log(` - ${k} (linii în bloc: ${lines.join(', ')})`));
  process.exitCode = 1;
}


