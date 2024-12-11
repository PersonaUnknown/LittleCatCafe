class Food {
    constructor(sprite, pos, index, container) {
        this.sprite = sprite;
        this.pos = pos;
        this.name = name;
        this.button = new IconButton(
            InputSquareSprite,
            this.pos,
            vec2(2.5, 2.5),
            new Label(
                "",
                new vec2(0, 0),
                75,
                rgb(0, 0, 0, 1)
            ),
            this.pos, 
            vec2(2.5, 2.5),
            () => { 
                container.closeMenu();
                sceneManager.player.setItem(index);
            },
            rgb(1, 0, 0, 0),
            rgb(1, 1, 0, 0),
            false
        )
    }
    update() {
        this.button.update();
    }
    renderPost() {
        // Draw the background tile
        this.button.renderPost();
        // // Draw the food icon
        drawTile(
            this.pos,
            vec2(2.5, 2.5),
            this.sprite
        )
    }
}
class FoodContainer {
    constructor(sprites) {
        this.foods = [];
        this.isHidden = true;
        if (Array.isArray(sprites)) {
            let x = 3 
            let y = 11;
            let currColumn = 0;
            const maxColumns = 5;
            const offset = 3.5;
            for (const sprite of sprites) {
                this.foods.push(
                    new Food(
                        sprite[0], 
                        vec2(x, y), 
                        sprite[1],
                        this
                    )
                )
                currColumn++;
                if (currColumn >= maxColumns) {
                    x = 3;
                    y -= offset;
                    currColumn = 0;
                } else {    
                    x += offset
                }
            }
        }
        this.closeButton = new Button(
            new Label(
                "X",
                vec2(width * 0.725, height * 0.2),
                75,
                rgb(0, 0, 0, 1)
            ),
            vec2(17, 15), 
            vec2(3, 3),
            () => {
                this.closeMenu();
            },
            rgb(1, 1, 1, 1),
            rgb(0, 1, 1, 1)
        )
    }
    showMenu() {
        if (this.foods.length !== 0) {    
            this.isHidden = false;
            sceneManager.player.onBusyAction();
        }
    }
    closeMenu() {
        if (this.foods.length !== 0) {    
            this.isHidden = true;
            sceneManager.player.onBusyEnd();
        }
    }
    update() {
        if (this.isHidden) {
            return;
        }

        for (const food of this.foods) {
            food.update();
        }
        this.closeButton.update();
    }
    render() {
        
    }
    renderPost() {
        if (this.isHidden) {
            return;
        }

        for (const food of this.foods) {
            food.renderPost();
        }

        this.closeButton.renderPost();
    }
}