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
        }
        if (keyIsDown("KeyA")) {
            this.pos.x -= timeDelta * this.speed;
        }
        if (keyIsDown("KeyS")) {
            this.pos.y -= timeDelta * this.speed;
        }
        if (keyIsDown("KeyD")) {
            this.pos.x += timeDelta * this.speed;
        }
    }

    render()
    {
        this.animator.render(this.pos, this.size);
    }

    renderPost() {

    }
}
