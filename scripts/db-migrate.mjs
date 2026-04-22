import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const maxAttempts = Number.parseInt(process.env.PRISMA_MIGRATE_RETRIES ?? "4", 10);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function runPrismaMigrate() {
  return new Promise((resolve) => {
    const child = spawn("npx", ["prisma", "migrate", "dev", ...args], {
      stdio: ["inherit", "pipe", "pipe"],
      env: {
        ...process.env,
        NODE_OPTIONS: "--dns-result-order=ipv4first",
      },
    });

    let combinedOutput = "";

    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      combinedOutput += text;
      process.stdout.write(chunk);
    });

    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      combinedOutput += text;
      process.stderr.write(chunk);
    });

    child.on("close", (code) => {
      resolve({ code: code ?? 1, combinedOutput });
    });
  });
}

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  // eslint-disable-next-line no-await-in-loop
  const { code, combinedOutput } = await runPrismaMigrate();

  if (code === 0) {
    process.exit(0);
  }

  const isP1001 = /\bP1001\b/.test(combinedOutput);
  const canRetry = isP1001 && attempt < maxAttempts;

  if (!canRetry) {
    process.exit(code);
  }

  const remaining = maxAttempts - attempt;
  console.error(`\nPrisma P1001 connectivity error. Retrying... (${remaining} attempt${remaining === 1 ? "" : "s"} left)`);
  // eslint-disable-next-line no-await-in-loop
  await sleep(2000);
}
