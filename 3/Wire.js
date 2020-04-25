class Wire {
    constructor(path) {
        this.points = new Map()
        this.constructPath(path)
    }

    constructPath(path) {
        let currentX = 0
        let currentY = 0
        let steps = 0
        for (let line of path) {
            const direction = line.slice(0, 1)
            let length = parseInt(line.slice(1))
            while (length) {
                steps++
                switch (direction) {
                    case 'L':
                        currentX--
                        break
                    case 'R':
                        currentX++
                        break
                    case 'U':
                        currentY++
                        break
                    case 'D':
                        currentY--
                        break
                }
                const point = `${currentX},${currentY}`
                if (!this.points.has(point)) {
                    this.points.set(point, steps)
                }
                length--
            }
        }
    }
}

module.exports = Wire