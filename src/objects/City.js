class City {

	constructor(game, grid) {
        this.game = game;
        this.grid = grid;
        this.parts = this.grid.stripes;
        this.heights = [ 38, 38, 52, 46, 46, 42, 48, 42, 46 ];

        this.grid.stripes.forEach(stripe => {
            this.parts[stripe] =
                this.game.add.sprite(
                    this.grid.stripe(stripe),
                    this.game.height,
                    'city-' + stripe
                );
            this.parts[stripe].anchor = new Phaser.Point(.5, 1);
            this.parts[stripe].animations.add('destroyed', [1]);
            this.parts[stripe].destroyed = false;
        });
    }

    damage(stripe) {
        this.parts[stripe].play('destroyed');
        this.parts[stripe].destroyed = true;
    }

}

export default City;