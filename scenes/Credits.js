// Credits Screen
class Credits extends Scene {
    constructor() {
        // https://www.retronator.com/post/144663044146/pixel-art-academy-unofficial-pico-8-integration <-- Reference Art for notebook art
        // https://i.etsystatic.com/26217258/r/il/922710/3214023924/il_fullxfull.3214023924_g76t.jpg <-- Reference Art for blackboard menu
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
            {
                creator: "Najmah Salam",
                assets: [
                    "Naj's Baked Good Assets"
                ]
            },
            {
                creator: "karsiori",
                asses: [
                    "Pixel Art Food Pack"
                ]
            }
        ]
        const backgrounds = [

        ]
        const components = [

        ]
        const initObjects = [...backgrounds, ...components];
        super(2, initObjects);
    }
}