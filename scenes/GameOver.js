class GameOver extends Scene {
    constructor(sceneManager) {
        const backgrounds = [
            new Tile(
                vec2(0, 0),
                vec2(60, 40),
                TitleBackground
            )
        ]
        const components = [
            new Label(
                "Game Over!",
                vec2(mainCanvasSize.x * 0.5, mainCanvasSize.y * 0.05),
                65,
                rgb(0, 0, 0, 1)
            ),
            new Button(
                new Label(
                    "Back To Main Menu",
                    vec2(mainCanvasSize.x * 0.5, mainCanvasSize.y * 0.25),
                    65,
                    rgb(0, 0, 0, 1)
                ),
                vec2(4, 10),
                vec2(22, 4),
                () => {
                    sceneManager.switchScene("Title");
                },
                rgb(1, 1, 1, 1),
                rgb(0.5, 0.5, 0.5, 1),
                false,
                true
            ),
            new Button(
                new Label(
                    "Retry",
                    vec2(mainCanvasSize.x * 0.5, mainCanvasSize.y * 0.35),
                    65,
                    rgb(0, 0, 0, 1)
                ),
                vec2(4, 6.25),
                vec2(10, 3),
                () => {
                    currentTrack = playAudioFile("/audio/cafe_music.mp3", 1, true);
                    sceneManager.switchScene("Cafe");
                },
                rgb(1, 1, 1, 1),
                rgb(0.5, 0.5, 0.5, 1),
                false,
                true
            )        
        ]
        const initObjects = [...backgrounds, ...components];
        super(4, initObjects);
    }
}