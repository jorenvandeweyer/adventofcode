//credit: https://www.reddit.com/r/adventofcode/comments/7lms6p/2017_day_23_solutions/drnh5sx/
//lazy me

console.log(solve2());

function solve2(n) {
  let r = {
    b: 57,
    c: 57,
    d: 0,
    f: 0,
    g: 0,
    h: 0
  }
  r['b'] = r['b'] * 100 + 100000
  r['c'] = r['b'] + 17000
  do {
    r['f'] = 1
    r['d'] = 2
    for (let d = r['d']; d * d < r['b']; ++d) {
      if (r['b'] % d === 0) {
        r['f'] = 0
        break
      }
    }
    if (r['f'] === 0) r['h']++
    r['g'] = r['b'] - r['c']
    r['b'] += 17
  } while (r['g'] !== 0)

  return r['h']
}
