class Meter {
    constructor(pos, size, progress, visible = false) {
        this.pos = pos;
        this.size = size;
        this.progress = progress;
        this.tileInfo = Divider;
        this.visible = visible;
    }
    adjustProgress(progress) {
        this.progress = Math.max(Math.min(progress, 1), 0);
    }
    update() {
        
    }
    render() {
        
    }
    renderPost() {
        if (!this.visible) return;
        // Draw the background of the meter
        drawTile(
            this.pos,
            this.size,
            this.tileInfo
        )
        
        // Draw the meter based on the current progress
        const currProgress = this.size.x * this.progress;
        const offset = (this.size.x - currProgress) / 2;
        drawTile(
            vec2(this.pos.x - offset, this.pos.y),
            vec2(currProgress, this.size.y),
            this.tileInfo,
            rgb(1, 0 , 0)
        )
    }
}