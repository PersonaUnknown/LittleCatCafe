const SceneList = {
    "Title": 0,
    "Cafe": 1,
    "Coffee" : 2,
    "Credits": 3,
    "Game Over": 4,
    "Tutorial": 5
}
function getSceneByName(scene) {
    return SceneList[scene];
}
class SceneManager {
    constructor(index, scenes) {
        this.index = index;
        this.scenes = scenes;
        this.player = null;
        this.fadeTimer = new Timer();
    }
    update() {
        const index = this.index;
        const scenes = this.scenes;
        if (index >= 0 && index < scenes.length) {
            const currScene = scenes[index];
            currScene.update();
        }
    }
    render() {
        const index = this.index;
        const scenes = this.scenes;
        if (index >= 0 && index < scenes.length) {
            const currScene = scenes[index];
            currScene.render();
        }
    }
    renderPost() {
        const index = this.index;
        const scenes = this.scenes;
        if (index >= 0 && index < scenes.length) {
            const currScene = scenes[index];
            currScene.renderPost();
        }

        if (this.fadeTimer.active()) {
            drawRect(vec2(8, 8), vec2(64), rgb(0, 0, 0, 1 - this.fadeTimer.getPercent()));
        }
    }
    switchScene(scene) {
        this.fadeTimer.set(0.25);
        let sceneId = SceneList[scene];
        if (this.index !== sceneId) {
            this.scenes[this.index].destroy();
            this.player = null;
            this.index = sceneId;
            this.scenes[this.index].init();
        }
    }
    setPlayer(player) {
        this.player = player;
    }
}