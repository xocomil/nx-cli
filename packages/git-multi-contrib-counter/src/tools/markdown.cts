import * as fs from 'node:fs';
import * as path from 'node:path';

export function updateReadme(
  multipleContributorCount: number,
  repoPath: string,
): void {
  const readmePath = path.join(repoPath, 'README.md');

  const readmeContent = createReadmeContent(
    multipleContributorCount,
    readmePath,
  );

  console.log('readmeContent:', readmeContent);

  const stream = fs.createWriteStream(readmePath);

  stream.write(readmeContent);

  stream.close();
}

function createReadmeContent(
  multipleContributorCount: number,
  readmePath: string,
): string {
  const newReadmeContent = `## Git Multi Contributor Counter
Number of multi-repo contributors: ${multipleContributorCount}`;

  // console.log(newReadmeContent);

  if (!checkReadmeExists(readmePath)) {
    return newReadmeContent;
  }

  const readme = fs.openSync(readmePath, 'r+');

  const readmeContent = fs.readFileSync(readme, 'utf-8');

  const multiContributorCountRegex = /Number of multi-repo contributors: \d*/;

  if (!multiContributorCountRegex.test(readmeContent)) {
    return readmeContent + newReadmeContent;
  }

  const updatedReadmeContent = readmeContent.replace(
    multiContributorCountRegex,
    `Number of multi-repo contributors: ${multipleContributorCount}`,
  );

  return updatedReadmeContent;
}

function checkReadmeExists(readmePath: string): boolean {
  return fs.existsSync(readmePath);
}
