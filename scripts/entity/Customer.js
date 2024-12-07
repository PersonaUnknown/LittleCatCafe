/* 
* Enum for customer moods FSM
* @readonly
*/ 
const CustomerMoods = {
    HAPPY:     { state: "happy", index: 0 },
    ANNOYED:   { state: "annoyed", index: 1 },
    IMPATIENT: { state: "impatient", index: 2 },
    WAITING:   { state: "waiting", index: 3 },
    NONE:      { state: "none", index: -1 }
};
class Customer {
    constructor(pos, index, onLeaveCallback) {
        this.sprite = new TileInfo(vec2(Math.floor(Math.random() * 5) * 16, 0), TILE_SIZE, 1),
        this.mood = CustomerMoods.NONE;
        this.pos = pos;
        this.travelTime = 0;
        this.currentDestination = this.pos;
        this.moveSpeed = 0.02;
        this.targetDestination = [];
        this.patience = 15;
        this.timer = new Timer(this.patience / 3);
        this.onLeaveCallback = onLeaveCallback;
        this.index = index;
        this.state = false; // True: Waiting in line, False: Ordering
        this.order = this.generateOrder();
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
                this.mood = CustomerMoods.NONE;
                break;
            case "none":
                this.mood = CustomerMoods.HAPPY;
                break;
        }
        this.timer.set(this.patience / 3)
    }
    generateOrder() {
        this.mood = CustomerMoods.NONE;
        const food = Object.keys(ITEMS);
        const random = Math.floor(Math.random() * food.length);
        // const random = 0;
        return food[random];
    }
    takeOrder() {
        cafe.book.appendTask(this.order);
        this.moveSpeed = 0.3;
        this.timer.set(this.patience / 3);
    }
    update() {
        if (this.timer.elapsed()) {
            this.emote();
        }
        if (
            this.targetDestination.length > 0
        ) {
            this.travelTime += timeDelta;
            const distance = this.currentDestination.distance(this.targetDestination[0]);
            this.pos.x = lerp(this.travelTime * this.moveSpeed / distance, this.currentDestination.x, this.targetDestination[0].x);
            this.pos.y = lerp(this.travelTime * this.moveSpeed / distance, this.currentDestination.y, this.targetDestination[0].y);
            if (this.pos.distance(this.targetDestination[0]) <= 0.01) {
                this.pos = this.targetDestination[0];
                this.currentDestination = this.pos;
                this.targetDestination.shift();
                this.travelTime = 0;    
            }
        }
    }
    render() {

    }
    renderPost() {
        // Draw customer
        drawTile(
            this.pos,
            vec2(1),
            this.sprite
        )
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