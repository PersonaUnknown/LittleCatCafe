class Player {
    constructor(pos, size, animator, speed)
    {
        this.pos = pos;
        this.size = size;
        this.animator = animator;
        this.speed = speed;
    }

    update()
    {
        // update object physics and position
        if (keyIsDown("KeyW")) {
            this.pos.y += timeDelta * this.speed;
            this.animator.setState("back");
        }
        if (keyIsDown("KeyA")) {
            this.pos.x -= timeDelta * this.speed;
            this.animator.setState("left");
        }
        if (keyIsDown("KeyS")) {
            this.pos.y -= timeDelta * this.speed;
            this.animator.setState("front");
        }
        if (keyIsDown("KeyD")) {
            this.pos.x += timeDelta * this.speed;
            this.animator.setState("right");
        }
    }

    render()
    {
        this.animator.render(this.pos, this.size);
    }

    renderPost() {

    }
}
