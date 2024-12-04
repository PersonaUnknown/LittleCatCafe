class CoffeeScene extends Scene {
    constructor() {
        const draggables = [
            new Draggable(vec2(6, 6), vec2(4), FoodSprites[ITEMS.egg], "egg"),
            new Draggable(vec2(6, 1), vec2(4), FoodSprites[ITEMS.jelly], "jelly"),
        ]
        const receiver = new DragReceiver(vec2(1, 1), vec2(4), FoodSprites[ITEMS.coffee], draggables, (data) => console.log(data));
        
        const initObjects = [receiver, ...draggables];
        super(2, initObjects);
    }
}
