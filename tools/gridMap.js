class GridMap extends Map {
    constructor(...args) {
        super(...args);
    }

    set(x, y, value) {
        return super.set(`${x},${y}`, value);
    }

    get(x, y, def) {
        return super.has(`${x},${y}`) ? super.get(`${x},${y}`) : def;
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

    get xMin() {
        return Math.min(...this.keys.map(coord => coord[0]));
    }

    get yMin() {
        return Math.min(...this.keys.map(coord => coord[1]));
    }

    get xMax() {
        return Math.max(...this.keys.map(coord => coord[0]));
    }

    get yMax() {
        return Math.max(...this.keys.map(coord => coord[1]));
    }
}

module.exports = GridMap;
