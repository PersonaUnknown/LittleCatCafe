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
            this.item
        )
    }
}