class Draggable {
    constructor(pos, size, tileInfo, data) {
        this.pos = pos;
        this.size = size;
        this.tileInfo = tileInfo;
        this.data = data;
        this.dragging = false;
    }

    isWithin(point) {
        const left = this.pos.x;
        const top = this.pos.y;
        return point.x > left && point.x < (left + this.size.x) && point.y > (top - this.size.y) && point.y < top;
    }

    update() {
        if (mouseWasReleased()) {
            this.dragging = false;
            return;
        }
        if (mouseWasPressed() && this.isWithin(mousePos)) {
            this.dragging = true;
        }
    }

    render() {
        drawTile(this.pos, this.size, this.tileInfo);
    }

    renderPost() {
        if (this.dragging) {
            drawTile(mousePos, vec2(0.5), this.tileInfo);
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

    isWithin(point) {
        const left = this.pos.x;
        const top = this.pos.y;
        return point.x > left && point.x < (left + this.size.x) && point.y > (top - this.size.y) && point.y < top;
    }

    update() {
        if (mouseWasReleased() && this.isWithin(mousePos)) {
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
