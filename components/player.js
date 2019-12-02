class Player {
    constructor(element) {
        this.element = element;
        this.playerPosition = [];
        this.playerPositionT = " 0 0 0 ";
        this.pushPosition = this.pushPosition.bind(this);
        window.setInterval(this.pushPosition, 200);
    }

    pushPosition() {
        this.playerPositionT = this.element.getAttribute('position');
    }

    removePostion() {
        this.playerPosition.shift()
    }
}
