#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { spawnSync } from "child_process";
import { existsSync, readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const globalMakefilePath = resolve(__dirname, "../makefiles/global.Makefile");
const localMakefilePath = resolve(process.cwd(), "Makefile");

// Get CLI arguments
const args = process.argv.slice(2);
const target = args[0]; // The first argument is the Make target

// Function to check if a target exists in a given Makefile
const targetExistsInMakefile = (makefilePath, target) => {
  if (!existsSync(makefilePath)) return false;
  
  const makefileContent = readFileSync(makefilePath, "utf-8");
  const targetRegex = new RegExp(`^${target}:`, "m"); // Match a line starting with 'target:'
  
  return targetRegex.test(makefileContent);
};

// Determine which Makefile to use
const makefileToUse = targetExistsInMakefile(localMakefilePath, target) ? localMakefilePath : globalMakefilePath;

// Run the Make command
const result = spawnSync("make", ["-f", makefileToUse, ...args], { stdio: "inherit", shell: true });

process.exit(result.status);
