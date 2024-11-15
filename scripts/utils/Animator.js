class Animator {
    constructor (states, delay, activeState) {
        this.states = states;
        this.delay = delay;
        this.activeState = activeState;
        this.currAnimFrame = 0;
        this.timer = new Timer(delay);
    }

    render(pos, size) {
        if (this.timer.elapsed()) {
            this.currAnimFrame = (this.currAnimFrame + 1) % this.states[this.activeState].length;
            this.timer.set(this.delay);
        }
        drawTile(pos, size, this.states[this.activeState][this.currAnimFrame]);
    }
}
