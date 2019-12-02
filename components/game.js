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
        loadStage("./first-stage.html", "#first-stage")
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
    let player = document.querySelector("#player");
    player.setAttribute("animation", 'property: rotation; to:' + "0 0 -15;dur: 100");
    let image = document.querySelector("#dead")
    image.style.display = "block";
    removeAllEvent()
}

function removeAllEvent() {
    document.querySelector("#wrapper").removeEventListener('mousedown', movePlayer);
    document.querySelector("#wrapper").removeEventListener('mouseup', stopPlayer);
    moving = false;
}

async function deleteStages() {
    let stages = document.querySelectorAll("#first-stage,#second-stage");
    for (let i = 0; i < stages.length; i++) {
        replaceChild(stages[i])
    }
}

function replaceChild(e) {
    let entity = document.createElement("a-entity");
    entity.id = e.id;
    setTimeout(function () {
        e.parentNode.replaceChild(entity, e);
    }, 10);
}

function loadStage(url, target) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        let data = (request.responseText);
        console.log(document.querySelector("a-assets"))
        document.querySelector(target).innerHTML = data
    };
    request.send();
}

function resetWorld() {
    generateFirstStage();
}
