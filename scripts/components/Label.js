class Label {
    constructor (text, pos, size, color, borderColor=null) {
        this.text = text;
        this.pos = pos;
        this.size = size;
        this.color = color;    
        this.borderColor = borderColor;
    }
    setText(text) {
        this.text = text;
    }
    update() {
        
    }
    render() {

    }
    renderPost() {
        if (this.borderColor === null) {
            drawTextScreen(
                this.text,
                this.pos,
                this.size,
                this.color
            )
        } else {
            drawTextScreen(
                this.text,
                this.pos,
                this.size,
                this.color,
                5,
                this.borderColor,
            )
        }         
    }
}