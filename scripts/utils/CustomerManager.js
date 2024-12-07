// Spawns customers and slowly accelerates the delay timer
class CustomerManager {
    constructor() {
        this.orderingCustomers = [];
        this.waitingCustomers = [];
        this.numOrderingCustomers = 0;
        this.numWaitingCustomers = 0;
        this.updateRate = 5;   
        this.timer = new Timer(this.updateRate);
        this.maxCustomers = 6;
        this.onScoreIncreaseCallback = null;
    }
    onCustomerOrder() {
        // Take customer's order and adjust queue position of remaining customers
        if (this.numOrderingCustomers <= 0 || this.orderingCustomers[0].pos.distance(vec2(8.5, 6.75)) > 0.1) {
            return;
        }
        this.orderingCustomers[0].takeOrder();
        const orderOffset = 6.75 - this.numWaitingCustomers;
        const travelPath = this.numWaitingCustomers === 0 ?
            [vec2(11.5, orderOffset)] :
            [
                vec2(10.5, 6.75),
                vec2(10.5, orderOffset),
                vec2(11.5, orderOffset)
            ]
        this.orderingCustomers[0].state = true;
        this.orderingCustomers[0].travel(travelPath);
        this.orderingCustomers[0].mood = CustomerMoods.NONE;
        this.orderingCustomers[0].setIndex(this.numWaitingCustomers);
        this.waitingCustomers.push(this.orderingCustomers[0]);
        this.orderingCustomers.shift();
        this.numOrderingCustomers--;
        this.numWaitingCustomers++;

        for (let i = 0; i< this.orderingCustomers.length; i++) {
            const customer = this.orderingCustomers[i];
            customer.travel([vec2(8.5, 6.75 - i)]);
            customer.setIndex(i);
        }
    }
    onCustomerOrderCheck() {
        const item = sceneManager.player.item;
        for (let i = 0; i < this.waitingCustomers.length; i++) {
            const customer = this.waitingCustomers[i];
            const order = ITEMS[customer.order];
            if (order === item) {
                // Remove that customer and then have that customer leave
                sceneManager.player.setItem(null);
                this.onScoreIncreaseCallback(1);
                this.onCustomerLeave(i, true);
                break;
            }
        }

    }
    onCustomerLeave(index, state=false) {
        // Move all the customers below the customer up one tile
        if (!state && this.numOrderingCustomers > 0) {
            this.orderingCustomers?.splice(index, 1);
            for (let i = index; i < this.orderingCustomers.length; i++) {
                this.orderingCustomers[i].travel([vec2(8.5, 6.75 - i)]);
                this.orderingCustomers[i].decrementIndex();
            }
    
            this.numOrderingCustomers--;
        } 
        if (state && this.numWaitingCustomers > 0) {
            this.waitingCustomers?.splice(index, 1);
            cafe.book?.removeTask(index);
            for (let i = index; i < this.waitingCustomers.length; i++) {
                this.waitingCustomers[i].travel([vec2(11.5, 6.75 - i)]);
                this.waitingCustomers[i].decrementIndex();
            }
    
            this.numWaitingCustomers--;
        }
    }
    spawnCustomer() {
        // TODO: Add functionality to decrease the timer slowly until it's like every 2 seconds or so
        this.timer.set(this.updateRate);
        const length = this.numOrderingCustomers;
        if (length >= this.maxCustomers) {
            return;
        }
        const yOffset = 6.75 - this.numOrderingCustomers;
        const newCustomer = new Customer(
            vec2(8.5, 0), 
            this.numOrderingCustomers, 
            (index, state) => {
                this.onCustomerLeave(index, state);
            }
        );
        this.numOrderingCustomers++; 
        newCustomer.travel([vec2(8.5, yOffset)]);
        this.orderingCustomers.push(newCustomer);
    }
    update() {
        if (this.timer.elapsed()) {
            this.spawnCustomer();
        }
        for (const customer of this.orderingCustomers) {
            customer.update();
        }
        for (const customer of this.waitingCustomers) {
            customer.update();
        }
    }
    render() {

    }
    renderPost() {
        for (const customer of this.orderingCustomers) {
            customer.renderPost();
        }
        for (const customer of this.waitingCustomers) {
            customer.renderPost();
        }
    }
}