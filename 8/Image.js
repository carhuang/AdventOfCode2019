const Layer = require('./Layer')
const IMG_WIDTH = 25
const IMG_HEIGHT = 6
const IMG_SIZE = IMG_HEIGHT * IMG_WIDTH

class Image {
    constructor() {
        this.layers = []
        this.layer0Map = []
        this.finalImage = []
    }

    build(data) {
        let i = 0
        while (data.length > 0) {
            let layerData = data.splice(0, IMG_SIZE)
            let layer = new Layer(layerData)
            this.layers.push(layer)
            this.layer0Map[i] = layer.countDigit(0)
            i++
        }
    }

    getIndexOfMin0Layer() {
        let min0Layer = 0
        let min0Count = Number.MAX_SAFE_INTEGER
        for (let i = 0; i < this.layer0Map.length; i++) {
            if (this.layer0Map[i] < min0Count) {
                min0Count = this.layer0Map[i]
                min0Layer = i
            }
        }
        return min0Layer
    }

    validate() {
        let layerIndex = this.getIndexOfMin0Layer()
        const targetLayer = this.layers[layerIndex]
        return targetLayer.multiply(1, 2)
    }

    print() {
        let formatedImg = []
        for (let y = 0; y < IMG_HEIGHT; y++) {
            formatedImg[y] = this.finalImage.splice(0, IMG_WIDTH)
            let currentPixelBar = ''
            for (let pixel of formatedImg[y]) {
                switch (pixel) {
                    case 0:
                        currentPixelBar += ' '
                        break
                    case 1:
                        currentPixelBar += '#'
                        break
                    default:
                        break
                }
            }
            console.log(currentPixelBar)
        }
    }

    decode() {
        // 0 is black, 1 is white, and 2 is transparent
        for (let i = 0; i < IMG_SIZE; i++) {
            let colour = 2
            for (let layer of this.layers) {
                let current_colour = layer.data[i]
                if (current_colour == 0 || current_colour == 1) {
                    colour = current_colour
                    break
                }
            }
            this.finalImage[i] = colour
        }
        this.print()
    }

}

module.exports = Image