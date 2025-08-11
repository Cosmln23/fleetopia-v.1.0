import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import YAML from "yaml";

const LOG_DIR = "docs/agent-log";
const OUT = "docs/database-README.md";
const PRISMA_SCHEMA = process.env.PRISMA_SCHEMA_PATH || "apps/backend/prisma/schema.prisma";

type DBLog = any;

function mdHeader(title: string, level = 2) {
  return `${"#".repeat(level)} ${title}\n`;
}

async function readAllLogs(): Promise<DBLog[]> {
  const files = await glob(path.join(LOG_DIR, "*.yaml"));
  const entries: DBLog[] = [];
  for (const f of files) {
    const raw = await fs.readFile(f, "utf8");
    const obj = YAML.parse(raw);
    obj.__file = f;
    entries.push(obj);
  }
  entries.sort((a,b)=>String(a.date??"").localeCompare(String(b.date??"")));
  return entries;
}

type PrismaModel = {
  name: string;
  fields: { name:string; type:string; attrs:string[] }[];
  indexes: { type:"@@index"|"@@unique"; raw:string; columns:string[] }[];
  rels: { fromField:string; toModel:string; toField?:string }[];
};

function parsePrismaSchema(src: string): { models: PrismaModel[] } {
  const models: PrismaModel[] = [];
  const modelRe = /model\s+(\w+)\s+\{([\s\S]*?)\n\}/g;
  let m: RegExpExecArray | null;
  while ((m = modelRe.exec(src))) {
    const [, name, body] = m;
    const lines = body.split("\n").map(s=>s.trim()).filter(Boolean);
    const fields: PrismaModel["fields"] = [];
    const indexes: PrismaModel["indexes"] = [];
    const rels: PrismaModel["rels"] = [];

    for (const line of lines) {
      if (line.startsWith("@@")) {
        // @@index([a, b]) ... OR @@unique([a])
        const idxMatch = line.match(/^(@@index|@@unique)\((.+)\)/);
        if (idxMatch) {
          const type = idxMatch[1] as "@@index"|"@@unique";
          const colsRaw = idxMatch[2];
          const cols = (colsRaw.match(/\[([^\]]+)\]/)?.[1] || colsRaw)
            .split(",").map(s=>s.replace(/[()?\s]/g,"")).filter(Boolean);
          indexes.push({ type, raw: line, columns: cols });
        }
        continue;
      }
      // field:  name  Type  @attrs...
      const parts = line.split(/\s+/);
      if (parts.length >= 2 && !line.startsWith("//")) {
        const fname = parts[0];
        const ftype = parts[1];
        const attrs = (line.match(/@\w+(\([^\)]+\))?/g) || []);
        fields.push({ name: fname, type: ftype, attrs });

        // relation? looking for @relation(...), type is a ModelName (capitalized)
        const rel = line.match(/@relation\(([^)]*)\)/);
        if (rel && /^[A-Z]\w+(\??)?$/.test(ftype)) {
          const toModel = ftype.replace(/\?$/,"{}");
          const refs = rel[1];
          const refField = refs.match(/references:\s*\[([^\]]+)\]/)?.[1]?.split(",")[0]?.trim();
          rels.push({ fromField: fname, toModel, toField: refField });
        }
      }
    }
    // fix accidental {}
    rels.forEach(r=>{ if(r.toModel.endsWith("{}")) r.toModel=r.toModel.slice(0,-2); });
    models.push({ name, fields, indexes, rels });
  }
  return { models };
}

function sectionOverview(logs: DBLog[], models: PrismaModel[]) {
  const bootstrap = logs.find(l => l.change_type === "bootstrap");
  const multitenant = bootstrap?.multitenant;
  const perf = bootstrap?.performance;
  return [
    mdHeader("Database Overview", 1),
    `- **YAML schema_version**: ${bootstrap?.schema_version ?? "NA"}`,
    `- **Multitenant**: ${multitenant?.enabled ? `yes (key: \`${multitenant.tenant_key}\`)` : "no"}`,
    `- **Tables (from Prisma)**: ${models.length}`,
    `- **Slow query threshold**: ${perf?.slow_query_threshold_ms ?? "NA"} ms`,
    ""
  ].join("\n");
}

function sectionTables(models: PrismaModel[]) {
  const list = models.map(m => `- \`${m.name}\``).sort();
  return [mdHeader("Tables & Relations"), ...list, ""].join("\n");
}

