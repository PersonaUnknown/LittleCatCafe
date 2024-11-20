class Cafe extends Scene {
    constructor() {
        const backgrounds = [];
        const components = [
            new Player(
                vec2(),
                vec2(1),
                PlayerAnims,
                4
            )
        ]
        components[0].pos = vec2(10, 13);
        const initObjects = [...backgrounds, ...components];
        super(0, initObjects);
    }

    init() {
        this.tileLayers = [];
        for (let layerNum = 0; layerNum < CafeLevelData.layers.length; layerNum++) {
            this.tileLayers.push(new TileLayer(vec2(0, 0), vec2(CafeLevelData.width, CafeLevelData.height), CafeTileMap, vec2(1), layerNum));
            const currLayer = this.tileLayers[layerNum];
            let layer = CafeLevelData.layers[layerNum].data;
            for (let i = 0; i < layer.length; i++) {
                if (layer[i] === 0) continue;
                let x = i % CafeLevelData.width;
                let y = CafeLevelData.height - Math.floor(i / CafeLevelData.width) - 1;
                let data = new TileLayerData(layer[i] - 1);
                currLayer.setData(vec2(x, y), data);
            }
            currLayer.redraw();
        }
        setCameraPos(vec2(8));
    }

    destroy () {
        for (const layer of this.tileLayers) {
            layer.destroy();
        }
        this.tileLayers = [];
    }
}
