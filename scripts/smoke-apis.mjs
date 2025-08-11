#!/usr/bin/env node
import fs from 'node:fs';

const BASE = process.env.API_BASE || 'http://localhost:3001';
const targets = JSON.parse(
  fs.readFileSync(new URL('./apis.json', import.meta.url), 'utf8')
);

(async () => {
  let bad = 0;
  for (const t of targets) {
    const url = BASE + t.path;
    const t0 = Date.now();
    try {
      const res = await fetch(url, { method: t.method });
      const expected = Array.isArray(t.expect) ? t.expect : [t.expect];
      const ok = expected.includes(res.status);
      console.log(`${ok ? '✅' : '❌'} ${t.name} ${t.method} ${t.path} → ${res.status} in ${Date.now() - t0}ms`);
      if (!ok) bad++;
    } catch (e) {
      console.log(`❌ ${t.name} → ERROR ${e?.message || e}`);
      bad++;
    }
  }
  process.exit(bad ? 1 : 0);
})();


