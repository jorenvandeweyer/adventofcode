const Input = require('../tools/input')

async function part1 (input) {
  const commands = input.trim.lines.map(x => x.split('').map(y => Number(y))).result

  const gamma = []
  const epsilon = []

  for (let i = 0; i < commands[0].length; i++) {
    const count = commands.map(value => value[i]).reduce((acc, cur) => acc + cur, 0)

    if (count > commands.length / 2) {
      gamma[i] = 1
      epsilon[i] = 0
    } else {
      gamma[i] = 0
      epsilon[i] = 1
    }
  }

  return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2)
}

async function part2 (input) {
  const commands = input.trim.lines.map(x => x.split('').map(y => Number(y))).result

  let oxygen = commands
  let co2 = commands

  for (let i = 0; i < commands[0].length; i++) {

    if (oxygen.length > 1) {
      const count_oxygen = oxygen.map(value => value[i]).reduce((acc, cur) => acc + cur, 0)

      if (count_oxygen >= oxygen.length / 2) {
        oxygen = oxygen.filter(value => value[i] === 1)
      } else {
        oxygen = oxygen.filter(value => value[i] === 0)
      }
    }

    if (co2.length > 1) {
      const count_co2 = co2.map(value => value[i]).reduce((acc, cur) => acc + cur, 0)

      if (count_co2 < co2.length / 2) {
        co2 = co2.filter(value => value[i] === 1)
      } else {
        co2 = co2.filter(value => value[i] === 0)
      }
    }
  }

  return parseInt(oxygen[0].join(''), 2) * parseInt(co2[0].join(''), 2)
}

async function main () {
  const input_1 = await Input(2021, 3).fetch()
  const input_2 = await Input(2021, 3).fetch()

  await part1(input_1).then(result => console.log('result 1:', result))
  await part2(input_2).then(result => console.log('result 2:', result))
}

main()
