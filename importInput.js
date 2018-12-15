const fs = require("fs").promises;

module.exports = async (path) => {
    const file = await fs.readFile(path, "utf8");
    return {
        raw: file.trim(),
        lines: file.trim().split("\n"),
        rraw: file,
    }
}
