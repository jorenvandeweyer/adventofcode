function run(debug = true){
  let h = 0;

  // set b 99
  // set c b
  let start = end = 57;

  // jnz a 2
  // jnz 1 5
  if (!debug) {
    // mul b 100
    // sub b -100000
    // set c b
    // sub c -17000
    start = (start * 100) + 100000;
    end = start + 17000;
  }

  while (start <= end) {
    // set f 1
    // set d 2
    let isPrime = true;
    let x = 2;

    while (x < start) {
      // set e 2
      let y = 2;

      while (y < start) {
        // set g d
        // mul g e
        // sub g b
        // jnz g 2
        // set f 0
        if ((d * e) - b === 0) isPrime = false;

        // sub e -1
        y++;

        // set g e
        // sub g b
        // jnz g -8
      }
      // sub d -1
      x++;

      // set g d
      // sub g b
      // jnz g -13
    }

    // jnz f 2
    // sub h -1
    if (!isPrime) h++;

    // set g b
    // sub g c
    // jnz g 2
    // jnz 1 3
    // sub b -17
    // jnz 1 -23
    b += 17
  }

  return h;
}

console.log(run());
