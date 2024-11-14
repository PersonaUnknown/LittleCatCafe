class Cafe extends Scene {
    constructor() {
        const backgrounds = [

        ]
        const components = [
            new Label(
                "Cafe Scene",
                new vec2(width * 0.5, height * 0.25),
                75,
                rgb(0, 0, 0, 1)
            )
        ]
        const initObjects = [...backgrounds, ...components];
        super(0, initObjects);
    }
}