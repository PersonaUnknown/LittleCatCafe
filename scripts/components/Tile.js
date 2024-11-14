class Tile {
    constructor(pos, size, tileInfo) {
        this.pos = pos;
        this.size = size;
        this.tileInfo = tileInfo;
    }
    update() {
        
    }
    render() {
        drawTile(
            this.pos,
            this.size,
            this.tileInfo
        )
    }
    renderPost() {

    }
}