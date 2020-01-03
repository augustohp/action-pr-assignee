import * as core from '@actions/core'
import * as github from '@actions/github'
import {Context} from '@actions/github/lib/context'

async function run(): Promise<void> {
  try {
    if (!github.context.payload.pull_request) {
      return
    }
    const token = core.getInput('token', {required: true})
    const requireAssignee = core.getInput('require_assignee', {required: true})
    const gh = new github.GitHub(token)

    const isSomeoneAssigned = await assignPullRequest({ gh, context: github.context })
    if (!isSomeoneAssigned && requireAssignee) {
      core.setFailed('Could not assign anyone to the PullRequest.')
      return
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function assignPullRequest(
{ gh, context }: { gh: github.GitHub; context: Context }): Promise<boolean> {
  if (!context.payload.pull_request) {
    throw "Not on a Pull Request";
  }
  const owner = context.repo.owner
  const repo = context.repo.repo
  const pull_number = context.payload.pull_request.number
  // Fetches information from the pull request
  const pullRequest = await gh.pulls.get({
    owner,
    repo,
    pull_number
  })

  // Don't affect Pull Requests which already have assignees
  const existingAssignees = pullRequest.data.assignees.length
  if (existingAssignees > 0) {
    core.warning(`PR #${pull_number} already has ${existingAssignees} assignee(s).`)
    return true
  }

  // Will define the assignee of the pull request
  const assignees = [pullRequest.data.user.login]
  const issue_number = pull_number
  const response = await gh.issues.addAssignees({
    owner,
    repo,
    issue_number,
    assignees
  })

  const status = response.headers.status
  core.debug(
    `Assigning #${pull_number} to '${assignees[0]}' returned '${status}'.`
  )
  return status.startsWith('201')
}

run()
