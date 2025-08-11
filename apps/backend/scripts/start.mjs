// Robust start script for CI: try to import dist/instrument.js if present, then dist/server.js
// Ensures ESM and clear error if dist not built.

import { pathToFileURL } from 'node:url'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const distDir = resolve(process.cwd(), 'dist')
const candidates = {
  instrument: [
    resolve(distDir, 'instrument.js'),
    resolve(distDir, 'src', 'instrument.js'),
  ],
  server: [
    resolve(distDir, 'server.js'),
    resolve(distDir, 'src', 'server.js'),
  ],
}

const pickFirstExisting = (paths) => paths.find((p) => existsSync(p))

const instrumentPath = pickFirstExisting(candidates.instrument)
const serverPath = pickFirstExisting(candidates.server)

if (!serverPath) {
  console.error('[start] Missing dist/server.js (or dist/src/server.js). Did you run: pnpm --filter @fleetopia/backend build ?')
  process.exit(1)
}

if (instrumentPath) {
  try {
    await import(pathToFileURL(instrumentPath).href)
  } catch (e) {
    console.warn('[start] Failed to import instrumentation (continuing):', e?.message || e)
  }
}

await import(pathToFileURL(serverPath).href)


