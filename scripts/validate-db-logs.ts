import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import YAML from "yaml";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const SCHEMA_PATH = "docs/db-log.schema.json";
const LOG_DIR = "docs/agent-log";

async function run() {
  const schema = JSON.parse(await fs.readFile(SCHEMA_PATH, "utf8"));
  const ajv = new Ajv({ allErrors: true, strict: false });

  addFormats(ajv);
  const validate = ajv.compile(schema);

  const files = await glob("docs/agent-log/*.yaml");
  let ok = true;
  const errors: Record<string, any[]> = {};

  for (const f of files) {
    const raw = await fs.readFile(f, "utf8");
    const data = YAML.parse(raw);
    const valid = validate(data);
    if (!valid) {
      ok = false;
      errors[f] = validate.errors || [];
    }
  }

  if (!ok) {
    console.error(JSON.stringify({ status: "error", files: Object.keys(errors).length, errors }, null, 2));
    process.exit(2);
  }

  console.log(JSON.stringify({ status: "ok", valid: true, files: files.length }));
}

run().catch(e => { console.error(e); process.exit(1); });