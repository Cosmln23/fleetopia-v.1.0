// Robust start script for CI: try to import dist/instrument.js if present, then dist/server.js
// Ensures ESM and clear error if dist not built.

import { pathToFileURL } from 'node:url'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const distDir = resolve(process.cwd(), 'dist')
const instrumentPath = resolve(distDir, 'instrument.js')
const serverPath = resolve(distDir, 'server.js')

if (!existsSync(serverPath)) {
  console.error('[start] Missing dist/server.js. Did you run: pnpm --filter @fleetopia/backend build ?')
  process.exit(1)
}

if (existsSync(instrumentPath)) {
  try {
    await import(pathToFileURL(instrumentPath).href)
  } catch (e) {
    console.warn('[start] Failed to import dist/instrument.js (continuing):', e?.message || e)
  }
}

await import(pathToFileURL(serverPath).href)


