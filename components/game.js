let game = "";
window.onload = function () {
    game = new Game(document.querySelector("#creeper"), document.querySelector("#player"));
    let lava = document.querySelector("#lavaBlock");
    game.startGame();
};
let creeperInterval = "";

class Game {
    constructor(creeperEl, playerEl) {
        this.creeper = new Creeper(creeperEl);
        this.player = new Player(playerEl);
        this.moveCreeper = this.moveCreeper.bind(this)
        this.checkDistance = this.checkDistance.bind(this)
    }

    startGame() {
        creeperInterval = window.setInterval(this.checkDistance, 500);
    }

    explodeCreeper() {
        this.creeper.startExplode(new Date().getTime() / 1000, creeperInterval);
    }

    checkDistance() {
        let check = 0;
        let creeperPath = this.creeper.element.getAttribute("position");
        if (-3 < this.player.playerPositionT.x - creeperPath.x && this.player.playerPositionT.x - creeperPath.x < 3) {
            check++;
        }
        if (-3 < this.player.playerPositionT.z - creeperPath.z && this.player.playerPositionT.z - creeperPath.z < 3) {
            check++;
        }
        if (check === 2) {
            this.explodeCreeper();

        } else {
            this.moveCreeper();
        }
    }

    moveCreeper() {
        this.creeper.resetExplodeCount();
        this.creeper.move(this.player.playerPositionT)
    }
}

function EndGame(path = './assets/sounds/ouh(classique).mp3') {
    let ouh = new Audio(path);
    ouh.play();
    document.querySelector("#dead").style.display = "block";
    removeAllEvent()
}

function removeAllEvent() {
    document.querySelector("#wrapper").removeEventListener('mousedown', movePlayer);
    document.querySelector("#wrapper").removeEventListener('mouseup', stopPlayer);
    moving = false;
}
