class Menu {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }

    update() {

    }

    render() {
                
    }

    renderPost() {
        // Draw menu
        drawTile(
            this.pos,
            this.size,
            CafeMenu
        )
    }
}