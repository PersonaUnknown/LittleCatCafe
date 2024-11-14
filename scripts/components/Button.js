class Button {
    constructor(
        label, 
        pos,
        size,
        onPress, 
        backgroundColor, 
        hoverBackgroundColor
    ) {
        // Params
        this.label = label;
        this.pos = pos;
        this.size = size;
        this.onPress = onPress;
        this.backgroundColor = backgroundColor;
        this.hoverBackgroundColor = hoverBackgroundColor;
        // States
        this.isMouseOver = false;
    }
    update() {
        this.isMouseOver = isPointWithinBox(mousePos, this.pos, this.size)
        if (this.isMouseOver && this.onPress !== null && keyWasPressed(0)) {
            this.onPress();
        }
    }

    render() {
        drawRect(
            this.pos,
            this.size,
            this.isMouseOver ? this.hoverBackgroundColor : this.backgroundColor
        )
        this.label.render();
    }
    renderPost() {
        
    }
}