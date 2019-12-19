data = open('./input/18.txt', 'r')
data = data.read().splitlines()
dirs = [(0, 1), (0, -1), (-1, 0), (1, 0)]

def paths(data, coord):
    seen = set([coord])
    queue = [(coord[0], coord[1], 0, '')]
    routes = {}

    for (x, y, dist, route) in queue:
        cell = data[y][x]
        if (dist > 0 and cell not in '.@#1234'):
            routes[cell] = (dist, route)
            route = route + cell
        seen.add((x, y))

        for d in dirs:
            nx = x+d[0]
            ny = y+d[1]
            if data[ny][nx] == '#' or (nx, ny) in seen: 
                continue
            queue.append((nx, ny, dist+1, route))

    return routes

def getRoutes(data):
    routes = {}
    for y in range(len(data)):
        for x in range(len(data[y])):
            cell = data[y][x]
            if cell not in '@1234' and not (cell >= 'a' and cell <= 'z'): 
                continue
            routes[cell] = paths(data, (x,y))
    return routes

def part1(data):
    routes = getRoutes(data)
    keys = set(key for key in routes.keys() if key >= 'a' and key <= 'z')

    solution = {('@',frozenset()):0}

    for _ in range(len(keys)):
        nextsol = {}
        for current in solution:
            for newkey in keys:
                if newkey in current[1]:
                    continue

                dist, route = routes[current[0]][newkey]
                reachable = all((key in current[1] or key.lower() in current[1]) for key in route)

                if not reachable:
                    continue

                newdist = solution[current] + dist
                newkeys = frozenset(current[1] | set((newkey,)))

                if (newkey, newkeys) in nextsol and newdist >= nextsol[(newkey, newkeys)]:
                    continue
                nextsol[(newkey,newkeys)] = newdist
        solution = nextsol
    return min(solution.values())

def findKey(data, key):
    for y in range(len(data)):
        for x in range(len(data[y])):
            if data[y][x] == key:
                return (x, y)

def updateMap(data):
    entrance = findKey(data, '@')
    data = list(map(lambda l : list(l), data))

    for d in dirs:
        data[entrance[0]+d[0]][entrance[1]+d[1]] = '#'
    data[entrance[0]][entrance[1]] = '#'
    data[entrance[0]-1][entrance[1]-1] = '1'
    data[entrance[0]-1][entrance[1]+1] = '2'
    data[entrance[0]+1][entrance[1]-1] = '3'
    data[entrance[0]+1][entrance[1]+1] = '4'

    return list(map(lambda l: ''.join(l), data))

def part2(data):
    data = updateMap(data)
    routes = getRoutes(data)
    keys = set(key for key in routes.keys() if key >= 'a' and key <= 'z')

    solution = {(('1', '2', '3', '4'), frozenset()): 0}

    for _ in range(len(keys)):
        nextsol = {}
        for current in solution:
            for newkey in keys:
                if newkey in current[1]:
                    continue
                    
                for robot in range(4):
                    if newkey not in routes[current[0][robot]]:
                        continue

                    dist, route = routes[current[0][robot]][newkey]
                    reachable = all((key in current[1] or key.lower() in current[1]) for key in route)

                    if not reachable:
                        continue

                    newdist = solution[current] + dist
                    newkeys = frozenset(current[1] | set((newkey,)))
                    newlocs = list(current[0])
                    newlocs[robot] = newkey
                    newlocs = tuple(newlocs)

                    if (newlocs, newkeys) in nextsol and newdist >= nextsol[(newlocs, newkeys)]:
                        continue

                    nextsol[(newlocs, newkeys)] = newdist

        solution = nextsol

    return min(solution.values())

print('Result 1: ', end='') 
print(part1(data))
print('Result 2: ', end='')
print(part2(data))
