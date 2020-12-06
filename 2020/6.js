
const Input = require('../tools/input');

function getAnswers (group) {
  return group.flat().reduce((form, value) => {
    form[value] = (form[value] ?? 0) + 1
    return form
  }, {})
}

async function part1 (input) {
  return input.reduce((sum, group) => {
    return sum + Object.values(getAnswers(group)).length
  }, 0)
}

async function part2 (input) {
  return input.reduce((sum, group) => {
    return sum + Object.values(getAnswers(group))
      .filter(answer => answer === group.length).length
  }, 0)
}

async function main() {
  const input = await Input(2020, 6).fetch()

  const parsed = input.trim.split('\n\n').map(x => x.split('\n').map(x => x.split(''))).get

  await part1(parsed).then(result => console.log('result 1:', result))
  await part2(parsed).then(result => console.log('result 2:', result))
}

main();
