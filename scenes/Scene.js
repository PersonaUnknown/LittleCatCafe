class Scene {
    constructor(index, initObjects) {
        this.index = index;
        this.objects = initObjects;
    }
    addObject(object) {
        this.objects.push(object);
    }
    update() {
        for (const object of this.objects) {
            object.update();
        }
    }
    render() {
        for (const object of this.objects) {
            object.render();
        }
    }
    renderPost() {
        for (const object of this.objects) {
            object.renderPost();
        }
    }
    init() {}
    destroy() {}
}
