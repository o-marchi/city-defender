class GameOver extends Phaser.State {

	scaleCanvas() {
		this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.game.scale.setUserScale(3, 3);
		this.game.renderer.renderSession.roundPixels = true;
		this.game.scale.refresh();
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
	}

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
		this.load.spritesheet('game-over', 'assets/game-over.png');
	}

	create() {
		this.scaleCanvas();
		this.controller();

		this.game.stage.backgroundColor = "#000";

		this.game.add.sprite(0, 0, 'game-over');
	}
}

export default GameOver;
