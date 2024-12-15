class LifeManager {
    constructor() {
        this.size = vec2(1, 1);
        this.numHearts = 5;
        this.currHearts = 5;
    }
    reset() {
        this.currHearts = 5;
    }
    onScoreDecrease() {
        this.currHearts--;
        if (this.currHearts <= 0) {
            currentTrack.stop();
            gameover.setScore(cafe.score.getScore());
            setCameraPos(vec2(0));
            sceneManager.switchScene("Game Over");
            cafe = new Cafe(sceneManager);
            sceneManager.scenes[1] = cafe;
        }
    }
    update() {
        if (keyWasPressed("KeyG")) {
            this.onScoreDecrease();
        }
    }
    render() {

    }
    renderPost() {
        let startingX = 21;
        const offset = 1.25;
        for (let i = 0; i < this.numHearts; i++) {
            if (this.currHearts - 1 >= i) {
                drawTile(
                    vec2(startingX + i * offset, 1),
                    this.size,
                    HeartIcon
                )
            }
        }
    }
}