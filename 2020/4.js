const Input = require('../tools/input');

const conditions = [
  ['byr', true, 'minmax', [1920, 2002]],
  ['iyr', true, 'minmax', [2010, 2020]],
  ['eyr', true, 'minmax', [2020, 2030]],
  ['hcl', true, 'regex', /^#[a-f0-9]{6}$/i],
  ['ecl', true, 'enum', ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']],
  ['pid', true, 'size', 9],
  ['cid', false],
  ['hgt', true, 'function', (input) => {
    const match = input.match(/^(\d+)(cm|in)$/)
    if (!match) return false

    const unit = match[2]
    const value = Number(match[1])

    if (unit === 'cm' && (value < 150 || value > 193)) return false
    if (unit === 'in' && (value < 59 || value > 76)) return false

    return true
  }],
]

function parsePasspord (string) {
  const split = string.split('\n').map(x => x.split(' ')).flat().map(x => x.split(':'))

  return Object.fromEntries(split)
}

function isValidPasspord (passpord, validate) {
  for (const condition of conditions) {
    if (!condition[1]) continue

    if (!(condition[0] in passpord)) return false

    if (!validate) continue

    const value = passpord[condition[0]]

    switch (condition[2]) {
      case 'function':
        const fn = condition[3]

        if (!fn(value)) return false

        break
      case 'minmax':
        const number = Number(value)
        const [min, max] = condition[3]

        if (number < min || number > max) return false

        break
      case 'regex':
        if (value.match(condition[3]) === null) return false

        break
      case 'enum':
        if (!condition[3].includes(value)) return false

        break
      case 'size':
        if (value.length !== condition[3]) return false

        break
      default:
        return false
    }
  }

  return true
}

async function part1 (input) {
  const passpords = input.split('\n\n')
    .map(passpord => parsePasspord(passpord)).get

  return passpords.filter(p => isValidPasspord(p, false)).length
}

async function part2 (input, input1) {
  return input1.get.filter(p => isValidPasspord(p, true)).length
}

async function main() {
  const input_1 = await Input(2020, 4).fetch()
  const input_2 = await Input(2020, 4).fetch()

  await part1(input_1).then(result => console.log('result 1:', result))
  await part2(input_2, input_1).then(result => console.log('result 2:', result))
}

main();
