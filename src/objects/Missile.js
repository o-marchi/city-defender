import SkyEntity from 'objects/SkyEntity';

class Missile extends SkyEntity {

	constructor(game, grid, stripe, velocity) {

		super(game, grid, {
			sprite: 'missile',
			stripe: (stripe || stripe === 0) ? stripe : grid.randomStripe(),
			velocity: velocity
		});

		this.emitter = this.game.add.emitter(0, 0, 100);
		this.emitter.makeParticles('particle');
		this.emitter.gravity = 50;
	}

	preUpdate() {
		this.descend();
	}

	explode() {
		this.emitter.x = this.x;
		this.emitter.y = this.y;

		this.emitter.start(true, 10000, null, 20);
	}
}

export default Missile;