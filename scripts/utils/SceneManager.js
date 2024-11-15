const SceneList = {
    "Title": 0,
    "Cafe": 1,
}
function getSceneByName(scene) {
    return SceneList[scene];
}
class SceneManager {
    constructor(index, scenes) {
        this.index = index;
        this.scenes = scenes;
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
    }
}