let game = "";
let image = "";
window.onload = function () {
    game = new Game(document.querySelector("#creeper"), document.querySelector("#player"));
    let lava = document.querySelector("#lavaBlock");
    game.startGame();
    image = document.querySelector("#dead");
    image.addEventListener('click', game.resetWorld);
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
        //  creeperInterval = window.setInterval(this.checkDistance, 500);
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

    resetWorld() {
        removeOverlay();
        teleportToHome();
        teleportCreeperToHome();
        game.startGame()
    }
}

function EndGame(path = './assets/sounds/ouh(classique).mp3') {
    let ouh = new Audio(path);
    ouh.play();
    game.player.element.setAttribute("animation", 'property: rotation; to:' + "0 0 -15;dur: 100");
    addOverlay();
    this.removeAllEvent()
}

function removeAllEvent() {
    document.querySelector("#wrapper").removeEventListener('mousedown', movePlayer);
    document.querySelector("#wrapper").removeEventListener('mouseup', stopPlayer);
    moving = false;
}

async function deleteStages() {
    return new Promise(function (resolve, reject) {
        let stages = document.querySelectorAll("#first-stage,#second-stage");
        for (let i = 0; i < stages.length; i++) {
            replaceChild(stages[i])
        }
        resolve('done');
    });
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
        document.querySelector(target).innerHTML = data
    };
    request.send();
}

function removeOverlay() {
    image.style.display = "none";
}

function addOverlay() {
    image.style.display = "block";
}

function teleportToHome() {
    let player = document.querySelector("#player");
    player.setAttribute("animation", 'property: rotation; to:' + "0 0 0;dur: 1");
    player.setAttribute("position", '0 0 0');
    document.querySelector("#wrapper").addEventListener('mousedown', movePlayer);
    document.querySelector("#wrapper").addEventListener('mouseup', stopPlayer);
}

function teleportCreeperToHome() {
    game.creeper.resetExplodeCount()
    game.creeper.element.setAttribute("animation", 'property: rotation; to:' + "0 180 0");
    game.creeper.element.setAttribute("position", '0 0 -1')
    game.creeper.element.setAttribute("animation", 'property: position; to:' + '0 3 -5;;dur: 2000')
}
