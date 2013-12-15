game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
        me.levelDirector.loadLevel("1");
		// reset the score
		game.data.score = 0;

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
        var layer = new me.ColorLayer('back', '#000000', -Infinity);
        layer.floating = true;
        me.game.world.addChild(layer);
		me.game.world.addChild(this.HUD);
        me.audio.playTrack("007");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
        me.audio.stopTrack();
	}
});
