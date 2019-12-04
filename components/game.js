let game = "";
let waitingForMove = "";
let creeperInterval = "";

window.onload = function () {
    game = new Game(document.querySelector("#creeper"), document.querySelector("#player"));
    let lava = document.querySelector("#lavaBlock");
    waitingForMove = setInterval(function () {
        if (game.player.playerPositionT !== 0) {
            game.startGame();
        }
    }, 500)
};

class Game {
    constructor(creeperEl, playerEl) {
        this.creeper = new Creeper(creeperEl);
        this.player = new Player(playerEl);
        this.moveCreeper = this.moveCreeper.bind(this)
        this.checkDistance = this.checkDistance.bind(this)
    }

    startGame() {
        clearInterval(waitingForMove);
        creeperInterval = window.setInterval(this.checkDistance, 500);
        loadStage("./first-stage.html", "#first-stage")
    }

    explodeCreeper() {
        this.creeper.startExplode(new Date().getTime() / 1000);
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
        teleportToHome();
        teleportCreeperToHome();
        game.creeper.exploded = false;
        game.player.playerAlive = true
        waitingForMove = setInterval(function () {
            if (game.player.playerPositionT !== 0) {
                game.startGame();
            }
        }, 500);
    }

    removeCreeper() {
        setTimeout(function () {
            game.creeper.element.parentNode.removeChild(game.creeper.element)
        }, 100)
    }
}

function EndGame(path = './assets/sounds/ouh(classique).mp3') {
    let ouh = new Audio(path);
    startingReloadingGame()
    ouh.play();
    game.creeper.exploseCount = 0;
    game.player.element.setAttribute("animation", 'property: rotation; to:' + "0 0 -45;dur: 100");
    //game.player.element.setAttribute("animation", 'property: opacity; to:' + "0;dur: 100");
    clearInterval(creeperInterval);
    this.removeAllEvent()
}

function startingReloadingGame() {
    setTimeout(game.resetWorld, 3000)
}

function removeAllEvent() {
    document.querySelector("#wrapper").removeEventListener('mousedown', movePlayer);
    document.querySelector("#wrapper").removeEventListener('mouseup', stopPlayer);
    moving = false;
}

async function deleteStages() {
    return new Promise(function (resolve, reject) {
        let stages = document.querySelectorAll("#first-stage,#second-stage,#third-stage");
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

function teleportToHome() {
    game.player.element.setAttribute("animation", 'property: rotation; to:' + "0 0 0;dur: 1");
    game.player.element.setAttribute("position", '0 1 0');
    game.player.element.parentNode.setAttribute("position", "0 1 0");
    game.player.playerPositionT = 0;
    document.querySelector("#wrapper").addEventListener('mousedown', movePlayer);
    document.querySelector("#wrapper").addEventListener('mouseup', stopPlayer);
}

function teleportCreeperToHome() {
    game.creeper.resetExplodeCount()
    game.creeper.element.setAttribute("animation", 'property: rotation; to:' + "0 180 0");
    game.creeper.element.setAttribute("position", '0 0 15')
    game.creeper.element.setAttribute("animation", 'property: position; to:' + '0 0 15;dur: 2000')
}
