class Task {
    constructor(order, pos) {
        this.order = order;
        this.pos = pos;
    }
    renderPost() {
        drawTextScreen(
            this.order,
            this.pos,
            18,
            rgb(0, 0, 0),
            0,
            rgb(0, 0, 0),
            "left"
        )
    }
}
class Recipe {
    constructor(recipe, pos) {
        this.recipe = recipe;
        this.pos = pos;
    }
    renderPost() {
        drawTextScreen(
            this.recipe,
            this.pos,
            14,
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
        this.recipesTwo = [];
        this.navButtons = [
            new IconButton(
                LeftArrow,
                vec2(21, 4),
                vec2(1, 1),
                new Label(
                    "",
                    new vec2(0, 0),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(21, 4), 
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
                vec2(27.25, 4),
                vec2(1, 1),
                new Label(
                    "",
                    new vec2(0, 0),
                    75,
                    rgb(0, 0, 0, 1)
                ),
                vec2(27.25, 4), 
                vec2(1, 1),
                () => { 
                    const newIndex = Math.min(this.index + 1, 2);
                    this.switchTabs(newIndex);
                },
                rgb(0, 0, 0, 0),
                rgb(0, 0, 0, 0),
                true
            )
        ]
        this.navButtons[0].toggleOn();
        this.isHidden = false;
    }
    toggleVisibility() {
        // this.isHidden = !this.isHidden;
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
        const offset = 0.035;
        const length = this.tasks.length;
        const newYPos = height * (0.29 + length * offset)
        const newTask = new Task(
            order,
            vec2(width * 0.81, newYPos),
        )
        this.tasks.push(newTask);
    }
    removeTask(index) {
        const offset = 0.035;
        this.tasks?.splice(index, 1);
        for (let i = index; i < this.tasks.length; i++) {
            this.tasks[i].pos = vec2(
                width * 0.81,
                height * (0.295 + i * offset)
            );
        }
    }
    update() {
        if (this.isHidden) {
            return;
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
            vec2(24, 9),
            vec2(12, 12),
            this.index === 0 ? NotebookFirstPage : NotebookSecondPage
        )

        // Draw Nav Buttons
        if (this.index > 0) {
            this.navButtons[0].renderPost();
        } 
        if (this.index < 2) {
            this.navButtons[1].renderPost();
        }

        // Draw the text of the current information required
        drawTextScreen(
            this.index === 0 ? "Orders" : this.index === 1 ? "Recipes" : "More Recipes",
            vec2(width * 0.81, height * 0.26),
            20,
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
            // Recipes Part 2
            case 2:
                for (const recipe of this.recipesTwo) {
                    recipe.renderPost();
                }
                break;
            default:
                break;
        }
    }
}