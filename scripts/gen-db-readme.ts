import fs from 'fs';
import path from 'path';

type LogEntry = {
  date: string;
  author: string;
  change_type: string;
  migration_id: string;
  tables?: string[];
  columns?: string[];
  index_name?: string | null;
  policy_name?: string | null;
  role?: string | null;
  rationale?: string;
  risk?: string;
  links?: { pr_url?: string; migration_path?: string };
  evidence?: { before_ms?: number | null; after_ms?: number | null; explain_before?: string; explain_after?: string };
  validation?: { did_run_checks?: boolean; notes?: string };
};

function parseYaml(content: string): LogEntry | null {
  // micro parser: expecting simple key: value pairs, lists in [a,b]
  try {
    const lines = content.split(/\r?\n/).filter(Boolean);
    const obj: any = {};
    for (const line of lines) {
      if (/^\s*#/.test(line)) continue;
      const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
      if (!m) continue;
      const key = m[1];
      let value = m[2];
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1);
        obj[key] = value ? value.split(',').map((s) => s.trim()) : [];
      } else if (value === 'null') {
        obj[key] = null;
      } else {
        obj[key] = value.replace(/^"|"$/g, '');
      }
    }
    return obj as LogEntry;
  } catch {
    return null;
  }
}

function renderSection(title: string, items: string[]): string {
  if (!items.length) return '';
  return `\n## ${title}\n\n` + items.join('\n') + '\n';
}

function main() {
  const logDir = path.resolve(process.cwd(), 'docs', 'agent-log');
  if (!fs.existsSync(logDir)) {
    console.log('[gen-db-readme] docs/agent-log not found; skip');
    process.exit(0);
  }
  const files = fs
    .readdirSync(logDir)
    .filter((f) => f.endsWith('.yaml'))
    .sort();
  const entries: LogEntry[] = [];
  for (const f of files) {
    const raw = fs.readFileSync(path.join(logDir, f), 'utf8');
    const e = parseYaml(raw);
    if (e) entries.push(e);
  }

  const indexLines: string[] = [];
  const rlsLines: string[] = [];
  const tableLines: string[] = [];

  for (const e of entries) {
    const ref = e.migration_id || 'NA';
    if (e.change_type.includes('index')) {
      indexLines.push(`- ${e.index_name || 'NA'} on ${e.tables?.join(', ') || 'NA'} • ${e.rationale || ''} (migration: ${ref})`);
    }
    if (e.change_type.includes('table') || e.change_type.includes('column')) {
      tableLines.push(`- ${e.change_type} ${e.tables?.join(', ') || ''} ${e.columns?.join(', ') || ''} • ${e.rationale || ''} (migration: ${ref})`);
    }
    if (e.change_type === 'rls_update') {
      rlsLines.push(`- policy ${e.policy_name} on ${e.tables?.join(', ') || ''} • ${e.rationale || ''} (migration: ${ref})`);
    }
  }

  let out = '# Database — Overview\n';
  out += renderSection('Indexuri', indexLines);
  out += renderSection('Tabele & Coloane', tableLines);
  out += renderSection('RLS & Politici', rlsLines);

  const outPath = path.resolve(process.cwd(), 'docs', 'database-README.md');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, out, 'utf8');
  console.log('[gen-db-readme] wrote', outPath);
}

main();


