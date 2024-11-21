// Main gameplay hub
class Cafe extends Scene {
    constructor() {
        const backgrounds = [];
        const interactables = [
            new Interactable(vec2(10, 13), vec2(1), () => console.log("here"))
        ]
        const components = [
            new Player(
                vec2(10, 13),
                vec2(1),
                PlayerAnims,
                4,
                interactables
            )
        ]
        const initObjects = [...backgrounds, ...components, ...interactables];
        super(1, initObjects);
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
    
        this.book = new Book();
        this.book.appendTask("Toast x1");
        this.book.appendTask("Parfait x2");
        this.book.appendRecipe("Toast", "");
        this.addObject(this.book);
    }

    destroy () {
        for (const layer of this.tileLayers) {
            layer.destroy();
        }
        this.tileLayers = [];
    }

    update() {
        super.update();
        if (keyWasPressed('KeyF')) {
            this.book.toggleVisibility();
        }
    }
}
