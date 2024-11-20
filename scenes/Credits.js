// Credits Screen
class Credits extends Scene {
    constructor() {
        const sources = [
            { 
                creator: "ekin tumer",
                assets: [
                    "Noun Project - Recipe"
                ]
            },
            {
                creator: "hello erika",
                assets: [
                    "free cute cozy cooking game assest"
                ]
            },
            {
                creator: "HelloRumin",
                assets: [
                    "Neko Cafe Asset Pack",
                    "Neko Office Asset Pack"
                ]
            },
            { 
                creator: "Kenney",
                assets: [
                    "Emotes Pack",
                    "Input Prompts Pixel 16x",
                    "UI Pack"
                ]
            },
            {
                creator: "https://perchance.org/ai-pixel-art-generator",
                assets: [
                    "Used to create reference backgrounds"
                ]
            },
            { 
                creator: "Yaroslav Samoilov",
                assets: [
                    "Noun Project - Order"
                ]
            },
        ]
        const backgrounds = [

        ]
        const components = [

        ]
        const initObjects = [...backgrounds, ...components];
        super(2, initObjects);
    }
}