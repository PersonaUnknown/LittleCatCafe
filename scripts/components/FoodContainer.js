class Food {
    constructor(sprite, pos, index, container) {
        this.sprite = sprite;
        this.pos = pos;
        this.index = index;
        this.size = vec2(2.5, 2.5);
        this.button = new IconButton(
            InputSquareSprite,
            this.pos,
            this.size,
            new Label(
                "",
                vec2(0, 0),
                75,
                rgb(0, 0, 0, 1)
            ),
            this.pos, 
            this.size,
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
            this.size,
            this.sprite
        )

        if (isPointWithinBox(mousePos, this.pos, this.size)) {
            drawText(ITEM_NAMES[this.index], mousePos.add(vec2(0.25, -0.5)), 1, rgb(0, 0, 0), undefined, undefined, "left");
        }
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
        if (this.foods.length !== 0 && sceneManager.player.item === null) {    
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