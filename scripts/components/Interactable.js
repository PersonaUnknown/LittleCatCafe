class Interactable {
    constructor(pos, size, action, tooltip, debugRender = false) {
        this.pos = pos;
        this.size = size;
        this.action = action;
        this.tooltip = tooltip;
        this.debugRender = debugRender;
        this.tooltipRender = false;
    }

    isWithin(point) {
        const left = this.pos.x;
        const top = this.pos.y;
        return point.x > left && point.x < (left + this.size.x) && point.y > (top - this.size.y) && point.y < top;
    }

    run(...args) {
        this.action(...args);
    }

    update() {
        this.tooltipRender = sceneManager.player && this.isWithin(sceneManager.player.pos);
    }

    render() {
        if (this.debugRender) {
            const offset = this.size.scale(0.5);
            drawRect(vec2(this.pos.x + offset.x, this.pos.y - offset.y));
        }
        if (this.tooltipRender) {
            drawText(this.tooltip, vec2(this.pos.x + (this.size.x / 2), this.pos.y + 1), 1);
        }
    }

    renderPost() {

    }
}
