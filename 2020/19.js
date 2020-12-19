const Input = require('../tools/input');

function makeRegex (rules, index = '0', replace = false) {
  if (typeof rules[index] === 'string') return rules[index]

  const regex = rules[index].map(part => {
    const regex = part.map(x => {
      const regex = makeRegex(rules, x, replace)

      if (replace && index == '8') return `${regex}+`
      if (replace && index == '11') return `${regex}{x}`

      return regex
    }).join('')

    return `(${regex})`
  }).join('|')

  return `(${regex})`
}

async function part1 (rules, messages, replace = false) {
  const regex = `^${makeRegex(rules, '0', replace)}$`

  return messages.reduce((count, message) => {
    if (!replace) return new RegExp(regex).test(message) ? count + 1 : count

    for (let x = 1; x < 53; x++) {
      if (new RegExp(regex.replace(/x/g, x)).test(message)) {
        return count + 1
      }
    }

    return count
  }, 0)
}

async function main() {
  const input = await Input(2020, 19).fetch()

  const parts = input.trim.get.split('\n\n')

  const rules = parts[0].split('\n').reduce((rules, rule) => {
    const parts = rule.split(': ')

    if (parts[1].match(/"\w"/)) {
      rules[parts[0]] = parts[1][1]
    } else {
      rules[parts[0]] = parts[1].split(' | ').map(x => x.split(' '))
    }

    return rules
  }, {})
  const messages = parts[1].split('\n')

  await part1(rules, messages, false).then(result => console.log('result 1:', result))
  await part1(rules, messages, true).then(result => console.log('result 2:', result))
}

main();
