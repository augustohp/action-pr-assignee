<p align="center">
  <a href="https://github.com/augustohp/action-pr-assignee/actions">
    <img alt="Test status" src="https://github.com/augustohp/action-pr-assignee/workflows/Test/badge.svg">
  </a>
</p>

# GitHub Action: Pull Request Assignee

Assigns a Pull Request to the person who created it, if they belong to the organization
and have `push` permission in the repository.

[github actions]: https://help.github.com/en/actions "GitHub Actions Documentation"

## Usage

You can use it on a repository through [GitHub Actions][]:

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

To build and run run all checks:

```bash
$ npm install
$ npm run all
...
```

*Releases* publish a NPM package to [GitHub Package Registry][gpr], to create 
a new one:

* Update `version` on `composer.json
* Create a *tag* on Git and a *release* on GitHub

[gpr]: https://github.com/features/packages