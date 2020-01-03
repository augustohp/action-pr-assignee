test.todo(
  'define author (of Pull Request) as assignee if he belongs in the organization'
)
test.todo(
  "define nobody if the author (of Pull Request) doesn't belong in the organization"
)

test.todo('fail on Status API if no assignee is defined')
test.todo('succeed on Status API if assignee is defined')
