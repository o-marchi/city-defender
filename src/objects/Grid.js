class Grid {

	constructor(game, length) {
        this.game = game;
        this.length = 9;
        this.graphics = this.game.add.graphics(0, 0);
        this._size = 18;
        this.height = this.game.scale.height;
        this.stripes = [...Array(this.length).keys()];

        this.draw();
    }
    
    draw() {
        this.stripes
            .filter(stripe => !(stripe % 2))
            .forEach(stripe => {
                const x = this._size * stripe;
                this.graphics.beginFill(0x000000, 0.04);
                this.graphics.drawRect(x, 0, this._size, this.height);
                this.graphics.endFill();
            });
    }

    size() {
        return this._size;
    }

    stripe(x) {
        return (this._size * x) + (this._size / 2);
    }

    randomStripe() {
        return Phaser.Math.between(0, this.length - 1);
    }

}

export default Grid;