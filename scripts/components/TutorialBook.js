class TutorialPage {
    constructor(header, objects=[], sprites=[])  {
        this.header = header;
        this.objects = objects;
        this.sprites = sprites;
    }
    renderPost() {
        drawTextScreen(
            this.header,
            vec2(width * 0.02, height * 0.59),
            35,
            rgb(1, 1, 1, 1),
            5,
            rgb(0, 0, 0, 1),
            "left"
        )
        for (const object of this.objects) {
            drawTextScreen(
                object[0],
                object[1],
                25,
                rgb(1, 1, 1, 1),
                5,
                rgb(0, 0, 0, 1),
                "left"
            )
        }
        for (const sprite of this.sprites) {
            drawTile(...sprite);
        }
    }
}
class TutorialBook {
    constructor() {
        this.pages = [
            new TutorialPage(
                "Story",
                [
                    [
                        "You are running a cafe.\nTake customer orders,\nprepare the food, and\nhand it to them in time.\nAim for a high score! Be\nquick, though. Cats are\nimpatient.",
                        vec2(width * 0.02, height * 0.63)
                    ]
                ],
                []
            ),
            new TutorialPage(
                "Controls",
                [
                    [
                        "Move",
                        vec2(width * 0.175, height * 0.7)
                    ],
                    [
                        "Interact",
                        vec2(width * 0.175, height * 0.81)
                    ]
                ],
                [
                    [vec2(-8, 4), vec2(1, 1), Controls["w"]],
                    [vec2(-9, 3), vec2(1, 1), Controls["a"]],
                    [vec2(-8, 3), vec2(1, 1), Controls["s"]],
                    [vec2(-7, 3), vec2(1, 1), Controls["d"]],
                    [vec2(-8, 1), vec2(1, 1), Controls["e"]]
                ]
            ),
            new TutorialPage(
                "Ingredients",
                [
                    [
                        "Basic ingredients and\ndesserts can be obtained\nby interacting with the\nfridge or pastry counter.\nClick on the food to get\nit. You can only hold onto\none item and need an\nempty hand to grab items.",
                        vec2(width * 0.02, height * 0.63)
                    ],
                ],
                []
            ),
            new TutorialPage(
                "Cooking",
                [
                    [
                        "Interact with various\nwork stations to assemble\nmore complex foods. You'll\nneed an empty hand to\ngrab food from those\nstations. Use the trash can\nin the corner if you need\nto free up your hands.",
                        vec2(width * 0.02, height * 0.63)
                    ],
                ],
                []
            ),
            new TutorialPage(
                "Coffee",
                [
                    [
                        "Interact with the\nCoffee Maker to have it\nproduce one cup of coffee.\nInteract with the Coffee\nMaker to pick it up.\nInteract with the station\nnearby to make different\nkinds of coffee.",
                        vec2(width * 0.02, height * 0.63)
                    ]
                ]
            ),
            new TutorialPage(
                "Ramen",
                [
                    [
                        "Grab a ramen cup from the\nfridge and interact with\nthe kitchen sink to fill it\nwith water. Place it then\ninto the microwave.",
                        vec2(width * 0.02, height * 0.63)
                    ]
                ]
            ),
            
            new TutorialPage(
                "Sandwiches",
                [
                    [
                        "Most sandwiches require\ntoasted bread where\nyou'll need to put bread\n in the toaster. Place\nsandwich ingredients by\nthe cutting board to\nassemble. Interacting with\nan empty hand grabs the\nsandwich.",
                        vec2(width * 0.02, height * 0.63)
                    ]
                ]
            ),
            new TutorialPage(
                "Customers",
                [
                    [
                        "Interact with customers\nby the register to get their\norder. Interact again to\nhand them their food.\nCustomers will leave if\nyou take too long. You can\ngive any customer their\norder at any time.",
                        vec2(width * 0.02, height * 0.63)
                    ]
                ]
            ),
            new TutorialPage(
                "Orders/Recipes",
                [
                    [
                        "Keep track of customer\norders and recipes via the \nbook on the right.\nAll recipes can be found on\npages 2 and 3 of this book.",
                        vec2(width * 0.02, height * 0.63)
                    ],
                ],
                []
            ),
            new TutorialPage(
                "Tips",
                [
                    [
                        "1. Prepping some stations\ncan save time\n2. The trash can is far\naway so try not to use it\n3. Be familiar with all the\nrecipes before playing the\nmain game\n4. The game gets harder\nas time progresses",
                        vec2(width * 0.02, height * 0.63)
                    ],
                ],
                []
            )
        ]
        this.navButtons = [
            new IconButton(
                LeftArrow,
                vec2(-10, -2),
                vec2(1, 1),
                new Label(
                    "",
                    new vec2(0, 0),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(-10, -2), 
                vec2(1, 1),
                () => { 
                    const newIndex = Math.max(this.index - 1, 0);
                    this.switchTabs(newIndex);
                },
                rgb(0, 0, 0, 0),
                rgb(0, 0, 0, 0),      
                true
            ),
            new IconButton(
                RightArrow,
                vec2(-2, -2),
                vec2(1, 1),
                new Label(
                    "",
                    new vec2(0, 0),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(-2, -2), 
                vec2(1, 1),
                () => { 
                    const newIndex = Math.min(this.index + 1, this.pages.length - 1);
                    this.switchTabs(newIndex);
                },
                rgb(0, 0, 0, 0),
                rgb(0, 0, 0, 0),
                true
            )
        ]
        this.index = 0;
    }
    switchTabs(index) {
        this.index = index;
    }
    update() {
        for (const button of this.navButtons) {
            button.update();
        }
    }
    render() {

    }    
    renderPost() {
        // Background Rendering
        drawTile(
            vec2(-6, 2),
            vec2(12, 10),
            BookSprite
        );

        // Page Rendering
        this.pages[this.index].renderPost();

        // Nav Button Rendering
        if (this.index < this.pages.length - 1) {
            this.navButtons[1].renderPost();
        }
        if (this.index > 0) {
            this.navButtons[0].renderPost();
        }
    }
}