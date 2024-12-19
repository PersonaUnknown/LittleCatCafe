class CoffeeScene extends Scene {
    constructor(tutorial = false) {
        const draggables = [
            new Draggable(vec2(4, 14), vec2(4), FoodSprites[ITEMS.water], ITEMS.water),
            new Draggable(vec2(9, 14), vec2(4), FoodSprites[ITEMS.milk], ITEMS.milk),
            new Draggable(vec2(14, 14), vec2(4), FoodSprites[ITEMS.chocolate], ITEMS.chocolate),
        ]
        const receiver = new DragReceiver(
            vec2(9, 9),
            vec2(4),
            FoodSprites[ITEMS.coffee],
            draggables,
            (data) => {
                this.ingredients.add(data);
                this.ingredientsString += ITEM_NAMES[data] + "\n";
            }
        )
        const exit_button = new Button(
            new Label(
                "Done",
                vec2(width * 0.65, height * 0.775),
                65,
                rgb(0, 0, 0)
            ),
            vec2(14, 2),
            vec2(8, 2),
            () => {
                sceneManager.switchScene(tutorial ? "Tutorial" : "Cafe");
                sceneManager.player.setItem(this.checkRecipe(this.ingredients));
                this.ingredients.clear();
                this.ingredientsString = "Added:\n";
            },
            rgb(),
            rgb(0, 1, 1)
        )
        
        const initObjects = [receiver, ...draggables, exit_button];
        super(2, initObjects);

        this.recipes = [
            {
                in : new Set([ITEMS.water]),
                out : ITEMS.americano,
            },
            {
                in : new Set([ITEMS.milk]),
                out : ITEMS.latte,
            },
            {
                in : new Set([ITEMS.milk, ITEMS.chocolate]),
                out : ITEMS.mocha,
            },
        ]

        this.ingredients = new Set();
        this.ingredientsString = "Added:\n";
    }

    checkRecipe(input) {
        if (input.size === 0) {
            return ITEMS.coffee;
        }
        for (const r of this.recipes) {
            if (setEqual(input, r.in)) {
                return r.out;
            }
        }
        return ITEMS.bad_coffee;
    }

    render() {
        drawRect(vec2(8, 8), vec2(64), rgb(250 / 255, 235 / 255, 215 / 255));
        drawText(this.ingredientsString, vec2(0, 8), 1, rgb(0, 0, 0));
        super.render();
    }
}
