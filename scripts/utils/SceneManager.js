const SceneList = {
    "Title": 0,
    "Cafe": 1,
    "Coffee" : 2,
}
function getSceneByName(scene) {
    return SceneList[scene];
}
class SceneManager {
    constructor(index, scenes) {
        this.index = index;
        this.scenes = scenes;
        this.player = null;
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
    switchScene(scene) {
        let sceneId = SceneList[scene];
        if (this.index !== sceneId) {
            this.scenes[this.index].destroy();
            this.player = null;
            this.index = sceneId;
            this.scenes[this.index].init();
            switch (scene) {
                case "Title":
                    // currentTrack = titleMusic;
                    // currentTrack.play();
                    break;
                case "Cafe":
                    playAudioFile("/audio/cafe_music.mp3", 1, true);
                    break;
            }
        }
    }
    setPlayer(player) {
        this.player = player;
    }
}