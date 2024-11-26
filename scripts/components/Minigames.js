function initMinigames() {
    class Toaster {
        active = false;
        done = false;
        progressBar = new Meter(vec2(14.5, 16), vec2(1, 0.25), 0);
        delay = 5;
        timer = new Timer();

        interact(item) {
            if (this.active) return;
            if (this.done && item === null) {
                sceneManager.player.setItem(ITEMS.cheese);
                this.done = false;
            }
            else if (!this.done && item === ITEMS.bread) {
                this.active = true;
                this.timer.set(this.delay);
                sceneManager.player.setItem(null);
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
        toaster : new Toaster(),
    }
}
