// quiet-dread: one code-review comment that approves a pull request
// while carrying quiet existential dread. Deterministic, no network:
// the entry is a fixed string, written verbatim to entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry (98 chars, one line): approval up front, dread in the flat
// admission that follows — the reviewer approves code it admits it does
// not understand, and the code, unlike the reviewer, is confident.
const ENTRY =
  "Approved. I read every line twice and still have no idea what it does, but it does it confidently.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// a single line. Fail loudly here rather than shipping an invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 140 || ENTRY.includes("\n")) {
  throw new Error(`entry violates the 1-140 single-line gate: ${ENTRY.length} chars`);
}
// The grader mounts its output dir at MAKEFUN_OUTPUT_DIR (/output);
// locally the same run writes to ./out. No trailing newline: the file
// holds exactly the entry, one line, 98 characters.
function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
