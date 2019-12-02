class Creeper {
    constructor(element) {
        this.element = element;
        this.move = this.move.bind(this);
        this.concatPositionAttributes = this.concatPositionAttributes.bind(this);
        this.concatRotationAttributes = this.concatRotationAttributes.bind(this);
        //this.getNextCreeperPosition = this.getNextCreeperPosition.bind(this);
    }

    move(playerPath) {
        this.element.setAttribute("animation", "to", this.concatPositionAttributes(playerPath))
      //  this.element.setAttribute("rotation", this.concatRotationAttributes(playerPath));
        this.element.emit("startAnimation")
    }

    /*
        getNextCreeperPosition(playerPath) {
            let creeperPath = this.element.getAttribute("position");
            if (playerPath.x > creeperPath.x && playerPath.x - creeperPath.x > 1) {
                creeperPath.x += 1
            } else if (playerPath.x - creeperPath.x < -1) {
                creeperPath.x -= 1
            }
            console.log(playerPath.x - creeperPath.x)
            if (playerPath.z > creeperPath.z && playerPath.z - creeperPath.z > 1) {
                creeperPath.z += 1
            } else if (playerPath.z < creeperPath.z && playerPath.z - creeperPath.z < -1) {
                creeperPath.z -= 1
            }
            this.concatpositionAttributes(creeperPath);
            return creeperPath
        }*/

    explode() {
        console.log("dead");
    }

    concatPositionAttributes(positions) {
        return positions.x + " " + positions.y + " " + positions.z;

    }

    concatRotationAttributes(positions) {
        return positions.x + " " + (180 + positions.x) + " " + positions.z;
    }
}
