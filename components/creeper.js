class Creeper {
    constructor(element) {
        this.element = element;
        this.move = this.move.bind(this);
        this.getNextCreeperPosition = this.getNextCreeperPosition.bind(this);
    }

    move(playerPath) {
        this.element.setAttribute("position", this.getNextCreeperPosition(playerPath))
    }

    getNextCreeperPosition(playerPath) {
        let creeperPath = this.element.getAttribute("position");
        if (playerPath.x > creeperPath.x && playerPath.x - creeperPath.x > 1) {
            creeperPath.x += 1
        } else if ( playerPath.x - creeperPath.x < -1) {
            creeperPath.x -= 1
        }
        console.log(playerPath.x - creeperPath.x)
        if (playerPath.z > creeperPath.z && playerPath.z - creeperPath.z > 1) {
            creeperPath.z += 1
        } else if (playerPath.z < creeperPath.z && playerPath.z - creeperPath.z < -1) {
            creeperPath.z -= 1
        }
        return creeperPath
    }
}
