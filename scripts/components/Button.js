class Button {
    constructor(
        label, 
        pos,
        size,
        onPress, 
        backgroundColor, 
        hoverBackgroundColor,
        isToggleButton = false,
        useBorder = false
    ) {
        // Params
        this.label = label;
        // this.icon = icon;
        this.pos = pos;
        this.size = size;
        this.onPress = onPress;
        this.backgroundColor = backgroundColor;
        this.hoverBackgroundColor = hoverBackgroundColor;
        // States
        this.isMouseOver = false;
        this.isToggleButton = isToggleButton;
        this.isToggled = false;
        this.useBorder = useBorder;
    }
    toggleOn() {
        if (this.isToggleButton) {
            this.isToggled = true;
        }
    }
    toggleOff() {
        if (this.isToggleButton) {
            this.isToggled = false; 
        }
    }
    update() {
        this.isMouseOver = isPointWithinBox(mousePos, this.pos, this.size)
        if (this.isMouseOver && this.onPress !== null && keyWasPressed(0)) {
            this.onPress();
        }
    }
    render() {
        
    }
    renderPost() {
        // Background
        drawRect(
            this.pos,
            vec2(this.size.x * 0.95, this.size.y * 0.95),
            this.isMouseOver || (this.isToggleButton && this.isToggled) ? 
                this.hoverBackgroundColor : 
                this.backgroundColor
        )
        if (this.useBorder) {
            drawTile(
                this.pos,
                this.size,
                OutlineRectangle
            )
        }
        // Text Label
        this.label.renderPost();
        // Image Icon
    }
}

class IconButton extends Button {
    constructor(
        tileInfo,
        tilePos,
        tileSize,
        label,
        buttonPos,
        buttonSize,
        onPress, 
        backgroundColor, 
        hoverBackgroundColor,
        isToggleButton = false
    ) {
        super(
            label,
            buttonPos,
            buttonSize,
            onPress,
            backgroundColor,
            hoverBackgroundColor,
            isToggleButton
        );
        this.tileInfo = tileInfo;
        this.tilePos = tilePos;
        this.tileSize = tileSize;
    }
    renderPost() {
        // Original Button
        super.renderPost();
        // Icon
        drawTile(
            this.tilePos,
            this.tileSize,
            this.tileInfo
        )
    }
}