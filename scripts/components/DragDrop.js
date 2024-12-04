class Draggable {
    constructor(pos, size, tileInfo, data) {
        this.pos = pos;
        this.size = size;
        this.tileInfo = tileInfo;
        this.data = data;
        this.dragging = false;
    }

    update() {
        if (mouseWasReleased(0)) {
            this.dragging = false;
            return;
        }
        if (mouseWasPressed(0) && isPointWithinBox(mousePos, this.pos, this.size)) {
            this.dragging = true;
        }
    }

    render() {
        drawTile(this.pos, this.size, this.tileInfo);
    }

    renderPost() {
        if (this.dragging) {
            drawTile(mousePos, this.size.scale(0.5), this.tileInfo);
        }
    }
}

class DragReceiver {
    constructor(pos, size, tileInfo, draggables, callback) {
        this.pos = pos;
        this.size = size;
        this.tileInfo = tileInfo;
        this.draggables = draggables;
        this.callback = callback;
    }

    update() {
        if (mouseWasReleased(0) && isPointWithinBox(mousePos, this.pos, this.size)) {
            for (const i of this.draggables) {
                if (i.dragging) {
                    this.callback(i.data);
                    break;
                }
            }
        }
    }

    render() {
        drawTile(this.pos, this.size, this.tileInfo);
    }

    renderPost() {

    }
}
