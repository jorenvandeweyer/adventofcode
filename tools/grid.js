module.exports = class Grid {
    constructor(width=1, height=1, fill='.', delimeter='') {
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.delimeter = delimeter;

        this.dx = 0;
        this.dy = 0;

        const grid = new Array(this.width);
        for (let i = 0; i < this.width; i++) {
            grid[i] = new Array(this.height).fill(this.fill);
        }
        
        this.grid = grid;
    }

    insert(x, y, fill='+') {
        const [nx, ny] = this.check(x, y);

        this.grid[nx][ny] = fill;
    }

    get(x, y) {
        const [nx, ny] = this.check(x, y)

        return this.grid[x][y];
    }

    getFixed(x, y) {
        let nx = x + this.dx;
        let ny = y + this.dy;

        if (this.grid[nx] === undefined) return undefined;
        return this.grid[nx][ny];
    }

    getRaw(x, y) {
        if (this.grid[x] === undefined) return undefined;
        return this.grid[x][y];
    }

    check(x, y) {
        let nx = x + this.dx;
        let ny = y + this.dy;

        while (nx < 0) {
            this.newColumnNegative();
            nx = x + this.dx;
        }
        while (ny < 0) {
            this.newRowNegative();
            ny = x + this.dy;
        }

        while (nx >= this.width) this.newColumn();
        while (ny >= this.height) this.newRow();

        return [nx, ny];
    }

    newColumn() {
        this.grid.push(new Array(this.height).fill(this.fill));
        this.width++;
    }

    newColumnNegative() {
        this.grid.splice(0, 0, new Array(this.height).fill(this.fill));
        this.width++;
        this.dx;
    }

    newRow() {
        for (let i = 0; i < this.width; i++) {
            this.grid[i].push(this.fill);
        }
        this.height++;
    }

    newRowNegative() {
        for (let i = 0; i < this.width; i++) {
            this.grid[i].splice(0, 0, this.fill);
        }
        this.height++;
        this.dy;
    }

    toString(dir='top') {
        let result = '';
        for (let y = 0; y < this.height; y++) {
            let row = '';
            for (let x = 0; x < this.width; x++) {
                row += this.grid[x][y] + this.delimeter;
            }
            if (dir === 'top') result = result + '\n' + row;
            if (dir === 'bottom') result = row + '\n' + result;
        }

        return result;
    }
}
