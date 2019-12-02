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
        generateFirstStage()
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
    let scene = document.querySelector("#scene");
    let body = document.querySelector("body");
    body.removeChild(scene);
}


this.lastSensorX = 0;

try {
    this.sensor = new Magnetometer();
    if (this.sensor !== undefined) {
        this.sensor.start();
    }
    console.log("yo,",this.sensor)
} catch (err) {
    console.log("Magnetometer not supported. Make sure you configure chrome://flags/#enable-generic-sensor-extra-classes and deliver via HTTPS.");
}
// Check major differences on Magnetometer and identify this as a button-click

if (this.sensor !== undefined) {
    this.sensor.onreading = () => {
        var delta = this.sensor.x - this.lastSensorX;

        if (delta > 100) {
            // do whatever you want to do, in case the cardboard magnet has been "clicked"
        }
        this.lastSensorX = this.sensor.x;
    }

    this.sensor.onerror = event => console.log(event.error.name + " (Magnetometer): ", event.error.message);

}

function generateFirstStage() {
    let request = new XMLHttpRequest();
    request.open('GET', './first-stage.html', true);
    request.onload = function () {
        let data = (request.responseText);
        document.querySelector('#first-stage').innerHTML = data
    };
    request.send();
}

function removeFirstStage() {
    let firstStage = document.querySelector('#first-stage')
        setTimeout(function() {  
            firstStage.parentNode.removeChild(firstStage)
        }, 10);
}

function generateSecondStage() {
    let request = new XMLHttpRequest();
    request.open('GET', './second-stage.html', true);
    request.onload = function () {
        let data = (request.responseText);
        document.querySelector('#second-stage').innerHTML = data
    };
    request.send();
}
