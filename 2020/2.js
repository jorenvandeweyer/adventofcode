const Input = require('../tools/input');

async function part1 (input) {
  input = input.trim.lines.map(l => {
    const parts = l.split(' ')
    const minmax = parts[0].split('-')

    return {
      password: parts[2],
      letter: parts[1].replace(':', ''),
      min: Number(minmax[0]),
      max: Number(minmax[1])
    }
  })

  return input.test(line => {
    const regex = new RegExp(line.letter, 'g')
    const matches = line.password.match(regex) || []
    const occurs = matches.length

    return occurs >= line.min && occurs <= line.max
  })
}

async function part2 (input, input1) {
  return input1.test(line => {
    const a = line.password[line.min - 1]
    const b = line.password[line.max - 1]

    return (a === line.letter) !== (b === line.letter)
  })
}

async function main() {
  const input_1 = await Input(2020, 2).fetch()
  const input_2 = await Input(2020, 2).fetch()

  await part1(input_1).then(result => console.log('result 1:', result))
  await part2(input_2, input_1).then(result => console.log('result 2:', result))
}

main();
