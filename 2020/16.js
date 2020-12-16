const Input = require('../tools/input');

function getErrorRate (ticket, fields) {
  const ranges = fields.map(field => field.ranges).flat()

  return ticket.reduce((rate, field) => {
    for (const range of ranges) {
      if (field >= range.start && field <= range.end) return rate
    }

    return rate + field
  }, 0)
}

async function part1 (input) {
  return input.tickets.reduce((rate, ticket) => {
    return rate + getErrorRate(ticket, input.fields)
  }, 0)
}

function testTickets (tickets, index, ranges) {
  ticketCheck:
  for (const ticket of tickets) {
    for (const range of ranges) {
      const field = ticket[index]

      if (field >= range.start && field <= range.end) continue ticketCheck
    }

    return false
  }

  return true
}

function findOrder (tickets, fields, order = [], index = 0) {
  if (index >= fields.length) return order

  for (let i = 0; i < fields.length; i++) {
    if (order.includes(i)) continue

    if (!testTickets(tickets, index, fields[i].ranges)) continue

    const found = findOrder(tickets, fields, [...order, i], index + 1)

    if (found) return found
  }

  return false
}

function inRange (ticket, fields) {
  return ticket.every(value => fields.some(field => {
    for (const range of field.ranges) {
      if (value >= range.start && value <= range.end) return true
    }

    return false
  }))
}

async function part2 (input) {
  const tickets = input.tickets.filter(ticket => inRange(ticket, input.fields))

  // showPossibilties(tickets, input.fields)

  const order = findOrder(tickets, input.fields)

  return input.fields.reduce((result, field, index) => {
    if (!field.name.includes('departure')) return result

    return result * input.ticket[order.indexOf(index)]
  }, 1)
}

async function main() {
  const input = await Input(2020, 16).fetch()

  const parts = input.trim.get.split('\n\n')

  const fields = parts[0].split('\n').map(field => {
    const parts = field.match(/(.+):\s(\d+)-(\d+)\sor\s(\d+)-(\d+)/)

    return {
      name: parts[1],
      ranges: [
        { start: Number(parts[2]), end: Number(parts[3]) },
        { start: Number(parts[4]), end: Number(parts[5]) }
      ]
    }
  })

  const ticket = parts[1].split('\n')[1].split(',').map(Number)

  const parts2 = parts[2].split('\n')
  parts2.shift()

  const tickets = parts2.map(line => line.split(',').map(Number))

  const input1 = { fields, ticket, tickets }

  await part1(input1).then(result => console.log('result 1:', result))
  await part2(input1).then(result => console.log('result 2:', result))
}

main();

/**
 * DEBUG CODE
 */

function showPossibilties (tickets, fields) {
  for (let i = 0; i < fields.length; i++) {
    const values = tickets.map(ticket => ticket[i])

    const possible = fields.reduce((possible, field, index) => {
      const test = (value) => {
        for (const range of field.ranges) {
          if (value >= range.start && value <= range.end) return true
        }

        return false
      }

      if (values.every(test)) return [...possible, index]
      else return possible
    }, [])

    console.log(i, possible)
  }
}
