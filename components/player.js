class Player {
    constructor(element) {
        this.element = element;
        this.playerPosition = [];
        this.playerPositionT = " 0 0 0 ";
        this.playerAlive = true;
        this.container = this.element.parentNode;
        this.pushPosition = this.pushPosition.bind(this);
        window.setInterval(this.pushPosition, 200);
        this.container.addEventListener('collide', function (e) {
            checkLava(this.container);
            checkFirstCheckPoint(this.container);
            checkSecondCheckPoint(this.container);
        })
    }

    pushPosition() {
        this.playerPositionT = this.element.parentNode.getAttribute('position');
    }

    removePostion() {
        this.playerPosition.shift()
    }

}

function checkLava(e) {
    if (e.detail.body.el.getAttribute("id") === "lavaBlock") {
        if (game.player.playerAlive === true) {
            EndGame();
            game.player.playerAlive = false
        }
    }
}

async function checkFirstCheckPoint(e) {
    if (e.detail.body.el.getAttribute('id') === "end-stage-one") {
        deleteStages().then((data) => {
            setTimeout(function () {
                loadStage("./second-stage.html", "#second-stage")
            }, 100)
        })
    }
}

async function checkSecondCheckPoint(e) {
    if (e.detail.body.el.getAttribute('class') === "check-point-stage-2") {
        deleteStages().then((data) => {
            setTimeout(function () {
                loadStage("./third-stage.html", "#third-stage")
            }, 100)
        })
    }
}




