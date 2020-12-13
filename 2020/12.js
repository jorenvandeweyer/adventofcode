const Input = require('../tools/input');

class Ship {
  constructor () {
    this.x = 0
    this.y = 0
    this.heading = 0
  }

  move (instruction) {
    let dir = instruction.slice(0, 1)
    const offset = Number(instruction.slice(1))

    switch (dir) {
      case 'N':
        this.y += offset
        break;
      case 'E':
        this.x += offset
        break
      case 'S':
        this.y -= offset
        break
      case 'W':
        this.x -= offset
        break
      case 'F':
        const dx = offset * Math.cos(this.heading / 180 * Math.PI)
        const dy = offset * Math.sin(this.heading / 180 * Math.PI)
        this.x += dx
        this.y += dy
        break
      case 'L':
        this.heading = (this.heading + offset) % 360
        break
      case 'R':
        this.heading = (this.heading - offset) % 360
        break
      default:
        break;
    }
  }
}

async function part1 (input) {
  const ship = new Ship()

  for (const instr of input) {
    ship.move(instr)
  }

  return Math.abs(ship.x) + Math.abs(ship.y)
}

class Ship2 {
  constructor () {
    this.x = 0
    this.y = 0

    this.dx = 10
    this.dy = 1
  }

  move (instruction) {
    let dir = instruction.slice(0, 1)
    const offset = Number(instruction.slice(1))

    switch (dir) {
      case 'F':
        this.x += offset * this.dx
        this.y += offset * this.dy
        break
      case 'N':
        this.dy += offset
        break
      case 'E':
        this.dx += offset
        break
      case 'S':
        this.dy -= offset
        break
      case 'W':
        this.dx -= offset
        break
      case 'L':
        this.changeWaypoint(offset)
        break
      case 'R':
        this.changeWaypoint(-offset)
        break
      default:
        break
    }
  }

  changeWaypoint (diff) {
    const angle = Math.atan2(this.dy, this.dx) * 180 / Math.PI
    const length = (this.dx ** 2 + this.dy ** 2) ** 0.5

    const newAngle = angle + diff

    this.dx = Math.round(length * Math.cos(newAngle / 180 * Math.PI))
    this.dy = Math.round(length * Math.sin(newAngle / 180 * Math.PI))
  }
}

async function part2 (input) {
  const ship = new Ship2()

  for (const instr of input) {
    ship.move(instr)
  }

  return Math.abs(ship.x) + Math.abs(ship.y)
}

async function main() {
  const input = await Input(2020, 12).fetch()

  const parsed = input.trim.lines

  await part1(parsed.get).then(result => console.log('result 1:', result))
  await part2(parsed.get).then(result => console.log('result 2:', result))
}

main();
