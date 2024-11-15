class Cafe extends Scene {
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
                "Cafe Scene",
                new vec2(width * 0.5, height * 0.25),
                75,
                rgb(0, 0, 0, 1)
            ),
            new Player(
                vec2(),
                vec2(1),
                PlayerTile,
                0
            )
        ]
        const initObjects = [...backgrounds, ...components];
        super(0, initObjects);
    }
}
