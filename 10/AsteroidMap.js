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

    addAsteroidToQueue(queue, asteroid) {

    }

    getDetectableAsteroidsMap(asteroids) {
        for (let asteroid of asteroids) {
            let angle = Math.atan2(asteroid.getY() - this.y, asteroid.getX() - this.x)
            if (angle in this.detectableAsteroidMap) {
                this.addAsteroidToQueue(this.detectableAsteroidMap[angle], asteroid)
            } else {
                this.detectableAsteroidMap[angle] = [asteroid]
            }
        }
        // console.log(this.detectableAsteroidMap)
        return Object.keys(this.detectableAsteroidMap).length
    }
}

class AsteroidMap {
    constructor(map) {
        this.asteroids = []
        this.readAsteroidMap(map)
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
        // console.log(this.asteroids)
    }

    getNumOfMaximumDetectableAsteroids() {
        let maxNumOfAsteroids = -1;
        for (let i = 0; i < this.asteroids.length; i++) {
            let selectAsteroid = this.asteroids.splice(i, 1)[0]
            let asteroidCount = selectAsteroid.getDetectableAsteroidsMap(this.asteroids)
            maxNumOfAsteroids = Math.max(maxNumOfAsteroids, asteroidCount)
            this.asteroids.splice(i, 0, selectAsteroid)
        }
        return maxNumOfAsteroids
    }




}

module.exports = {
    Asteroid,
    AsteroidMap
}