// Main gameplay hub
class Cafe extends Scene {
    constructor() {
        const minigameManager = initMinigames();
        const customerManager = new CustomerManager();
        const components = [
            new Inventory(),
            new Menu(
                vec2(-6, 14.5),
                vec2(11.5, 11.5)
            )
        ];
        const containers = [
            new FoodContainer(
                [
                    [FoodSprites[ITEMS.bread], ITEMS.bread],
                    [FoodSprites[ITEMS.donut], ITEMS.donut]
                ],
                components[0]
            ),
            new FoodContainer(
                [
                    [FoodSprites[ITEMS.muffin], ITEMS.muffin],
                    [FoodSprites[ITEMS.donut], ITEMS.donut]
                ],
                components[0]
            )
        ]
        const interactables = [
            new Interactable(
                vec2(5, 14), 
                vec2(1), 
                () => {
                    containers[0].showMenu();
                }, 
                "Fridge", 
                true
            ),
            new Interactable(vec2(14, 14), vec2(1), minigameManager.toaster.interact.bind(minigameManager.toaster), "Toaster", true),
            new Interactable(
                vec2(8, 9),
                vec2(1),
                () => {
                    // TODO: Add customer functionality
                },
                "Register",
                true
            ),
            new Interactable(
                vec2(14, 10),
                vec2(4, 1),
                () => {
                    containers[1].showMenu();
                },
                "Pastries",
                true
            )
        ]
        const initObjects = [customerManager, ...components, ...interactables, ...containers, ...Object.values(minigameManager), minigameManager.toaster.progressBar];
        super(1, initObjects);

        this.interactables = interactables;
        this.minigameManager = minigameManager;
        this.customerManager = customerManager;
        this.inventory = components[0];
    }

    init() {
        this.player = new Player(
            vec2(10, 13),
            vec2(0.9),
            PlayerAnims,
            4,
            this.interactables,
            this.inventory
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
        this.book.appendRecipe("Toast", "");
        this.addObject(this.book);
    }

    destroy () {
        this.player.destroy();
        sceneManager.setPlayer(null);

        for (const layer of this.tileLayers) {
            layer.destroy();
        }
        this.tileLayers = [];
    }

    update() {
        super.update();
    }
}
