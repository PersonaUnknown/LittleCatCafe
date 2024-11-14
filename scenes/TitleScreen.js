// Starting point of game
class TitleScreen extends Scene {
    constructor() {
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
                new vec2(width * 0.5, height * 0.25),
                75,
                rgb(0, 0, 0, 1)
            ),
            new Button(
                new Label(
                    "Play",
                    new vec2(width * 0.5, height * 0.5),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(0, 0), 
                vec2(16, 3),
                () => {},
                rgb(1, 1, 1, 1),
                rgb(0, 1, 1, 1)
            ),
            new Button(
                new Label(
                    "Credits",
                    new vec2(width * 0.5, height * 0.725),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(0, -5), 
                vec2(16, 3),
                () => {},
                rgb(1, 1, 1, 1),
                rgb(0, 1, 1, 1)
            )
        ]
        const initObjects = [...backgrounds, ...components];
        super(0, initObjects);
    }
}