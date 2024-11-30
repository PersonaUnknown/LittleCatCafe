function initMinigames() {
    class TimerMinigame {
        active = false;
        done = false;
        delay = 5;
        timer = new Timer();
        recipes = {};
        input = null;

        constructor(progressBarPos, delay = 5, recipes = {}) {
            this.progressBar = new Meter(progressBarPos, vec2(1, 0.25), 0);
            this.delay = delay;
            this.recipes = recipes;
        }

        interact(item) {
            if (this.active) return;
            if (this.done && item === null) {
                let output = this.recipes[this.input];
                sceneManager.player.setItem(output);
                this.done = false;
                this.input = null;
            }
            else if (!this.done && item in this.recipes) {
                this.active = true;
                this.timer.set(this.delay);
                sceneManager.player.setItem(null);
                this.input = item;
            }
        }

        update() {
            if (this.timer.elapsed()) {
                this.timer.unset();
                this.active = false;
                this.done = true;
            }
            this.progressBar.visible = this.active;
            if (this.active) {
                this.progressBar.adjustProgress(this.timer.getPercent());
            }
        }

        render() {}
        renderPost() {}
    }

    return {
        toaster : new TimerMinigame(vec2(14.5, 16), 5, { [ITEMS.bread] : ITEMS.cheese }),
    }
}
