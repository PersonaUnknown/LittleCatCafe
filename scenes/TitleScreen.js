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
                rgb(0, 0, 0, 1)
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
                    currentTrack = playAudioFile("/audio/cafe_music.mp3", 1, true);
                    sceneManager.switchScene("Cafe");
                },
                rgb(1, 1, 1, 1),
                rgb(0, 1, 1, 1),
                false,
                true
            ),
            new Button(
                new Label(
                    "Credits",
                    vec2(width * 0.5, height * 0.725),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(0, -5), 
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