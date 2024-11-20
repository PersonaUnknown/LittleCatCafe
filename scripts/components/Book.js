class Task {
    constructor(order, pos) {
        this.order = order;
        this.pos = pos;
    }
    renderPost() {
        drawTextScreen(
            this.order,
            this.pos,
            35,
            rgb(0, 0, 0),
            0,
            rgb(0, 0, 0),
            "left"
        )
    }
}
class Recipe {
    constructor(food, ingredients, pos) {
        this.food = food;
        this.ingredients = ingredients;
        this.pos = pos;
    }
    renderPost() {
        drawTextScreen(
            this.food,
            this.pos,
            35,
            rgb(0, 0, 0),
            0,
            rgb(0, 0, 0),
            "left"
        )
    }
}
class Book {
    constructor() {
        this.index = 0;
        this.tasks = [];
        this.recipes = [];
        this.navButtons = [
            new IconButton(
                OrderIcon,
                vec2(5.25, 15.5),
                vec2(2, 2),
                new Label(
                    "",
                    new vec2(0, 0),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(5.25, 15.5), 
                vec2(4, 3),
                () => { 
                    this.switchTabs(0);
                },
                rgb(1, 1, 1, 1),
                rgb(0, 1, 1, 1),      
                true
            ),
            new IconButton(
                RecipeIcon,
                vec2(9.25, 15.5),
                vec2(2, 2),
                new Label(
                    "",
                    new vec2(0, 0),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(9.25, 15.5), 
                vec2(4, 3),
                () => { 
                    this.switchTabs(1);
                },
                rgb(1, 1, 1, 1),
                rgb(0, 1, 1, 1),
                true
            )
        ]
        this.navButtons[0].toggleOn();
        this.isHidden = true;
    }
    toggleVisibility() {
        this.isHidden = !this.isHidden;
    }
    switchTabs(index) {
        this.index = index;
        for (let i = 0; i < this.navButtons.length; i++) {
            const button = this.navButtons[i];
            if (i === index) {
                button.toggleOn();
            } else {
                button.toggleOff();
            }
        }
    }
    appendTask(order) {
        const offset = 0.05;
        const length = this.tasks.length;
        const newYPos = mainCanvasSize.y * (0.325 + length * offset)
        const newTask = new Task(
            order,
            vec2(mainCanvasSize.x * 0.38, newYPos),
        )
        this.tasks.push(newTask);
    }
    appendRecipe(food, ingredients) {
        const offset = 0.05;
        const length = this.recipes.length;
        const newYPos = mainCanvasSize.y * (0.325 + length * offset)
        const newRecipe = new Recipe(
            food,
            ingredients,
            vec2(mainCanvasSize.x * 0.38, newYPos),
        )
        this.recipes.push(newRecipe);
    }
    update() {
        if (this.isHidden) {
            return;
        }
        
        let index = this.index;
        if (keyWasPressed('KeyQ')) {
            index = Math.max(this.index - 1, 0);
        } else if (keyWasPressed('KeyE')) {
            index = Math.min(this.index + 1, this.navButtons.length - 1);
        }
        if (this.index !== index) {
            this.switchTabs(index);
        }

        for (const button of this.navButtons) {
            button.update();
        }
    }
    render() {
        
    }
    renderPost() {
        if (this.isHidden) {
            return;
        }

        // Draw the background of the book
        drawTile(
            vec2(10, 10),
            vec2(15, 15),
            BookSprite
        )

        // Draw Nav Buttons
        for (const button of this.navButtons) {
            button.renderPost();
        }

        // Draw the text of the current information required
        drawTextScreen(
            this.index === 0 ? "Orders" : "Recipes",
            vec2(mainCanvasSize.x * 0.38, mainCanvasSize.y * 0.275),
            45,
            rgb(0, 0, 0),
            0,
            rgb(0, 0, 0),
            "left"
        )
        switch (this.index) {
            // Tasks
            case 0:
                for (const task of this.tasks) {
                    task.renderPost();
                }
                break;
            // Recipes
            case 1:
                for (const recipe of this.recipes) {
                    recipe.renderPost();
                }
                break;
            default:
                break;
        }
    }
}