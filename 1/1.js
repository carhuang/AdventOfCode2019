const fs = require('fs')
const path = require('path')
const readline = require('readline')

async function getInput() {
    const filePath = path.join(__dirname, 'input.txt')
    const fileStream = fs.createReadStream(filePath)

    // Use crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    let data = []
    for await (const line of rl) {
        data.push(Number(line))
    }
    return data
}

function countFuel(mass, fuel) {
    curr_fuel = Math.floor(mass / 3) - 2
    if (curr_fuel <= 0) {
        return fuel
    }
    return countFuel(curr_fuel, fuel + curr_fuel)
}

async function countTotalFuel() {
    const modules = await getInput()
    let sum = 0;

    for (let i = 0; i < modules.length; i++) {
        sum += countFuel(modules[i], 0)
    }
    return sum
}

countTotalFuel().then((fuelsum) => {
    console.log('The sum of the fuel requirements for all of the modules on my spacecraft is ' + fuelsum)
}).catch((e) => {
    console.log(e)
})