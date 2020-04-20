import Grid from 'objects/Grid';
import Ship from 'objects/Ship';
import Missile from 'objects/Missile';
import City from 'objects/City';
import Bullet from 'objects/Bullet';


class GameState extends Phaser.State {

	controller() {
		this.game.input.keyboard.onPressCallback = function() {
			// nothing
		}

		const left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		const right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		const space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		right.onDown.add(function() {
			if (!this.shipDestroyed) {
				this.ship.moveRight();
			}
		}, this);

		left.onDown.add(function() {
			if (!this.shipDestroyed) {
				this.ship.moveLeft();
			}
		}, this);

		space.onDown.add(function() {
			if (!this.shipDestroyed) {
				this.shoot();
			}
		}, this);
	}

	preload() {
		this.load.image('ship', 'assets/ship.png');
		this.load.image('bullet', 'assets/bullet.png');
		this.load.image('missile', 'assets/missile.png');
		this.load.image('particle', 'assets/particle.png');
		this.load.image('rain', 'assets/rain.png');
		this.load.image('stripe', 'assets/stripe.png');
		this.load.spritesheet('city-0', 'assets/city/0.png', 18, 38, 2);
		this.load.spritesheet('city-1', 'assets/city/1.png', 18, 38, 2);
		this.load.spritesheet('city-2', 'assets/city/2.png', 18, 52, 2);
		this.load.spritesheet('city-3', 'assets/city/3.png', 18, 46, 2);
		this.load.spritesheet('city-4', 'assets/city/4.png', 18, 46, 2);
		this.load.spritesheet('city-5', 'assets/city/5.png', 18, 42, 2);
		this.load.spritesheet('city-6', 'assets/city/6.png', 18, 48, 2);
		this.load.spritesheet('city-7', 'assets/city/7.png', 18, 42, 2);
		this.load.spritesheet('city-8', 'assets/city/8.png', 18, 46, 2);
	}

