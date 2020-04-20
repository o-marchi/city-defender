import GameState from 'states/GameState';
import Starting from 'states/Starting';
import GameOver from 'states/GameOver';
import Success from 'states/Success';

class Game extends Phaser.Game {

	constructor() {
		super({
			type: Phaser.AUTO,
			width: 162,
			height: 182,
			backgroundColor: '#000'
		});

		this.state.add('Starting', Starting, false);
		this.state.add('GameState', GameState, false);
		this.state.add('GameOver', GameOver, false);
		this.state.add('Success', Success, false);
		this.state.start('Success');
		// this.state.start('Starting');
		// this.state.start('GameState');
	}

}

new Game();

