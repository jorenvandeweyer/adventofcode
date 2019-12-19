class GridMap extends Map {
    constructor(...args) {
        super(...args);
        this.xMin=0;
        this.yMin=0;
        this.xMax=0;
        this.yMax=0;
    }

    set(x, y, value) {
        if (x < this.xMin) this.xMin = x;
        if (y < this.yMin) this.yMin = y;
        if (x > this.xMax) this.xMax = x;
        if (y > this.yMax) this.yMax = y;
        return super.set(`${x},${y}`, value);
    }

    setHard(key, value) {
        return super.set(key, value);
    }

    get(x, y, def) {
        return super.has(`${x},${y}`) ? super.get(`${x},${y}`) : def;
    }

    find(value) {
        const found = Array.from(this).find(([coord, type]) => type === value);
        if (!found) return false;
        return found[0].split(',').map(n => parseInt(n));
    }

    clone() {
        const clone = new GridMap();
        Array.from(this).forEach(entry => {
            clone.setHard(...entry);
        });
        return clone;
    }

    toString(def=' ') {
        let string = '';

        for (let y = this.yMin; y <= this.yMax; y++) {
            let row = '\n';
            for (let x = this.xMin; x <= this.xMax; x++) {
                row += this.get(x, y, def);
            }
            string = row + string;
        }
        return string;
    }

    get keys() {
        return Array.from(super.keys()).map(coord => coord.split(',').map(num => parseInt(num)));
    }
}

module.exports = GridMap;