	create() {
		this.game.stage.backgroundColor = "#ACCFEC";
		this.grid = new Grid(this.game);
		this.city = new City(this.game, this.grid);
		this.ship = this.add.existing(new Ship(this.game, this.grid, 4));
		this.missiles = this.game.add.group();
		this.bullets = this.game.add.group();
		this.victory = false;
		this.stopSpawn = false;

		this.shipDestroyed = false;

		this.missileDelay = 10;
		this.missileTimer = 0;
		this.missileIndex = 0;

		this.missilesPattern = [
			{ stripe: 0 },
			{ stripe: 1 },
			{ stripe: 2 },
			{ stripe: 3 },
			{ stripe: 4 },
			{ stripe: 5, delay: 100 },
			{ stripe: 8 },
			{ stripe: 7 },
			{ stripe: 6 },
			{ stripe: 5 },
			{ stripe: 4 },
			{ stripe: 3, delay: 100 },
			{ stripe: 0 },
			{ stripe: 1 },
			{ stripe: 2 },
			{ stripe: 3 },
			{ stripe: 4 },
			{ stripe: 5, delay: 100 },
			{ stripe: 8 },
			{ stripe: 7 },
			{ stripe: 6 },
			{ stripe: 5 },
			{ stripe: 4 },
			{ stripe: 3, delay: 100 },

			{ stripe: 4, velocity: 0.7 },
			{ stripe: 3, velocity: 0.7, delay: 1 },
			{ stripe: 5, velocity: 0.7 },
			{ stripe: 2, velocity: 0.7, delay: 1 },
			{ stripe: 6, velocity: 0.7, delay: 80 },

			{ stripe: 2, velocity: 0.8 },
			{ stripe: 1, velocity: 0.8, delay: 1 },
			{ stripe: 3, velocity: 0.8, delay: 70 },

			{ stripe: 0 },
			{ stripe: 1 },
			{ stripe: 2 },
			{ stripe: 3 },
			{ stripe: 4 },
			{ stripe: 5, delay: 100 },
			{ stripe: 8 },
			{ stripe: 7 },
			{ stripe: 6 },
			{ stripe: 5 },
			{ stripe: 4 },
			{ stripe: 3, delay: 100 },

			{ stripe: 2, velocity: 0.8 },
			{ stripe: 1, velocity: 0.8, delay: 1 },
			{ stripe: 3, velocity: 0.8, delay: 50 },

			{ stripe: 5, velocity: 0.8 },
			{ stripe: 4, velocity: 0.8, delay: 1 },
			{ stripe: 6, velocity: 0.8, delay: 150 },

			{ stripe: 0 },
			{ stripe: 1 },
			{ stripe: 2 },
			{ stripe: 3 },
			{ stripe: 4 },
			{ stripe: 5 },
			{ stripe: 6 },
			{ stripe: 7 },
			{ stripe: 8 },
			{ stripe: 7 },
			{ stripe: 6 },
			{ stripe: 5 },
			{ stripe: 4 },
			{ stripe: 3 },
			{ stripe: 2 },
			{ stripe: 1 },
			{ stripe: 0, delay: 100 },


			{ stripe: 4, velocity: 0.5 },
			{ stripe: 3, velocity: 0.5, delay: 1 },
			{ stripe: 5, velocity: 0.5 },
			{ stripe: 2, velocity: 0.5, delay: 1 },
			{ stripe: 6, velocity: 0.5 },
			{ stripe: 1, velocity: 0.5, delay: 1 },
			{ stripe: 7, velocity: 0.5 },
			{ stripe: 0, velocity: 0.5, delay: 1 },
			{ stripe: 8, velocity: 0.5, delay: 180 },

			{ stripe: 4, delay: 15 },
			{ stripe: 3, delay: 15 },
			{ stripe: 4, delay: 15 },
			{ stripe: 5, delay: 15 },
			{ stripe: 6, delay: 15 },
			{ stripe: 5, delay: 15 },
			{ stripe: 4, delay: 15 },
			{ stripe: 3, delay: 15 },
			{ stripe: 2, delay: 15 },
			{ stripe: 3, delay: 15 },
			{ stripe: 2, delay: 180 },

			{ stripe: 7, delay: 15 },
			{ stripe: 8, delay: 15 },
			{ stripe: 7, delay: 15 },
			{ stripe: 6, delay: 15 },
			{ stripe: 5, delay: 15 },
			{ stripe: 4, delay: 15 },
			{ stripe: 5, delay: 15 },
			{ stripe: 6, delay: 15 },
			{ stripe: 5, delay: 15 },
			{ stripe: 4, delay: 15 },
			{ stripe: 3, delay: 15 },
			{ stripe: 2, delay: 15 },
			{ stripe: 3, delay: 15 },
			{ stripe: 2, delay: 15 },
			{ stripe: 1, delay: 15 },
			{ stripe: 0, delay: 150 },

			{ stripe: 0, velocity: 0.5, delay: 1 },
			{ stripe: 1, velocity: 0.5, delay: 1 },
			{ stripe: 2, velocity: 0.5, delay: 1 },
			{ stripe: 3, velocity: 0.5, delay: 1 },
			{ stripe: 4, velocity: 0.5, delay: 1 },
			{ stripe: 5, velocity: 0.5, delay: 1 },
			{ stripe: 6, velocity: 0.5, delay: 1 },
			{ stripe: 7, velocity: 0.5, delay: 1 },
			{ stripe: 8, velocity: 0.5, delay: 50 },

			{ stripe: 0, velocity: 0.5, delay: 1 },
			{ stripe: 1, velocity: 0.5, delay: 1 },
			{ stripe: 2, velocity: 0.5, delay: 1 },
			{ stripe: 3, velocity: 0.5, delay: 1 },
			{ stripe: 4, velocity: 0.5, delay: 1 },
			{ stripe: 5, velocity: 0.5, delay: 1 },
			{ stripe: 6, velocity: 0.5, delay: 1 },
			{ stripe: 7, velocity: 0.5, delay: 1 },
			{ stripe: 8, velocity: 0.5, delay: 50 },

			{ stripe: 0, velocity: 0.5, delay: 1 },
			{ stripe: 1, velocity: 0.5, delay: 1 },
			{ stripe: 2, velocity: 0.5, delay: 1 },
			{ stripe: 3, velocity: 0.5, delay: 1 },
			{ stripe: 4, velocity: 0.5, delay: 1 },
			{ stripe: 5, velocity: 0.5, delay: 1 },
			{ stripe: 6, velocity: 0.5, delay: 1 },
			{ stripe: 7, velocity: 0.5, delay: 1 },
			{ stripe: 8, velocity: 0.5, delay: 350 },

			{ stripe: 4, velocity: 1.3 }
		];

		this.missilesPattern.forEach(p => {
			p.delay = p.delay || this.missileDelay;
			p.velocity = p.velocity || 1;
		});

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.controller();
		this.makeRain();
	}

