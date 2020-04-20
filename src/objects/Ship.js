import SkyEntity from 'objects/SkyEntity';

class Ship extends SkyEntity {

	constructor(game, grid, stripe) {

		super(game, grid, {
			sprite: 'ship',
			y: 100,
			stripe
		});

		this.lives = 3;
	}

	damage() {
		this.lives--;
	}
}

export default Ship;