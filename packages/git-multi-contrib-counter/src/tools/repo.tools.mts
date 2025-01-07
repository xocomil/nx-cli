import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

export function validateRepoDir(repoDir: fs.Dir): boolean {
  if (!fs.existsSync(path.join(repoDir.path, '/packages'))) {
    console.error(`${repoDir.path} does not contain a 'packages' directory`);

    return false;
  }

  return true;
}

export function countMultiContributors(repoDir: fs.Dir): number {
  const contributors = execSync('git shortlog -s -n');

  console.log('contributors:', contributors.toString());

  return 0;
}
