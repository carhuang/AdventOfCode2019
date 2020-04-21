class Layer {
    constructor(data) {
        this.data = data
    }

    countDigit(digit) {
        let counter = 0
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] == digit) counter++
        }
        return counter
    }

    multiply(digit1, digit2) {
        let digit1_count = 0
        let digit2_count = 0
        for (let i = 0; i < this.data.length; i++) {
            let current_digit = this.data[i]

            if (current_digit == digit1) {
                digit1_count++
            } else if (current_digit == digit2) {
                digit2_count++
            }
        }
        return digit1_count * digit2_count
    }
}

module.exports = Layer