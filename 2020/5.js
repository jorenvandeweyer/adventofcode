const Input = require('../tools/input');

function passToSeatId (pass) {
  const rows = { start: 0, end: 127 }
  const columns = { start: 0, end: 7 }

  for (const instr of pass) {
    const rowMid = Math.floor((rows.start + rows.end) / 2)
    const columnMid = Math.floor((columns.start + columns.end) / 2)

    if (instr === 'B') rows.start = rowMid + 1
    if (instr === 'F') rows.end = rowMid
    if (instr === 'R') columns.start = columnMid + 1
    if (instr === 'L') columns.end = columnMid
  }

  return rows.start * 8 + columns.start
}

async function part1 (input) {
  const seats = input.map(passToSeatId)
  return Math.max(...seats)
}

async function part2 (input) {
  const seats = input.map(passToSeatId)

  seats.sort()

  return seats.find((value, index, arr) => value + 2 === arr[index+1]) + 1
}

async function main() {
  const input = await Input(2020, 5).fetch()

  input.trim.lines

  await part1(input.get).then(result => console.log('result 1:', result))
  await part2(input.get).then(result => console.log('result 2:', result))
}

main();
