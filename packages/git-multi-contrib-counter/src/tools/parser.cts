export type AuthorContribution = [author: string, projects: string[]];

export function parseGitOutput(gitOutput: string): number {
  if (!gitOutput) {
    return 0;
  }

  let parser = parseName;
  const contributorsMap = new Map<
    string,
    { count: number; projects: string[] }
  >();

  function parseName(
    line: string,
    contribution: AuthorContribution,
  ): AuthorContribution {
    parser = parseProject;

    return [line, []];
  }

  function addToContributorsMap(contributor: AuthorContribution) {
    const [author, newProjects] = contribution;

    if (!contributorsMap.has(author)) {
      contributorsMap.set(author, {
        count: newProjects.length,
        projects: newProjects,
      });
    } else {
      const currentAuthor = contributorsMap.get(author);

      if (currentAuthor) {
        const { projects: existingProjects } = currentAuthor;

        const projects = mergeProjects(existingProjects, newProjects);

        contributorsMap.set(author, { count: projects.length, projects });
      }
    }
  }

  function parseProject(
    line: string,
    contribution: AuthorContribution,
  ): AuthorContribution {
    if (!line) {
      parser = parseName;

      addToContributorsMap(contribution);

      return contribution;
    }

    const parts = line.split('/');

    if (parts.length > 2) {
      if (line.startsWith('packages/')) {
        if (contribution[1].includes(parts[1])) {
          return contribution;
        }

        return [contribution[0], contribution[1].concat(parts[1])];
      }
    }

    return contribution;
  }

  let contribution: AuthorContribution = ['', []];

  gitOutput.split('\n').forEach((line) => {
    contribution = parser(line, contribution);

    // console.log('line:', contribution);
  });

  console.log('contributorsMap:');
  contributorsMap.forEach((value, key) => {
    console.log(key, value);
  });

  return Array.from(contributorsMap).reduce((count, [, { count: c }]) => {
    if (c > 1) {
      return count + 1;
    }

    return count;
  }, 0);
}

function mergeProjects(
  existingProjects: string[],
  newProjects: string[],
): string[] {
  return existingProjects.concat(
    newProjects.filter((project) => !existingProjects.includes(project)),
  );
}
