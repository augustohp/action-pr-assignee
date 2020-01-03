<p align="center">
  <a href="https://github.com/actions/typescript-action/actions">
    <img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg">
  </a>
</p>

# GitHub Action: Pull Request Assignee

Assigns a Pull Request to the person who created it, if they belong to the organization
and have `push` permission in the repository.

You can use it on a repository, by adding this a [GitHub Action][]

[github action]: https://help.github.com/en/actions "GitHub Actions Documentation"

## Usage

```yaml
- uses: augustohp/github-action-pr-assignee
  with:
    # Auth token to interact with the GitHub API (automatically generated).
    # Default: ${{ github.token }}
    token: ''

    # If no assignee can be defined (no "push" permission to the repository),
    # prevent the Pull Request from being merged.
    # Default: true
    require_assignee: false
```

### Example: Block merge without assignees

```yaml
- uses: augustohp/github-action-pr-assignee
```

### Example: Assign but do not prevent merges

```yaml
- uses: augustohp/github-action-pr-assignee
  with:
    require_assignee: false
```

## Developing

```bash
$ npm install
$ npm run build
$ npm lint
...
```
