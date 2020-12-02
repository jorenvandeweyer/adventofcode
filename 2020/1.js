const Input = require('../tools/input');

async function part1 (input) {
  const numbers = input.lines.numbers.result

  for (const x of numbers) {
    for (const y of numbers) {
      if (x + y === 2020) return x * y
    }
  }

  return false
}

async function part2 (input) {
  const numbers = input.lines.numbers.result

  for (const x of numbers) {
    for (const y of numbers) {
      for (const z of numbers) {
        if (x + y + z === 2020) return x * y * z
      }
    }
  }

  return false
}

async function main() {
  const input_1 = await Input(2020, 1).fetch()
  const input_2 = await Input(2020, 1).fetch()

  await part1(input_1).then(result => console.log('result 1:', result))
  await part2(input_2).then(result => console.log('result 2:', result))
}

main();
