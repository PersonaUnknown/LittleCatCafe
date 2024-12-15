class Score {
    constructor() {
        this.score = 0;
    }
    getScore() {
        return this.score;
    }
    setScore(score) {
        this.score = score;
    }
    addScore(score) {
        this.score += score;
    }
    update() {

    }
    render() {

    }
    renderPost() {
        drawTextScreen(
            `Score: ${this.score}`,
            vec2(mainCanvasSize.x * 0.875, mainCanvasSize.y * 0.9),
            40
        )
    }
}