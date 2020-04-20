class Starting extends Phaser.State {

	scaleCanvas() {
		this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.game.scale.setUserScale(3, 3);
		this.game.renderer.renderSession.roundPixels = true;
		this.game.scale.refresh();
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
	}

	controller() {
		this.game.input.keyboard.onPressCallback = function() {
			this.game.state.start('GameState');
		}
	}

	preload() {
		this.load.spritesheet('title', 'assets/title.png');
	}

	create() {
		this.scaleCanvas();
		this.controller();

		this.game.camera.shake(0.0001, 100);

		this.game.stage.backgroundColor = "#1C3651";

		this.game.add.sprite(0, 0, 'title');
	}
}

export default Starting;
