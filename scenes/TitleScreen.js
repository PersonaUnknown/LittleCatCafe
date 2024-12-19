// Starting point of game
class TitleScreen extends Scene {
    constructor(sceneManager) {
        const backgrounds = [
            new Tile(
                vec2(0, 0),
                vec2(40, 22),
                TitleBackground
            )
        ]
        const components = [
            new Label(
                "Little Cat Cafe",
                vec2(width * 0.5, height * 0.25),
                75,
                rgb(0, 0, 0, 1),
                rgb(1, 1, 1, 1)
            ),
            new Button(
                new Label(
                    "Play",
                    vec2(width * 0.5, height * 0.5),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(0, 0), 
                vec2(16, 3),
                () => {
                    currentTrack = playAudioFile("audio/cafe_music.mp3", 1, true);
                    sceneManager.switchScene("Cafe");
                },
                rgb(1, 1, 1, 1),
                rgb(0, 1, 1, 1),
                false,
                true
            ),
            new Button(
                new Label(
                    "Tutorial",
                    vec2(width * 0.5, height * 0.65),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(0, -3.25), 
                vec2(16, 3),
                () => {
                    tutorialCafe = new TutorialCafe();
                    sceneManager.scenes[5] = tutorialCafe;
                    currentTrack = playAudioFile("audio/cafe_music.mp3", 1, true);
                    sceneManager.switchScene("Tutorial");
                },
                rgb(1, 1, 1, 1),
                rgb(0, 1, 1, 1),
                false,
                true
            ),
            new Button(
                new Label(
                    "Credits",
                    vec2(width * 0.5, height * 0.8),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(0, -6.5), 
                vec2(16, 3),
                () => {
                    sceneManager.switchScene("Credits");
                },
                rgb(1, 1, 1, 1),
                rgb(0, 1, 1, 1),
                false,
                true
            )
        ]
        const initObjects = [...backgrounds, ...components];
        super(0, initObjects);
    }
}