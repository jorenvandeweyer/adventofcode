const Input = require('../tools/input')

async function part1 (input) {
  const fish = input.trim.split(',').numbers.result

  for (let day = 0; day < 80; day++) {
    fish.forEach((f, i, array) => {
      array[i] = f - 1

      if (array[i] < 0) {
        array[i] = 6
        array.push(8)
      }
    })
  }

  return fish.length
}

async function part2 (input) {
  const fish = input.trim.split(',').numbers.result

  let groups = {}

  for (const f of fish) {
    groups[f] = (groups[f] ?? 0) + 1
  }

  for (let day = 0; day < 256; day++) {
    const newGroups = {}

    for (key in groups) {
      if (key === '0') {
        newGroups[6] = (newGroups[6] ?? 0) + groups[key]
        newGroups[8] = (newGroups[8] ?? 0) + groups[key]
      } else {
        newGroups[key - 1] = (newGroups[key - 1] ?? 0) + groups[key]
      }
    }

    groups = newGroups
  }

  return Object.values(groups).reduce((a, b) => a + b, 0)
}

async function main () {
  const input_1 = await Input(2021, 6).fetch()
  const input_2 = await Input(2021, 6).fetch()

  await part1(input_1).then(result => console.log('result 1:', result))
  await part2(input_2).then(result => console.log('result 2:', result))
}

main()
