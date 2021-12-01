const Input = require('../tools/input')

async function part1 (input) {
  const numbers = input.lines.numbers.result

  return numbers.reduce((sum, cur, index, array) => {
    return sum + (cur > array[index - 1] ? 1 : 0)
  }, 0)
}

async function part2 (input) {
  const numbers = input.lines.numbers.result

  return numbers.reduce((sum, _, index, array) => {
    if (index > array.length - 4) return sum

    const window = (array, index, length) => {
      return array.slice(index, index + length)
        .reduce((sum, cur) => sum + cur)
    }

    const first = window(array, index, 3)
    const second = window(array, index + 1, 3)

    return sum + (first < second ? 1 : 0)
  }, 0)
}

async function main () {
  const input_1 = await Input(2021, 1).fetch()
  const input_2 = await Input(2021, 1).fetch()


  await part1(input_1).then(result => console.log('result 1:', result))
  await part2(input_2).then(result => console.log('result 2:', result))
}

main()
