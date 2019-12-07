function permutations (list, perm=[], results=[]) {
    if (!list.length) return results.push(perm);
    for (let i = 0; i < list.length; i++) {
        const newList = [...list.slice(0, i), ...list.slice(i+1, list.length)];
        const newPerm = [...perm, list[i]];
        permutations(newList, newPerm, results);
    }
    return results;
}

module.exports = permutations;
