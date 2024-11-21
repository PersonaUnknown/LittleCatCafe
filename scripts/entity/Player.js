class Player extends EngineObject {
    constructor(pos, size, animator, speed, interactables)
    {
        super(pos, size, animator.getFrame(), 0, undefined, 0);
        this.animator = animator;
        this.speed = speed;
        this.interactables = interactables;
    }

    update()
    {
        if (keyIsDown("KeyW")) {
            this.velocity.x = 0;
            this.velocity.y = (this.speed * timeDelta);
            this.animator.setState("back");
        }
        else if (keyIsDown("KeyA")) {
            this.velocity.x = -(this.speed * timeDelta);
            this.velocity.y = 0;
            this.animator.setState("left");
        }
        else if (keyIsDown("KeyS")) {
            this.velocity.x = 0;
            this.velocity.y = -(this.speed * timeDelta);
            this.animator.setState("front");
        }
        else if (keyIsDown("KeyD")) {
            this.velocity.x = (this.speed * timeDelta);
            this.velocity.y = 0;
            this.animator.setState("right");
        }
        else {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }

        super.update();

        if (keyWasPressed("KeyE")) {
            for (const i of this.interactables) {
                if (i.isWithin(this.pos)) {
                    i.run();
                    break;
                }
            }
        }
    }

    render()
    {
        this.tileInfo = this.animator.getFrame();
        super.render();
    }

    renderPost() {

    }
}
