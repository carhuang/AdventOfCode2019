class Asteroid {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.detectableAsteroidMap = {}
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    calcAngleDegrees(x, y) {
        const angle = 0 - (Math.atan2(y, x) * 180 / Math.PI)
        if (angle <= 0) {
            return Math.abs(angle) + 90
        } else if (angle <= 90) {
            return Math.abs(angle - 90)
        } else {
            return 360 - (angle - 90)
        }
    }

    calcDistance(asteroid) {
        return Math.hypot((asteroid.getY() - this.y), (asteroid.getX() - this.x))
    }

    getDetectableAsteroidsMap(asteroids) {
        for (let asteroid of asteroids) {
            let angle = this.calcAngleDegrees(asteroid.getX() - this.x, asteroid.getY() - this.y)
            if (angle in this.detectableAsteroidMap) {
                this.detectableAsteroidMap[angle].push(asteroid)
            } else {
                this.detectableAsteroidMap[angle] = [asteroid]
            }
        }
        return Object.keys(this.detectableAsteroidMap).length
    }

    sortDetectableAsteroidMap() {
        const angles = Object.keys(this.detectableAsteroidMap)
        for (let angle of angles) {
            this.detectableAsteroidMap[angle].sort((a, b) => this.calcDistance(a) - this.calcDistance(b))
        }
    }

    vaporizeAsteroids() {
        this.sortDetectableAsteroidMap()
        let angles = Object.keys(this.detectableAsteroidMap).sort((a, b) => a - b)
        let i = 0
        let counter = 1
        while (angles.length && counter <= 200) {
            i %= angles.length
            let angle = angles[i]
            let targets = this.detectableAsteroidMap[angle]
            let vaporizedAsteroid = targets.shift()
            console.log("The " + counter + "th asteroid to be vaporized is at "
                + vaporizedAsteroid.getX() + "," + vaporizedAsteroid.getY())
            if (targets.length === 0) {
                delete this.detectableAsteroidMap[angle]
                angles.splice(i, 1)
            } else {
                i++
            }
            counter++
        }
    }
}

class AsteroidMap {
    constructor(map) {
        this.asteroids = []
        this.readAsteroidMap(map)
        this.monitorLocation = undefined
    }

    readAsteroidMap(map) {
        for (let y = 0; y < map.length; y++) {
            let line = map[y]
            for (let x = 0; x < line.length; x++) {
                if (map[y][x] === '#') {
                    let asteroid = new Asteroid(x, y)
                    this.asteroids.push(asteroid)
                }
            }
        }
    }

    getNumOfMaximumDetectableAsteroids() {
        let maxNumOfAsteroids = -1;
        let bestLocation = undefined
        for (let i = 0; i < this.asteroids.length; i++) {
            let selectAsteroid = this.asteroids.splice(i, 1)[0]
            let asteroidCount = selectAsteroid.getDetectableAsteroidsMap(this.asteroids)
            if (asteroidCount > maxNumOfAsteroids) {
                maxNumOfAsteroids = asteroidCount
                bestLocation = selectAsteroid
            }
            this.asteroids.splice(i, 0, selectAsteroid)
        }
        this.monitorLocation = bestLocation
        return maxNumOfAsteroids
    }
}

module.exports = AsteroidMap