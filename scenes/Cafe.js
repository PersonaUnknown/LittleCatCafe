// Main gameplay hub
class Cafe extends Scene {
    constructor() {
        const minigameManager = initMinigames();
        const customerManager = new CustomerManager();
        const lifeManager = new LifeManager();
        const score = new Score();
        const components = [
            new Inventory(),
            new Menu(
                vec2(-6, 13),
                vec2(11.5, 11.5)
            ),
            score,
            lifeManager
        ];
        const containers = [
            new FoodContainer(
                [
                    [FoodSprites[ITEMS.bread], ITEMS.bread],
                    [FoodSprites[ITEMS.cheese], ITEMS.cheese],
                    [FoodSprites[ITEMS.lettuce], ITEMS.lettuce],
                    [FoodSprites[ITEMS.tomato], ITEMS.tomato],
                    [FoodSprites[ITEMS.ham], ITEMS.ham],
                    [FoodSprites[ITEMS.jelly], ITEMS.jelly],
                    [FoodSprites[ITEMS.peanut_butter], ITEMS.peanut_butter],
                    [FoodSprites[ITEMS.raw_bacon], ITEMS.raw_bacon],
                    [FoodSprites[ITEMS.raw_egg], ITEMS.raw_egg],
                    [FoodSprites[ITEMS.raw_burrito], ITEMS.raw_burrito],
                    [FoodSprites[ITEMS.ramen_raw], ITEMS.ramen_raw],
                ]
            ),
            new FoodContainer(
                [
                    [FoodSprites[ITEMS.muffin], ITEMS.muffin],
                    [FoodSprites[ITEMS.donut], ITEMS.donut],
                    [FoodSprites[ITEMS.cookie], ITEMS.cookie],
                    [FoodSprites[ITEMS.croissant], ITEMS.croissant],
                    [FoodSprites[ITEMS.danish], ITEMS.danish],
                    [FoodSprites[ITEMS.cake], ITEMS.cake],
                ]
            )
        ]
        const interactables = [
            new Interactable(
                vec2(5, 14), 
                vec2(1), 
                () => { containers[0].showMenu(); }, 
                "Fridge", 
                true
            ),
            new Interactable(
                vec2(8, 9),
                vec2(1),
                () => { this.customerManager.onCustomerOrder(); },
                "Register",
                true
            ),
            new Interactable(
                vec2(11, 9),
                vec2(1),
                () => { this.customerManager.onCustomerOrderCheck(); },
                "Pick up",
                true
            ),
            new Interactable(
                vec2(14, 10),
                vec2(4, 1),
                () => { containers[1].showMenu(); },
                "Pastries",
                true
            ),
            new Interactable(
                vec2(6, 14),
                vec2(1),
                (item) => {
                    this.playerPos = sceneManager.player.pos;
                    if (item === ITEMS.coffee) sceneManager.switchScene("Coffee");
                },
                "Coffee station",
                true
            ),
            new Interactable(vec2(14, 14), vec2(1), (item) => {minigameManager.toaster.interact(item)}, "Toaster", true),
            new Interactable(vec2(7, 14), vec2(1), (item) => {minigameManager.coffee_machine.interact(item)}, "Coffee machine", true),
            new Interactable(vec2(8, 14), vec2(1), (item) => {minigameManager.stove_left.interact(item)}, "Stove", true),
            new Interactable(vec2(9, 14), vec2(1), (item) => {minigameManager.stove_right.interact(item)}, "Stove", true),
            new Interactable(vec2(12, 14), vec2(2, 1), (item) => {minigameManager.sink.interact(item)}, "Sink", true),
            new Interactable(vec2(15, 14), vec2(1), (item) => {minigameManager.microwave.interact(item)}, "Microwave", true),
            new Interactable(vec2(7, 12), vec2(1), (item) => {minigameManager.sandwich.interact(item)}, "Sandwich station", true),
            new Interactable(vec2(7, 10), vec2(1), (item) => {minigameManager.sandwich.interact(item)}, "Sandwich station", true),
            new Interactable(vec2(2, 10), vec2(1), () => {sceneManager.player.setItem(null)}, "Trash", true),
            new Interactable(vec2(1, 11), vec2(1), () => {sceneManager.player.setItem(null)}, "Trash", true),
        ]
        const initObjects = [customerManager, ...components, ...interactables, ...containers, ...Object.values(minigameManager)];
        super(1, initObjects);

        this.interactables = interactables;
        this.minigameManager = minigameManager;
        this.customerManager = customerManager;
        this.customerManager.cafe = this;
        this.inventory = components[0];
        this.playerPos = vec2(10, 13);
        this.score = score;
        this.lifeManager = lifeManager;
        this.book = new Book();
        let recipeOne = "";
        let recipeTwo = "";
        for (const recipe of RECIPES_ONE) {
            recipeOne += `${recipe}\n`;
        }
        for (const recipe of RECIPES_TWO) {
            recipeTwo += `${recipe}\n`
        }
        this.book.recipes = [
            new Recipe(
                recipeOne,
                vec2(width * 0.81, height * 0.28),
            )
        ]
        this.book.recipesTwo = [
            new Recipe(
                recipeTwo,
                vec2(width * 0.81, height * 0.28),
            )
        ]
        this.addObject(this.book);
        this.customerManager.onScoreIncreaseCallback = (value) => { this.addScore(value); }
    }

    addScore(value) {
        this.score.addScore(value);
    }

    init() {
        this.player = new Player(
            this.playerPos,
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

        for (const i of Object.values(this.minigameManager)) {
            if (i instanceof TimerMinigame) {
                if (i.done) i.createParticles();
                else if (i.activeParticles && i.active) i.createParticles(true);
            }
        }
    }

    destroy () {
        this.player.destroy();
        sceneManager.setPlayer(null);

        for (const layer of this.tileLayers) {
            layer.destroy();
        }
        this.tileLayers = [];

        for (const i of Object.values(this.minigameManager)) {
            if (i instanceof TimerMinigame) i.destroyParticles();
        }
    }
}
