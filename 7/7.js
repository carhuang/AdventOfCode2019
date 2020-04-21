const fs = require('fs')
const Loop = require('./Loop')

function readInput() {
    return fs.readFileSync('./input.txt', 'utf8').split(',').map(Number)
}
const software = readInput()

function generatePhaseSettingSequences(settings) {
    let sequences = []
    function permute(array, buffer) {
        if (!array.length) {
            sequences.push(buffer)
        } else {
            for (let i=0; i < array.length; i++) {
                let select = array.splice(i, 1)[0]
                permute(array, buffer.concat(select))
                array.splice(i, 0, select)
            }
        }    
    }
    permute(settings, [])
    return sequences
}

function getMaxThrusterSignal(settings) {
    const phase_setting_sequences = generatePhaseSettingSequences(settings)
    let max_thruster_signal = 0

    for (let phase_setting_sequence of phase_setting_sequences) {
        let loop = new Loop(software, phase_setting_sequence)
        let thruster_signal = loop.thrust()
        max_thruster_signal = Math.max(max_thruster_signal, thruster_signal)
    }

    return max_thruster_signal
}

const settings_part1 = [0, 1, 2, 3, 4]
const settings_part2 = [5, 6, 7, 8, 9]
const maxSignal = getMaxThrusterSignal(settings_part2)
console.log(maxSignal)