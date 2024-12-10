// Credits Screen
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
        assets: [
            "Pixel Art Food Pack"
        ]
    },
    {
        creator: "katame13",
        assets: [
            "CoffeeTools-16bit"
        ]
    },
    {
        creator: "Syafrizal a.k.a. Khurasan",
        assets: [
            "Life Kittie Font"
        ]
    },
    {
        creator: "MUSIC FOR VIDEO LIBRARY",
        assets: [
            "203. Cooking Show Background Music [Food, Funk]"
        ]
    },
    {
        creator: "https://taira-komori.jpn.org/",
        assets: [
            "coin01",
            "correct_answer3",
        ]
    }
]
class Credits extends Scene {
    constructor() {
        // https://www.retronator.com/post/144663044146/pixel-art-academy-unofficial-pico-8-integration <-- Reference Art for notebook art
        // https://i.etsystatic.com/26217258/r/il/922710/3214023924/il_fullxfull.3214023924_g76t.jpg <-- Reference Art for blackboard menu
        const backgrounds = [
            new Tile(
                vec2(0, 0),
                vec2(40, 22),
                TitleBackground
            )
        ]
        const components = [
            new Button(
                new Label(
                    "<-",
                    vec2(mainCanvasSize.x * 0.04, mainCanvasSize.y * 0.08),
                    50,
                    rgb(0, 0, 0, 1)
                ),
                vec2(-19, 10),
                vec2(1.5, 1.5),
                () => {
                    sceneManager.switchScene("Title");
                },
                rgb(1, 1, 1, 1),
                rgb(0.5, 0.5, 0.5, 1)
            )        
        ]
        const initObjects = [...backgrounds, ...components];
        super(3, initObjects);
    }
    init() {

    }
    destroy() {
        
    }
    renderPost() {
        super.renderPost();
        // Header
        drawTextScreen(
            "Credits",
            vec2(mainCanvasSize.x * 0.05, mainCanvasSize.y * 0.05),
            50,
            rgb(1, 1, 1, 1),
            5,
            rgb(0, 0, 0, 1),
            "left"
        )
        drawTextScreen(
            "Made by Rayna Leung and Eric Tabuchi",
            vec2(mainCanvasSize.x * 0.01, mainCanvasSize.y * 0.125),
            50,
            rgb(1, 1, 1, 1),
            5,
            rgb(0, 0, 0, 1),
            "left"
        )
        // Sources
        let offset = 0.06;
        let index = 1;
        for (const source of sources) {
            drawTextScreen(
                `${source.creator}: ${source.assets.join(", ")}`,
                vec2(mainCanvasSize.x * 0.01, mainCanvasSize.y * (0.15 + offset * index)),
                30,
                rgb(1, 1, 1, 1),
                5,
                rgb(0, 0, 0, 1),
                "left"    
            )
            index++;
        }
    }
}