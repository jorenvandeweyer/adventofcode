const Input = require('../tools/input')

async function part1 (input) {
  const crabs = input.split(',').numbers.result

  const min = Math.min(...crabs)
  const max = Math.max(...crabs)

  let fuel = Infinity

  for (let i = min; i <= max; i++) {
    const total = crabs.reduce((acc, val) => {
      return acc + Math.abs(val - i)
    }, 0)

    if (total < fuel) {
      fuel = total
    }
  }

  return fuel
}

async function part2 (input) {
  const crabs = input.split(',').numbers.result

  const min = Math.min(...crabs)
  const max = Math.max(...crabs)

  let fuel = Infinity

  for (let i = min; i <= max; i++) {
    const total = crabs.reduce((acc, val) => {
      const distance = Math.abs(val - i)

      return acc +  (distance * (distance + 1)) / 2;
    }, 0)

    if (total < fuel) {
      fuel = total
    }
  }

  return fuel
}

async function main () {
  const input_1 = await Input(2021, 7).fetch()
  const input_2 = await Input(2021, 7).fetch()

  await part1(input_1).then(result => console.log('result 1:', result))
  await part2(input_2).then(result => console.log('result 2:', result))
}

main()
