class TutorialCafe extends Cafe {
    constructor() {
        super();
        const tutorialCustomerManager = new TutorialCustomerManager();
        this.objects[0] = tutorialCustomerManager;
        this.customerManager = tutorialCustomerManager;
        this.customerManager.cafe = this;
        this.customerManager.onScoreIncreaseCallback = (value) => { this.addScore(value); }
        
        // Add tutorial book
        this.objects.push(new TutorialBook());

        // Add back button to go back to Title Screen
        const backButton = new Button(
            new Label(
                "Back To Title",
                vec2(width * 0.4, height * 0.075),
                35,
                rgb(0, 0, 0)
            ),
            vec2(4, 17.75),
            vec2(8, 1.5),
            () => {
                currentTrack?.stop();
                setCameraPos(vec2(0));
                sceneManager.switchScene("Title");
            },
            rgb(1, 1, 1, 1),
            rgb(0, 1, 1, 1),
            false,
            true
        )
        this.objects.push(backButton);

        // Replace coffee station with tutorial variant
        for (const i of this.objects) {
            if (i instanceof Interactable && i.tooltip === "Coffee station") {
                i.action = (item) => {
                    this.playerPos = sceneManager.player.pos;
                    if (item === ITEMS.coffee) sceneManager.switchScene("TutorialCoffee");
                }
            }
        }
    }
}