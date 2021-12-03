const Input = require('../tools/input')

async function part1 (input) {
  const commands = input.trim.lines.result

  let x = 0;
  let y = 0;

  for (let command of commands) {
    const [direction, distance] = command.split(' ')

    switch (direction) {
      case 'forward':
        y += parseInt(distance)
        break
      case 'up':
        x -= parseInt(distance)
        break
      case 'down':
        x += parseInt(distance)
        break
    }
  }

  return x * y

}

async function part2 (input) {
  const commands = input.trim.lines.result

  let x = 0;
  let y = 0;
  let aim = 0;

  for (let command of commands) {
    const [direction, distance] = command.split(' ')

    switch (direction) {
      case 'forward':
        x += parseInt(distance)
        y += aim * parseInt(distance)
        break
      case 'up':
        aim -= parseInt(distance)
        break
      case 'down':
        aim += parseInt(distance)
        break
    }
  }

  return x * y
}

async function main () {
  const input_1 = await Input(2021, 2).fetch()
  const input_2 = await Input(2021, 2).fetch()


  await part1(input_1).then(result => console.log('result 1:', result))
  await part2(input_2).then(result => console.log('result 2:', result))
}

main()
