const Input = require('../tools/input');

function passToSeatId (pass) {
  const binary = pass.replace(/B|R|F|L/g, m => m === 'B' || m === 'R' ? 1 : 0)
  return parseInt(binary, 2)
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
