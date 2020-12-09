const Input = require('../tools/input');

function isSumOfTwo (input, sum) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (i === j) continue

      if (input[i] + input[j] === sum) return true
    }
  }

  return false
}

async function part1 (input) {
  for (let i = 25; i < input.length; i++) {
    const available = input.slice(i - 25, i)
    const value = input[i]

    if (!isSumOfTwo(available, value)) {
      return value
    }
  }
}

async function part2 (input, weakness) {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 2; j < input.length; j++) {
      const arr = input.slice(i, j)
      const sum = arr.reduce((a, b) => a + b, 0)

      if (sum > weakness) break

      if (sum === weakness) {
        return Math.min(...arr) + Math.max(...arr)
      }
    }
  }
}

async function main() {
  const input = await Input(2020, 9).fetch()

  const parsed = input.trim.lines.numbers

  const weakness = await part1(parsed.get)
  console.log('result 1:', weakness)

  await part2(parsed.get, weakness).then(result => console.log('result 2:', result))
}

main();
