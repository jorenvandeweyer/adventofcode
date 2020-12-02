const Input = require('../tools/input');

async function part1 (input) {
  const parsed = input

  return parsed
}

async function part2 (input, input1) {
  const parsed = input1

  return parsed
}

async function main() {
  const input_1 = await Input(2020, 3).fetch()
  // const input_2 = await Input(2020, 3).fetch()

  await part1(input_1).then(result => console.log('result 1:', result))
  // await part2(input_2, input_1).then(result => console.log('result 2:', result))
}

main();
