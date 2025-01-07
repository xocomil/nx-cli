import { parseGitOutput } from './parser.cts';

describe('parseGitOutput', () => {
  it('should return 0 when there are no contributors', () => {
    expect(parseGitOutput('')).toBe(0);
  });

  it('should return 1 when there is one contributor', () => {
    expect(
      parseGitOutput('Author Name\npackages/project1\npackages/project2'),
    ).toBe(1);
  });

  it('should return 2 when there are two contributors', () => {
    expect(
      parseGitOutput(
        'Author Name\npackages/project1\npackages/project2\n\nAuthor Name 2\npackages/project1\npackages/project2',
      ),
    ).toBe(2);
  });
});
