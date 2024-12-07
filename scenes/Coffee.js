class CoffeeScene extends Scene {
    constructor() {
        const draggables = [
            new Draggable(vec2(14, 14), vec2(4), FoodSprites[ITEMS.egg], ITEMS.egg),
            new Draggable(vec2(14, 9), vec2(4), FoodSprites[ITEMS.jelly], ITEMS.jelly),
        ]
        const receiver = new DragReceiver(vec2(9, 9), vec2(4), FoodSprites[ITEMS.coffee], draggables, (data) => {this.ingredients.add(data)});
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
                sceneManager.switchScene("Cafe");
                sceneManager.player.setItem(this.checkRecipe(this.ingredients));
                this.ingredients.clear();
            },
            rgb(),
            rgb(0, 1, 1)
        )
        
        const initObjects = [receiver, ...draggables, exit_button];
        super(2, initObjects);

        this.recipes = [
            {
                in : new Set([ITEMS.egg, ITEMS.jelly]),
                out : ITEMS.lettuce,
            },
        ]

        this.ingredients = new Set();
    }

    checkRecipe(input) {
        function setEqual(a, b) {
            if (a.size !== b.size) return false;
            for (const i of b) {
                if (!a.has(i)) return false;
            }
            return true;
        }

        if (input.size === 0) {
            return ITEMS.coffee;
        }
        for (const r of this.recipes) {
            if (setEqual(input, r.in)) {
                return r.out;
            }
        }
        return null;
    }

    ingredientsToString() {
        let t = "Added:\n";
        if (this.ingredients.has(ITEMS.egg)) t += "Egg\n";
        if (this.ingredients.has(ITEMS.jelly)) t += "Jelly\n";
        return t;
    }

    render() {
        drawRect(vec2(8, 8), vec2(64), rgb(250 / 255, 235 / 255, 215 / 255));
        drawText(this.ingredientsToString(), vec2(0, 8), 1, rgb(0, 0, 0));
        super.render();
    }
}
