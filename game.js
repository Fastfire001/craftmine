let game = "";
window.onload = function () {
    game = new Game(document.querySelector("#creeper"), document.querySelector("#player"));
    game.startGame();
};

class Game {
    constructor(creeperEl, playerEl) {
        this.creeper = new Creeper(creeperEl);
        this.player = new Player(playerEl);
        this.moveCreeper = this.moveCreeper.bind(this)
    }

    startGame() {
        var intervalID = window.setInterval(this.moveCreeper, 2000);
    }

    moveCreeper() {
        this.creeper.move(this.player.playerPosition).then(()=>{
        })
    }
}
