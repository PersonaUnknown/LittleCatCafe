/* 
* Enum for customer moods FSM
* @readonly
*/ 
const CustomerMoods = {
    HAPPY:     { state: "happy", index: 0 },
    ANNOYED:   { state: "annoyed", index: 1 },
    IMPATIENT: { state: "impatient", index: 2 },
    WAITING:   { state: "waiting", index: 3 },
    FRUSTRATED: { state: "frustrated", index: 4},
    SATISFIED: { state: "satisfied", index: 5},
    NONE:      { state: "none", index: -1 },
};
class Customer {
    constructor(pos, index, onLeaveCallback, onExitCallback, cafe) {
        this.mood = CustomerMoods.NONE;
        this.pos = pos;
        this.travelTime = 0;
        this.currentDestination = this.pos;
        this.moveSpeed = 0.02;
        this.targetDestination = [];
        this.patience = 15;
        this.timer = new Timer(this.patience / 3);
        this.onLeaveCallback = onLeaveCallback;
        this.onExitCallback = onExitCallback;
        this.index = index;
        this.state = false; // True: Waiting in line, False: Ordering
        this.order = this.generateOrder();
        this.timeWaited = 0;
        this.cafe = cafe;
        // Determine animation
        const rng = Math.random();
        let spriteIndex = 5;
        if (rng > 0.8) {
            spriteIndex = 4;
        } else if (rng > 0.6) {
            spriteIndex = 3;
        } else if (rng > 0.4) {
            spriteIndex = 1;
        } else if (rng > 0.2) {
            spriteIndex = 0;
        }
        const spriteOffset = 16 * spriteIndex;
        this.animator = new Animator(
            {
                "front" : [
                    new TileInfo(vec2(48, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(64, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(80, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(96, spriteOffset), TILE_SIZE, 1),
                ],
                "back" : [
                    new TileInfo(vec2(160, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(176, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(192, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(208, spriteOffset), TILE_SIZE, 1),
                ],
                "right" : [
                    new TileInfo(vec2(224, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(240, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(256, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(272, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(288, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(304, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(320, spriteOffset), TILE_SIZE, 1),
                ],
                "left" : [
                    new TileInfo(vec2(336, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(352, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(368, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(384, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(400, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(416, spriteOffset), TILE_SIZE, 1),
                    new TileInfo(vec2(432, spriteOffset), TILE_SIZE, 1),
                ]
            },
            0.25,
            "back"
        );
    }
    setIndex(index) {
        this.index = index;
    }
    decrementIndex() {
        this.index--;
    }
    travel(targetDestination) {
        this.travelTime = 0;
        this.currentDestination = this.pos;
        this.targetDestination = targetDestination;
    }
    emote() {
        const state = this.mood.state;
        switch (state) {
            case "happy":
                this.mood = CustomerMoods.WAITING;
                break;
            case "waiting":
                this.mood = CustomerMoods.ANNOYED;
                break;
            case "annoyed":    
                this.mood = CustomerMoods.IMPATIENT;
                break;
            case "impatient":
                this.onLeaveCallback(this.index, this.state);
                this.mood = CustomerMoods.FRUSTRATED;
                break;
            case "none":
                this.mood = CustomerMoods.HAPPY;
                break;
            case "frustrated":
                return;
        }
        this.timer?.set(this.patience / 3)
    }
    generateOrder() {
        this.mood = CustomerMoods.NONE;
        const food = Object.keys(ITEMS_MENU);
        const random = Math.floor(Math.random() * food.length);
        const randomIndex = ITEMS_MENU[random];
        return ITEM_NAMES[randomIndex];
    }
    takeOrder() {
        this.cafe?.book?.appendTask(this.order);
        this.timer?.set(this.patience / 3);
    }
    update() {
        if (this.state && (this.mood === CustomerMoods.WAITING || this.mood === CustomerMoods.ANNOYED || this.mood === CustomerMoods.IMPATIENT)) {
            this.timeWaited += timeDelta;
        }
        if (this.timer?.elapsed()) {
            this.emote();
        }
        if (
            this.targetDestination.length > 0
        ) {
            const directionCheck = this.currentDestination.subtract(this.targetDestination[0]);
            if (directionCheck.x < 0) {
                this.animator.setState("right");
            } else if (directionCheck.x > 0) {
                this.animator.setState("left");
            } else if (directionCheck.y < 0) {
                this.animator.setState("back");
            } else {
                this.animator.setState("front");
            }
            this.travelTime += timeDelta;
            const distance = this.currentDestination.distance(this.targetDestination[0]);
            this.pos.x = lerp(this.travelTime / distance * this.moveSpeed, this.currentDestination.x, this.targetDestination[0].x);
            this.pos.y = lerp(this.travelTime / distance * this.moveSpeed, this.currentDestination.y, this.targetDestination[0].y);
            if (this.pos.distance(this.targetDestination[0]) <= 0.01) {
                this.pos = this.targetDestination[0];
                this.currentDestination = this.pos;
                this.targetDestination.shift();
                this.travelTime = 0;    
            }
        } else {
            if (this.mood === CustomerMoods.FRUSTRATED || this.mood === CustomerMoods.SATISFIED) {
                this.onExitCallback(this.index);
            }
            this.animator.setState("back")
        }
    }
    render() {

    }
    renderPost() {
        // Draw customer
        this.animator.render(this.pos, vec2(1));
        // Draw mood
        const index = this.mood.index;
        if (index >= 0) {
            drawTile(
                vec2(this.pos.x, this.pos.y + 1),
                vec2(0.75, 0.75),
                Emoticons[index]
            )
        }
    }
}
class TutorialCustomer extends Customer {
    constructor(pos, index, onLeaveCallback, onExitCallback, cafe) {
        super(pos, index, onLeaveCallback, onExitCallback, cafe);
        this.timer = null;
    }
}