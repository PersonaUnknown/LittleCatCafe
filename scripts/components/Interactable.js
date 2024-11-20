class Interactable {
    constructor(pos, size, action) {
        this.pos = pos;
        this.size = size;
        this.action = action;
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
        
    }

    render() {

    }

    renderPost() {

    }
}
