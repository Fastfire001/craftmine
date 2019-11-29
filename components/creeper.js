class Creeper {
    constructor(element) {
        this.element = element;
        this.move = this.move.bind(this);
        this.getPositionString = this.getPositionString.bind(this)
    }

    move(playerPath) {
        this.element.setAttribute("position", this.getPositionString(0))
    }

    getPositionString(int) {
        return " 0 0 0 "
    }
}
