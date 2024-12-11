class TimerMinigame {
    active = false;
    done = false;
    delay = 5;
    timer = new Timer();
    recipes = {};
    input = null;
    particles = null;

    constructor(progressBarPos, delay = 5, recipes = {}, activeParticles = false) {
        this.progressBar = new Meter(progressBarPos, vec2(1, 0.25), 0);
        this.delay = delay;
        this.recipes = recipes;
        this.activeParticles = activeParticles;
    }

    interact(item) {
        if (this.active) return;
        if (this.done && item === null) {
            let output = this.recipes[this.input];
            sceneManager.player.setItem(output);
            this.done = false;
            this.input = null;
            this.destroyParticles();
        }
        else if (!this.done && (item in this.recipes || ITEMS.any in this.recipes)) {
            this.active = true;
            this.timer.set(this.delay);
            if (item in this.recipes) {
                sceneManager.player.setItem(null);
                this.input = item;
            }
            else {
                this.input = ITEMS.any;
            }
            if (this.activeParticles) {
                this.createParticles(true);
            }
        }
    }

    createParticles(active = false) {
        if (this.particles !== null) return;
        if (active) {
            let pos = vec2(this.progressBar.pos);
            pos.y -= 1;
            this.particles = new ParticleEmitter(
                pos, 0, 0, 0, 10, 0.5, undefined, new Color(1, 0.973, 0.141, 1),
                new Color(0.933, 1, 0.439, 1), new Color(0.702, 0, 0, 0), new Color(1, 0, 0, 0),
                0.5, 0.25, 0.5, 0.025, 0.05, 1, 1, 0, 3.14, 0.1, 0.2, 0, 0, 1
            );
        }
        else {
            this.particles = new ParticleEmitter(
                vec2(this.progressBar.pos), 0, 0, 0, 3, 3.14, undefined, new Color(0.62, 1, 0.663, 1),
                new Color(0.525, 0.996, 0.604, 1), new Color(0, 1, 0.118, 0), new Color(0, 1, 0.118, 0),
                0.5, 0.25, 0.5, 0.025, 0.05, 1, 1, 0, 3.14, 0.1, 0.2, 0, 0, 1
            );
        }
    }

    destroyParticles() {
        if (this.particles === null) return;
        this.particles.destroy();
        this.particles = null;
    }

    update() {
        if (this.timer.elapsed()) {
            this.timer.unset();
            this.active = false;
            this.done = true;
            this.destroyParticles();
            this.createParticles();
        }
        this.progressBar.visible = this.active;
        if (this.active) {
            this.progressBar.adjustProgress(this.timer.getPercent());
        }
        this.progressBar.update();
    }

    render() {
        this.progressBar.render();
    }

    renderPost() {
        this.progressBar.renderPost();
    }
}

function initMinigames() {
    return {
        toaster : new TimerMinigame(vec2(14.5, 16), 5, { [ITEMS.bread] : ITEMS.toast }),
        coffee_machine : new TimerMinigame(vec2(7.5, 16), 5, { [ITEMS.any] : ITEMS.coffee }),
        stove_left : new TimerMinigame(
            vec2(8.5, 16),
            5,
            { 
                [ITEMS.raw_bacon] : ITEMS.bacon,
                [ITEMS.raw_egg] : ITEMS.egg,
            },
            true
        ),
        stove_right : new TimerMinigame(
            vec2(9.5, 16),
            5,
            { 
                [ITEMS.raw_bacon] : ITEMS.bacon,
                [ITEMS.raw_egg] : ITEMS.egg,
            },
            true
        ),
        sink : new TimerMinigame(vec2(13, 16), 1, { [ITEMS.ramen_raw] : ITEMS.ramen_water }),
        microwave : new TimerMinigame(
            vec2(15.5, 16),
            5,
            {
                [ITEMS.ramen_water] : ITEMS.ramen_cooked,
                [ITEMS.raw_burrito] : ITEMS.burrito,
            }
        ),
    }
}
