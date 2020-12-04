const Input = require('../tools/input');

async function part1 (input) {
  const parsed = input.lines.map(x => x.split('')).get

  const pos = { x: 0, y: 0 }

  let trees = 0

  while (pos.y < parsed.length) {
    if (pos.x >= parsed[pos.y].length) pos.x -= parsed[pos.y].length
    const isTree = parsed[pos.y][pos.x] === '#'

    if (isTree) trees++

    pos.x += 3
    pos.y += 1
  }

  return trees
}

async function part2 (input, input1) {
  const parsed = input.lines.map(x => x.split('')).get

  const settings = [
    { x: 1, y: 1},
    { x: 3, y: 1},
    { x: 5, y: 1},
    { x: 7, y: 1},
    { x: 1, y: 2}
  ]

  let result = 1

  for (const setting of settings) {
    const pos = { x: 0, y: 0 }

    let trees = 0

    while (pos.y < parsed.length) {
      if (pos.x >= parsed[pos.y].length) pos.x -= parsed[pos.y].length
      const isTree = parsed[pos.y][pos.x] === '#'

      if (isTree) trees++

      pos.x += setting.x
      pos.y += setting.y
    }

    result *= trees
  }

  return result
}

async function main() {
  const input_1 = await Input(2020, 3).fetch()
  const input_2 = await Input(2020, 3).fetch()

  await part1(input_1).then(result => console.log('result 1:', result))
  await part2(input_2, input_1).then(result => console.log('result 2:', result))
}

main();
