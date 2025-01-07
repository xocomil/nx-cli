import * as fs from 'node:fs';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import {
  countMultiContributors,
  validateRepoDir,
} from './tools/repo.tools.mjs';

const argv = yargs(hideBin(process.argv))
  .command(
    '$0 [repo_dir]',
    'Count the number of contributions to multiple repositories',
    (yargs) => {
      yargs
        .positional('repo_dir', {
          description: 'Path to the directory containing the repositories',
        })
        .demandOption(
          'repo_dir',
          'Please provide a path to the directory containing the repository',
        );
    },
  )
  .help()
  .parse();

console.log(argv);

function main() {
  if (!validateRepoDir(argv.repo_dir)) {
    console.log('Invalid repo dir');

    process.exit(1);
  }

  const numberOfMultiContributors = countMultiContributors(argv.repo_dir);

  console.log('Number of multi contributors:', numberOfMultiContributors);
}

main();
