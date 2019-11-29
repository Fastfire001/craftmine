class Player {
    constructor(element) {
        this.element = element;
        this.playerPosition = [];
        this.pushPosition = this.pushPosition.bind(this);
        window.setInterval(this.pushPosition, 200);
    }

    pushPosition() {
        this.playerPosition.push(this.element.getAttribute('position'));
    }
    removePostion(){
        this.playerPosition.shift()
    }
}
