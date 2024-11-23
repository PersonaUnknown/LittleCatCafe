// Main gameplay hub
class Cafe extends Scene {
    constructor() {
        const interactables = [
            new Interactable(vec2(10, 13), vec2(1), () => console.log("here"), "hello", true)
        ]
        const components = [];
        const initObjects = [...components, ...interactables];
        super(1, initObjects);
        this.interactables = interactables;
    }

    init() {
        this.player = new Player(
            vec2(10, 13),
            vec2(1),
            PlayerAnims,
            4,
            this.interactables
        )
        sceneManager.setPlayer(this.player);

        const cafeSize = vec2(CafeLevelData.width, CafeLevelData.height);
        initTileCollision(cafeSize);
        this.tileLayers = [];

        for (let layerNum = 0; layerNum < CafeLevelData.layers.length; layerNum++) {
            const renderOrder = layerNum + (layerNum >= 2 ? 100 : -100);
            this.tileLayers.push(new TileLayer(vec2(0, 0), cafeSize, CafeTileMap, vec2(1), renderOrder));
            console.log(CafeLevelData.layers[layerNum].name, renderOrder);

            const layer = CafeLevelData.layers[layerNum].data;
            const currLayer = this.tileLayers[layerNum];
            for (let i = 0; i < layer.length; i++) {
                if (layer[i] === 0) continue;
                let x = i % CafeLevelData.width;
                let y = CafeLevelData.height - Math.floor(i / CafeLevelData.width) - 1;
                let pos = vec2(x, y);
                let data = new TileLayerData(layer[i] - 1);
                currLayer.setData(pos, data);

                if (layerNum > 0) {
                    setTileCollisionData(pos, 1);
                }
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
        this.player.destroy();
        sceneManager.setPlayer(undefined);

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
