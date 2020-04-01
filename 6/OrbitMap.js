class Planet {

    constructor(name) {
        this.name = name;
        this.orbits;
    }

    setOrbit(planet) {
        this.orbits = planet
    }

    countOrbits() {
        return this.orbits? (1 + this.orbits.countOrbits()) : 0
    }

    getParentPlanets() {
        let parent_planets = []
        let currentPlanet = this.orbits
        while (currentPlanet) {
            parent_planets.push(currentPlanet)
            currentPlanet = currentPlanet.orbits
        }
        return parent_planets
    }

    getShortestCommonDistance() {

    }
}
class OrbitMap {

    constructor(map) {
        this.planets = {}

        for (let i = 0; i < map.length; i++) {
            let orbitSet = map[i].split(')')
            let planet_1 = orbitSet[0]
            let planet_2 = orbitSet[1]
            if (!this.planets[planet_1]) {
                this.planets[planet_1] = new Planet(planet_1)
            } 
            if (!this.planets[planet_2]) {
                this.planets[planet_2] = new Planet(planet_2) 
            }
            this.planets[planet_2].setOrbit(this.planets[planet_1])
        }
    }

    countTotalOrbits() {
        return Object.values(this.planets).map(planet => planet.countOrbits())
        .reduce((accumulator, currentVal) => accumulator + currentVal)
    }

    getMinTransfers(p1 = 'YOU', p2 = 'SAN') {
        const planet_1 = this.planets[p1]
        const planet_2 = this.planets[p2]
        const p1_parents = planet_1.getParentPlanets()
        const p2_parents = planet_2.getParentPlanets()

        return this.getFirstIntersection(p1_parents, p2_parents)
    }

    getFirstIntersection(p1_parents, p2_parents) {
        for (let p1_i = 0; p1_i < p1_parents.length; p1_i++){
            let currentPlanet = p1_parents[p1_i]
            for (let p2_i = 0; p2_i < p2_parents.length; p2_i++) {
                if (p2_parents[p2_i].name == currentPlanet.name) {
                    return p1_i + p2_i
                }
            }
        }      
        return 0
    }  
}

module.exports = OrbitMap