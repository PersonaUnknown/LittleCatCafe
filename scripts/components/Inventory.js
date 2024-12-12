class Inventory {
    constructor() {
        this.item = null;
    }

    updateItem(item) {
        this.item = item;
    }

    update() {

    }

    render() {

    }

    renderPost() {
        // Draw Background
        const position = vec2(21.5, 17.3);
        const position_text = vec2(20, 15.4);
        drawTile(
            position,
            vec2(3, 3),
            InputSquareSprite
        )

        if (this.item === null) {
            return;
        }

        // Render Item Inside UI
        drawTile(
            position,
            vec2(2.5, 2.5),
            FoodSprites[this.item]
        )
        drawText(ITEM_NAMES[this.item], position_text, 0.75, rgb(1, 1, 1), undefined, undefined, "left");
    }
}