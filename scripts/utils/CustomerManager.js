// Spawns customers and slowly accelerates the delay timer
class CustomerManager {
    constructor() {
        this.orderingCustomers = [];
        this.waitingCustomers = [];
        this.leavingCustomers = [];
        this.numOrderingCustomers = 0;
        this.numWaitingCustomers = 0;
        this.updateRate = 10;   
        this.timer = new Timer(2.5); // Initial customer spawns much faster
        this.maxCustomers = 6;
        this.onScoreIncreaseCallback = null;
        this.elapsedTime = 0;
        this.numSatisfiedCustomers = 0;
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
        const mood = this.orderingCustomers[0].mood;
        switch (mood) {
            case CustomerMoods.HAPPY:
            case CustomerMoods.NONE:
            case CustomerMoods.WAITING:
                this.orderingCustomers[0].mood = CustomerMoods.NONE;
                break;
            case CustomerMoods.ANNOYED:
                this.orderingCustomers[0].mood = CustomerMoods.HAPPY;
                break;
            case CustomerMoods.IMPATIENT:
                this.orderingCustomers[0].mood = CustomerMoods.WAITING;
                break;
        }

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
        const item = ITEM_NAMES[sceneManager.player.item];
        for (let i = 0; i < this.waitingCustomers.length; i++) {
            const customer = this.waitingCustomers[i];
            const order = customer.order;
            if (order === item) {
                // Remove that customer and then have that customer leave
                sceneManager.player.setItem(null);
                correct.play();
                customer.mood = CustomerMoods.SATISFIED;
                const patienceFactor = clamp(1 - customer.timeWaited / customer.patience); 
                const score = Math.round(100 * patienceFactor);
                this.onScoreIncreaseCallback(score);
                this.onCustomerLeave(i, true, true);
                this.numSatisfiedCustomers++;
                if (this.numSatisfiedCustomers % 5 === 0) {
                    this.numSatisfiedCustomers = 0;
                    this.cafe?.lifeManager.incrementLife();
                }
                break;
            }
        }

    }
    onCustomerExit(index) {
        this.leavingCustomers?.splice(index, 1);
        for (let i = index; i < this.leavingCustomers.length; i++) {
            this.leavingCustomers[i].decrementIndex();
        }
    }
    onCustomerLeave(index, state=false, satisfied=false) {
        // Move all the customers below the customer up one tile
        if (!state && this.numOrderingCustomers > 0) {
            this.leavingCustomers.push(this.orderingCustomers[index]);
            const leavingPos = this.orderingCustomers[index].pos;
            this.orderingCustomers[index].travel([
                vec2(7.5, leavingPos.y),
                vec2(7.5, 0)
            ]);
            const length = this.leavingCustomers.length - 1;
            this.leavingCustomers[length].setIndex(length);
            this.orderingCustomers?.splice(index, 1);
            for (let i = index; i < this.orderingCustomers.length; i++) {
                this.orderingCustomers[i].travel([vec2(8.5, 6.75 - i)]);
                this.orderingCustomers[i].decrementIndex();
            }
    
            this.numOrderingCustomers--;

            // Decrease life count
            this.numSatisfiedCustomers = 0;
            this.cafe?.lifeManager.onScoreDecrease();
        } 
        if (state && this.numWaitingCustomers > 0) {
            this.leavingCustomers.push(this.waitingCustomers[index]);
            const leavingPos = this.waitingCustomers[index].pos;
            this.waitingCustomers[index].travel([
                vec2(12.5, leavingPos.y),
                vec2(12.5, 0)
            ]);
            const length = this.leavingCustomers.length - 1;
            this.leavingCustomers[length].setIndex(length);
            this.waitingCustomers?.splice(index, 1);
            this.cafe?.book?.removeTask(index);
            for (let i = index; i < this.waitingCustomers.length; i++) {
                this.waitingCustomers[i].travel([vec2(11.5, 6.75 - i)]);
                this.waitingCustomers[i].decrementIndex();
            }
    
            this.numWaitingCustomers--;

            if (!satisfied) {
                this.numSatisfiedCustomers = 0;
                this.cafe?.lifeManager.onScoreDecrease();
            }
        }
    }
    spawnCustomer() {
        const x = this.elapsedTime / 60;
        const difficultyFactor = 3 + 0.5 * x + Math.sin(2 * x);
        const newUpdateRate =  15 / (0.3 * difficultyFactor);
        console.log(newUpdateRate);
        this.timer.set(newUpdateRate);
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
            },
            (index) => {
                this.onCustomerExit(index);
            },
            this.cafe
        );
        this.numOrderingCustomers++; 
        newCustomer.travel([vec2(8.5, yOffset)]);
        this.orderingCustomers.push(newCustomer);
        coin.play();
    }
    update() {
        this.elapsedTime += timeDelta;
        if (this.timer.elapsed()) {
            this.spawnCustomer();
        }
        for (const customer of this.orderingCustomers) {
            customer.update();
        }
        for (const customer of this.waitingCustomers) {
            customer.update();
        }
        for (const customer of this.leavingCustomers) {
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
        for (const customer of this.leavingCustomers) {
            customer.renderPost();
        }
    }
}
class TutorialCustomerManager extends CustomerManager {
    constructor() {
        super();
    }
    spawnCustomer() {
        const x = this.elapsedTime / 60;
        const difficultyFactor = 3 + 0.5 * x + Math.sin(2 * x);
        const newUpdateRate =  10 / (0.3 * difficultyFactor);
        console.log(newUpdateRate);
        this.timer.set(newUpdateRate);
        const length = this.numOrderingCustomers;
        if (length >= this.maxCustomers) {
            return;
        }
        const yOffset = 6.75 - this.numOrderingCustomers;
        const newCustomer = new TutorialCustomer(
            vec2(8.5, 0), 
            this.numOrderingCustomers, 
            (index, state) => {
                this.onCustomerLeave(index, state);
            },
            (index) => {
                this.onCustomerExit(index);
            },
            this.cafe
        );
        this.numOrderingCustomers++; 
        newCustomer.travel([vec2(8.5, yOffset)]);
        this.orderingCustomers.push(newCustomer);
        coin.play();
    }
}