function sectionRelations(models: PrismaModel[]) {
  const lines: string[] = [];
  models.forEach(m => {
    m.rels.forEach(r => lines.push(`- \`${m.name}.${r.fromField}\` → \`${r.toModel}${r.toField ? "."+r.toField : ""}\``));
  });
  return [mdHeader("Foreign Keys (inferred from Prisma relations)"),
    lines.length ? lines.join("\n") : "_No relations detected_",
    ""].join("\n");
}

function sectionIndexes(logs: DBLog[], models: PrismaModel[]) {
  const yamlIdx = logs.filter(l => ["index_add","index_drop"].includes(l.change_type));
  const yamlLines = yamlIdx.map(l => {
    const what = l.change_type === "index_add" ? "ADD" : "DROP";
    return `- **${what}** \`${l.index_name ?? "NA"}\` on ${l.tables?.join(", ") || "?"} — ${l.rationale ?? ""} _(migration: ${l.migration_id})_`;
  });

  const prismaLines: string[] = [];
  models.forEach(m => {
    m.indexes.forEach(ix => {
      prismaLines.push(`- ${ix.type} on \`${m.name}\` (${ix.columns.join(", ")}) — \`${ix.raw}\``);
    });
  });

  return [
    mdHeader("Indexes"),
    yamlLines.length ? yamlLines.join("\n") : "_No YAML index changes logged yet_",
    "",
    mdHeader("Indexes (from Prisma schema)", 3),
    prismaLines.length ? prismaLines.join("\n") : "_No @@index/@@unique in Prisma_",
    ""
  ].join("\n");
}

function sectionSecurity(logs: DBLog[]) {
  const latest = logs.filter(l => l.security).slice(-1)[0];
  if (!latest) return mdHeader("Security (RLS & Roles)") + "_No security info yet_\n\n";
  const rls = latest.security.rls;
  const roles = latest.security.roles || [];
  return [
    mdHeader("Security (RLS & Roles)"),
    `- **RLS**: \`${rls?.status}\` — ${rls?.notes || ""}`,
    roles.length ? roles.map((r: any) => `- Role \`${r.name}\`: ${r.scope}`).join("\n") : "- Roles: NA",
    ""
  ].join("\n");
}

function sectionPII(logs: DBLog[]) {
  const latest = logs.filter(l => l.data_quality).slice(-1)[0];
  if (!latest) return mdHeader("Data Quality (PII & Retention)") + "_No PII/retention info_\n\n";
  const pii = latest.data_quality.pii || [];
  const ret = latest.data_quality.retention || [];
  return [
    mdHeader("Data Quality (PII & Retention)"),
    pii.length ? ("**PII fields:**\n" + pii.map((p: any) => `- \`${p.table}\`: ${p.columns.join(", ")}`).join("\n")) : "**PII fields:** NA",
    "",
    ret.length ? ("**Retention:**\n" + ret.map((r: any) => `- \`${r.table}\`: ${r.policy}`).join("\n")) : "**Retention:** NA",
    ""
  ].join("\n");
}

function sectionOps(logs: DBLog[]) {
  const latest = logs.filter(l => l.ops).slice(-1)[0];
  if (!latest) return mdHeader("Ops (Backups & Replicas)") + "_No ops info_\n\n";
  const b = latest.ops.backups;
  const rp = latest.ops.replicas;
  return [
    mdHeader("Ops (Backups & Replicas)"),
    `- PITR: ${b?.pit_recovery ? "on" : "off"}; retention: ${b?.retention_days ?? "NA"} days`,
    `- Read replica: ${rp?.read_replica ?? "NA"}`,
    ""
  ].join("\n");
}

function sectionLogIndex(logs: DBLog[]) {
  const lines = logs.map(l => `- ${l.date} — \`${l.change_type}\` — ${l.__file}`);
  return [mdHeader("Change Log Index"), ...lines, ""].join("\n");
}

async function main() {
  const logs = await readAllLogs();
  const prismaRaw = await fs.readFile(PRISMA_SCHEMA, "utf8");
  const { models } = parsePrismaSchema(prismaRaw);
  const md = [
    sectionOverview(logs, models),
    sectionTables(models),
    sectionRelations(models),
    sectionIndexes(logs, models),
    sectionSecurity(logs),
    sectionPII(logs),
    sectionOps(logs),
    sectionLogIndex(logs)
  ].join("\n");
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, md, "utf8");
  console.log(JSON.stringify({ status: "ok", wrote: OUT, entries: logs.length, prismaModels: models.length }));
}

main().catch(e => { console.error(e); process.exit(1); });


