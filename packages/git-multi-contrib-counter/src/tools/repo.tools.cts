import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { parseGitOutput } from './parser.mjs';

export function validateRepoDir(repoDir: string): boolean {
  if (!fs.existsSync(repoDir)) {
    console.error(`${repoDir} does not exist`);

    return false;
  }

  if (!fs.existsSync(path.join(repoDir, '/packages'))) {
    console.error(`${repoDir} does not contain a 'packages' directory`);

    return false;
  }

  return true;
}

export function countMultiContributors(repoDir: string): number {
  const contributors = execSync(
    'git whatchanged --pretty=format:"%an" --name-only -p packages',
    { cwd: repoDir },
  );

  const count = parseGitOutput(contributors.toString());

  return count;
}
