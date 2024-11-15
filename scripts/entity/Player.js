class Player extends EngineObject {
    constructor(pos, size, tileInfo, angle)
    {
        super(pos, size, tileInfo, angle);
        // setup object
        this.speed = 8;
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
        super.update(); 
    }

    render()
    {
        // draw object as a sprite
        super.render();
    }
    renderPost() {
        
    }
}
