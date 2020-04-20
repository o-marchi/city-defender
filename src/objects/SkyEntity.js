class SkyEntity extends Phaser.Sprite {

	constructor(game, grid, config) {

        const properties = Object.assign({
            stripe: 0,
            sprite: 'ship',
            velocity: 0.02,
            y: -10,
        }, config);

        super(game, -50, properties.y, properties.sprite);

        game.physics.enable(this, Phaser.Physics.ARCADE);

        this.anchor = new Phaser.Point(0.5, 0.5);
		this.grid = grid;
        this.stripe = properties.stripe;
        this.vel = properties.velocity
        this.position.x = this.grid.stripe(this.stripe);
	}

	moveRight() {
		const stripe = this.stripe + 1;
		this.setStripe(stripe);
	}

	moveLeft() {
		const stripe = this.stripe - 1;
		this.setStripe(stripe);
    }
    
	setStripe(stripe) { 

        if (stripe < 0) {
            stripe = 0;
        }

        if (stripe > (this.grid.length - 1)) {
            stripe = (this.grid.length - 1)
        }

		this.stripe = stripe;
		this.position.x = this.grid.stripe(this.stripe);
    }
    
    descend() {
        this.position.y += this.vel;
    }

    ascend() {
        this.position.y -= this.vel;
    }
}

export default SkyEntity;