class Player {
    constructor(element) {
        this.element = element;
        this.playerPosition = [];
        this.playerPositionT = " 0 0 0 ";
        this.pushPosition = this.pushPosition.bind(this);
        window.setInterval(this.pushPosition, 200);
        this.element.addEventListener('collide', function (e) {
            checkLava(e);
            checkFirstCheckPoint(e);
        })
    }

    pushPosition() {
        this.playerPositionT = this.element.getAttribute('position');
    }

    removePostion() {
        this.playerPosition.shift()
    }

}

function checkLava(e) {
    if (e.detail.body.el.getAttribute("id") === "lavaBlock") {
        EndGame();
    }
}

function checkFirstCheckPoint(e) {
    if (e.detail.body.el.getAttribute('id') === "end-stage-one") {
        removeFirstStage()
        // generateSecondStage()
    }
}



