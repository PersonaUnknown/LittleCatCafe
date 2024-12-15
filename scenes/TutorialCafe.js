class TutorialCafe extends Cafe {
    constructor() {
        super();
        const tutorialCustomerManager = new TutorialCustomerManager();
        this.objects[0] = tutorialCustomerManager;
        this.customerManager = tutorialCustomerManager;
        this.customerManager.cafe = this;
        this.customerManager.onScoreIncreaseCallback = (value) => { this.addScore(value); }
    }
}