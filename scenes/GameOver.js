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
                vec2(width * 0.5, height * 0.15),
                65,
                rgb(0, 0, 0, 1)
            ),
            new Button(
                new Label(
                    "Back To Main Menu",
                    vec2(width * 0.5, height * 0.35),
                    65,
                    rgb(0, 0, 0, 1)
                ),
                vec2(0, 3.5),
                vec2(22, 4),
                () => {
                    sceneManager.switchScene("Title");
                },
                rgb(1, 1, 1, 1),
                rgb(0, 1, 1, 1),
                false,
                true
            ),
            new Button(
                new Label(
                    "Retry",
                    vec2(width * 0.5, height * 0.55),
                    65,
                    rgb(0, 0, 0, 1)
                ),
                vec2(0, -1),
                vec2(10, 3),
                () => {
                    coin = new SoundWave('audio/coin01.mp3');
                    correct = new SoundWave('audio/correct_answer3.mp3');
                    currentTrack = playAudioFile("audio/cafe_music.mp3", 1, true);
                    sceneManager.switchScene("Cafe");
                },
                rgb(1, 1, 1, 1),
                rgb(0, 1, 1, 1),
                false,
                true
            )        
        ]
        const scoreLabel = new Label(
            "Score: 0",
            vec2(width * 0.5, height * 0.8),
            65,
            rgb(0, 0, 0, 1)
        );
        const initObjects = [...backgrounds, ...components, scoreLabel];
        super(4, initObjects);
        this.scoreLabel = scoreLabel;
    }

    setScore(value) {
        this.scoreLabel.setText(`Score: ${value}`);
    }
}