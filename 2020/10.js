const Input = require('../tools/input');

function fibonacci (n) {
  let first = 0
  let second = 0
  let third = 1

  for (let i = 0; i < n; i++) {
    let next_value = first + second + third

    first = second
    second = third
    third = next_value
  }

  return third
}

async function part1 (input) {
  const clone = [...input].sort((a, b) => a - b)

  const diffs = [0, 0, 1]

  for (const index in clone) {
    const diff = clone[index] - (clone[index - 1] ?? 0)

    diffs[diff-1]++
  }

  return diffs[0] * diffs[2]
}

function lookForward (index, arr) {
  let options = 0

  for (let i = Number(index) + 1; i < arr.length; i++) {

    const diff = arr[i] - arr[index]
    if (diff > 3) break

    options++
  }

  return options
}

async function part2 (input) {
  const max = Math.max(...input)

  const clone = [...input, 0, max].sort((a, b) => a - b)

  const options = []

  for (let i = 0; i < clone.length - 1; i++) {
    const o = lookForward(i, clone)
    options.push(o)
  }

  const temp = []
  let now = 0

  for (let i = 0; i < options.length; i++) {
    const option = options[i]
    const previous = options[i - 1] ?? null

    now++

    if (option === 1 && previous === 1) {
      temp.push(now)
      now = 0
    }
  }

  temp.push(now)

  return temp.reduce((carry, value) => {
    return carry * fibonacci(value - 1)
  }, 1)
}

async function main() {
  const input = await Input(2020, 10).fetch()

  const parsed = input.trim.lines.numbers

  await part1(parsed.get).then(result => console.log('result 1:', result))
  await part2(parsed.get).then(result => console.log('result 2:', result))
}

main();
