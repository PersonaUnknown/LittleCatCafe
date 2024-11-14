class SceneManager {
    constructor(index, scenes) {
        this.index = index;
        this.scenes = scenes;
    }
    static onSceneChange(index) {
        const length = this.scenes.length;
        if (index >= 0 && index < length) {
            this.index = index;
        }
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