const Input = require('../tools/input');

function validBags (current, set, bags) {
  const parents = bags.filter(bag => {
    return bag.bags.map(bag => bag.name).includes(current)
  })

  for (const bag of parents) {
    if (set.has(bag.name)) continue

    set.add(bag.name)
    validBags(bag.name, set, bags)
  }

  return set
}

function fillBag (name, bags) {
  let count = 1

  const current = bags.find(bag => bag.name === name)

  for (const bag of current.bags) {
    count += bag.count * fillBag(bag.name, bags)
  }

  return count
}

async function part1 (input) {
  return validBags('shiny gold', new Set(), input).size
}

async function part2 (input) {
  return fillBag('shiny gold', input) - 1
}

async function main() {
  const input = await Input(2020, 7).fetch()

  const parsed = input.trim.split('\n').map(x => {
    const parts = x.split(' contain ')

    return {
      name: parts[0].match(/(\w+\s\w+)\sbags/)[1],
      bags: parts[1].replace('.', '').split(', ').map(x => {
        const match = x.match(/(\d+)\s(\w+\s\w+)\sbags?/)

        if (!match) return null

        return {
          name: match[2],
          count: Number(match[1])
        }
      }).filter(x => x)
    }
  })


  await part1(parsed.get).then(result => console.log('result 1:', result))
  await part2(parsed.get).then(result => console.log('result 2:', result))
}

main();