	createMissile() {
		if (this.stopSpawn) { return; }

		const missilePattern = this.missilesPattern[this.missileIndex];

		if (missilePattern) {
			this.missileDelay = missilePattern.delay;
			this.missiles.add(
				new Missile(
					this.game,
					this.grid,
					missilePattern.stripe,
					missilePattern.velocity
				)
			);
			this.missileIndex++;
		} else {
			this.stopSpawn = true;
		}
	}

	shake() { this.game.camera.shake(0.005, 500); }
	shakeBigTime() { this.game.camera.shake(0.02, 1000); }

	shoot() {
		this.bullets.add(new Bullet(this.game, this.grid, this.ship.stripe));
	}

	makeRain() {

		this.rain = this.game.add.emitter(this.game.world.centerX, -50, 500);
		this.rain.width = this.game.world.width;
		this.rain.makeParticles('rain');

		this.rain.minParticleScale = 1;
		this.rain.maxParticleScale = 1;
	
		this.rain.setYSpeed(10, 11);
		this.rain.setXSpeed(-5, 5);
	
		this.rain.minRotation = 0;
		this.rain.maxRotation = 0;
	
		this.rain.start(false, 1600, 5, 0);

	}

	update() {
		const cityDestroyed = this.city.parts.every(p => p.destroyed);

		if (cityDestroyed) {
			this.shakeBigTime();
			setTimeout(function() {
				this.game.state.start('GameOver');
			}.bind(this), 1000);
		}

		if (this.stopSpawn && !this.missiles.length && !cityDestroyed && !this.shipDestroyed) {
			this.game.camera.fade(0xACCFEC, 1000);
			this.victory = true;
		}

		if (this.victory) {
			setTimeout(function() {
				this.game.state.start('Success');
			}.bind(this), 1000);
		}

		this.missileTimer++;

		if (this.missileTimer >= this.missileDelay) {
			this.createMissile();
			this.missileTimer = 0;
		}

		this.missiles.children.forEach(m => {
			if (this.city.heights[m.stripe] >= (this.game.height - m.y)) {
				m.explode();
				m.destroy();
				this.shake();
				this.city.damage(m.stripe);
			}


			this.bullets.children.forEach(b => {
				if (
					b.stripe === m.stripe &&
					(m.y + m.height >= b.y && b.y + b.height > m.y)
				) {
					m.explode();
					m.destroy();
					b.destroy();
				}
			});


			if (
				this.ship.stripe === m.stripe &&
				(m.y + m.height >= this.ship.y &&
				 this.ship.y + this.ship.height > m.y)
			) {
				m.explode();
				m.destroy();
				this.shakeBigTime();

				this.shipDestroyed = true;

				setTimeout(function() {
					this.game.state.start('GameOver');
				}.bind(this), 1000);
			}
		});
	}
}

export default GameState;
