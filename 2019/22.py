def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, y, x = egcd(b % a, a)
        return (g, x - (b // a) * y, y)

def modinv(a, m):
    g, x, _ = egcd(a, m)
    if g != 1:
        raise Exception('modular inverse does not exist')
    else:
        return x % m

def shuffle(instrs, size, index):
    for instr in instrs:
        instr_p = instr.split(' ')
        if instr == 'deal into new stack':
            index = size - (index+1)
        elif instr_p[0] == 'cut':
            n = int(instr_p[1])
            index = ((index - n) + size) % size
        elif instr_p[0] == 'deal':
            incr = int(instr_p[3])
            index = index*incr % size
    
    return index

def shuffleReverse(instrs, size, index):
    a=1
    b=0

    for instr in reversed(list(instrs)):
        instr_p = instr.split(' ')
        if instr == 'deal into new stack':
            b += 1
            a *= -1
            b *= -1
        elif instr_p[0] == 'cut':
            n = int(instr_p[1])
            b += n
        elif instr_p[0] == 'deal':
            incr = int(instr_p[3])
            p = pow(incr, size-2, size)
            a *= p
            b *= p

    return (a%size, b%size)

def part2(instrs, size, index, repeat):
    A, B = shuffleReverse(instrs, size, index)

    return (pow(A, repeat, size)*index + ((pow(A, repeat, size)-1) * modinv(A-1, size) * B))%size

def main():
    f = open('./input/22.txt', 'r')
    instrs = f.read().strip().split('\n')
    
    print('result1', shuffle(instrs, 10007, 2019))
    print('result2', part2(instrs, 119315717514047, 2020, 101741582076661))

if __name__ == "__main__":
    main()
