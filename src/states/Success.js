class Success extends Phaser.State {

	controller() {
		this.game.input.keyboard.onPressCallback = function() {
			// nothing
		}
		
		setTimeout(function() {
			this.game.input.keyboard.onPressCallback = function() {
				this.game.state.start('Starting');
			}
		}.bind(this), 1000);
	}

	preload() {
		this.load.image('ship', 'assets/ship.png');
		this.load.image('rain', 'assets/rain.png');
		this.load.spritesheet('success', 'assets/success.png');
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

	create() {
		this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.game.scale.setUserScale(3, 3);
		this.game.renderer.renderSession.roundPixels = true;
		this.game.scale.refresh();
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

		this.game.stage.backgroundColor = "#ACCFEC";
		this.game.add.sprite(0, 0, 'success');
		this.ship = this.game.add.sprite(this.game.world.centerX, 105, 'ship');
		this.ship.anchor = new Phaser.Point(0.5, 0.5);

		this.makeRain();

		this.controller();
	}
}

export default Success;
