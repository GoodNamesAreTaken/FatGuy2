
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0
	},
	
	
	// Run on page load.
	"onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", 450, 450, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }
        
        me.debug.renderHitBox = true;
        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

	// Run on game resources loaded.
	"loaded" : function () {
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(game.BREIFING_STATE, new game.SplashScreen('splash2', me.state.PLAY));
		me.state.set(me.state.GAME_END, new game.SplashScreen('splash3', me.state.MENU));
        me.entityPool.add("player", game.PlayerEntity);
        me.entityPool.add("finish", game.Finish);
        me.entityPool.add("generator", game.Generator);
        me.entityPool.add("trap", game.Trap);
        me.entityPool.add("moving_block", game.MovingBlock);
        me.entityPool.add("vent", game.Fan);
        me.sys.gravity = 0;
        me.game.world.sortOn = "y";

        me.input.bindKey(me.input.KEY.LEFT, "left", true);
        me.input.bindKey(me.input.KEY.RIGHT, "right", true);
        me.input.bindKey(me.input.KEY.UP, "up", true);
        me.input.bindKey(me.input.KEY.DOWN, "down", true);
        me.input.bindKey(me.input.KEY.CTRL, "shoot", true);
        me.input.bindKey(me.input.KEY.SPACE, "stop", true);
        me.input.bindKey(me.input.KEY.R, "restart", true);

		// Start the game.
		me.state.change(me.state.MENU);
	},

    resetHUD: function() {
        me.state.current().HUD.enableAllButtons();
    },

    restartLevel: function() {
        this.resetHUD();
        me.levelDirector.reloadLevel();
    },

    BREIFING_STATE: me.state.USER + 1
};
