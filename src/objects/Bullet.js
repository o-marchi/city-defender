import SkyEntity from 'objects/SkyEntity';

class Bullet extends SkyEntity {

	constructor(game, grid, stripe) {

		super(game, grid, {
			sprite: 'bullet',
			stripe,
			velocity: 1.7,
			y: 100
		});
	}

	preUpdate() {
		this.ascend();
	}
}

export default Bullet;