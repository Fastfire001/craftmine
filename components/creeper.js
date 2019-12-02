class Creeper {
    constructor(element) {
        this.element = element;
        this.exploseCount = 0;
        this.shh = new Audio('./assets/sounds/shhh.mp3');
        this.ouh = './assets/sounds/ouh.mp3';
        this.move = this.move.bind(this);
        this.concatPositionAttributes = this.concatPositionAttributes.bind(this);
        this.concatRotationAttributes = this.concatRotationAttributes.bind(this);
        //this.getNextCreeperPosition = this.getNextCreeperPosition.bind(this);
    }

    move(playerPath) {
        this.element.setAttribute("animation-mixer", "clip: ArmatureAction.001");
        this.element.setAttribute("animation", "to", this.concatPositionAttributes(playerPath))
    }
    resetExplodeCount() {
        this.exploseCount = 0;
    }

    startExplode(Date, creeperInterval) {
        this.element.setAttribute("animation", "to", this.concatPositionAttributes(this.element.getAttribute("position")))
        this.element.setAttribute("animation-mixer", "clip: Static Pose")
        if (this.exploseCount === 0) {
            this.exploseCount = Date;
            this.shh.play();
        } else {
            if (Date - this.exploseCount > 3) {
                this.exploooooooooooooooooosion();
                clearInterval(creeperInterval);
            }
        }
    }

    exploooooooooooooooooosion() {
        EndGame(this.ouh);
    }

    concatPositionAttributes(positions) {
        return positions.x + " " + positions.y + " " + positions.z;
    }

    concatRotationAttributes(positions) {
        return positions.x + " " + (180 + positions.x) + " " + positions.z;
    }
}
