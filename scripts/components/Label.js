class Label {
    constructor (text, pos, size, color) {
        this.text = text;
        this.pos = pos;
        this.size = size;
        this.color = color;    
    }
    update() {
        
    }
    render() {
        drawTextScreen(
            this.text,
            this.pos,
            this.size,
            this.color
        ) 
    }
    renderPost() {
        
    }
}