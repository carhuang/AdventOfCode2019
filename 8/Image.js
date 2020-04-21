const Layer = require('./Layer')
const IMG_WIDTH = 25
const IMG_HEIGHT = 6
const IMG_SIZE = IMG_HEIGHT * IMG_WIDTH

class Image {
    constructor() {
        this.layers = []
        this.layer0Map = []
    }

    build(data) {
        let i = 0
        while (data.length > 0) {
            let layerData = data.splice(0, 150)
            let layer = new Layer(layerData)
            this.layers.push(layer)
            this.layer0Map[i] = layer.countDigit('0')
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
        return targetLayer.multiply('1', '2')
    }

}

module.exports = Image