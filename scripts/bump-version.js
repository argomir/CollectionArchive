#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const packagePath = join(root, 'package.json');
const appPath = join(root, 'app.json');

const SEMVER_RE = /^(\d+)\.(\d+)\.(\d+)$/;
const VALID_LEVELS = ['patch', 'minor', 'major'];

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function normalizeArgs(argv) {
  const args = argv.filter((arg) => arg !== '--');
  return args[0] ? args[0].trim() : 'patch';
}

function bumpVersion(version, level) {
  const match = version.match(SEMVER_RE);
  if (!match) {
    throw new Error(`Invalid current version format: ${version}`);
  }

  const major = Number(match[1]);
  const minor = Number(match[2]);
  const patch = Number(match[3]);

  switch (level) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`Invalid bump type: ${level}`);
  }
}

function resolveVersion(arg, currentVersion) {
  if (!arg || arg === 'patch') {
    return bumpVersion(currentVersion, 'patch');
  }

  if (VALID_LEVELS.includes(arg)) {
    return bumpVersion(currentVersion, arg);
  }

  if (SEMVER_RE.test(arg)) {
    return arg;
  }

  throw new Error(
    `Unsupported version argument: ${arg}\nUsage: pnpm bump-version [patch|minor|major|X.Y.Z]`
  );
}

function main() {
  const rawArg = normalizeArgs(process.argv.slice(2));
  const packageJson = readJson(packagePath);
  const appJson = readJson(appPath);

  const currentVersion = packageJson.version;
  if (!currentVersion) {
    throw new Error('package.json does not contain a version field.');
  }

  const newVersion = resolveVersion(rawArg, currentVersion);

  packageJson.version = newVersion;
  if (!appJson.expo || typeof appJson.expo !== 'object') {
    throw new Error('app.json does not contain an expo object.');
  }
  appJson.expo.version = newVersion;

  writeJson(packagePath, packageJson);
  writeJson(appPath, appJson);

  console.log(`Version updated from ${currentVersion} to ${newVersion}.`);
  console.log('Updated package.json and app.json.');
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
