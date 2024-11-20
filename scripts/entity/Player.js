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
        let dest = vec2(this.pos);
        if (keyIsDown("KeyW")) {
            dest.y += timeDelta * this.speed;
            this.animator.setState("back");
        }
        else if (keyIsDown("KeyA")) {
            dest.x -= timeDelta * this.speed;
            this.animator.setState("left");
        }
        else if (keyIsDown("KeyS")) {
            dest.y -= timeDelta * this.speed;
            this.animator.setState("front");
        }
        else if (keyIsDown("KeyD")) {
            dest.x += timeDelta * this.speed;
            this.animator.setState("right");
        }

        if (dest.y > 12 && dest.y < 14 && dest.x > 1 && dest.x < 19) {
            this.pos = dest;
        }
    }

    render()
    {
        this.animator.render(this.pos, this.size);
    }

    renderPost() {

    }
}
