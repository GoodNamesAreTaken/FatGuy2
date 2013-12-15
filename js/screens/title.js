game.SplashScreen = me.ScreenObject.extend({

    init: function(image, nextState) {
        this.image = image;
        this.nextState = nextState;
        this.parent(true);
        this._startGame = this._startGame.bind(this);
    },
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
        this.splash = me.loader.getImage(this.image);
        window.addEventListener('keydown', this._startGame, false);
	},

    draw: function(context) {
        context.drawImage(this.splash, 0, 0);
    },

    _startGame: function() {
        me.state.change(this.nextState);
    },

	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
        window.removeEventListener('keydown', this._startGame);
	}
});

game.TitleScreen = game.SplashScreen.extend({

    init: function() {
        this.parent('splash', game.BREIFING_STATE);
    },

    onResetEvent: function() {
        this.parent();
        this.anykey = me.loader.getImage('anykey');
        this.lastUpdate = 0;
        this.drawAnyKey = true;
        me.audio.playTrack("007");
    },

    draw: function(context) {
        this.parent(context);
        if (this.drawAnyKey) {
            context.drawImage(this.anykey, 93, 390);
        }
    },
    
    update: function() {
        this.lastUpdate += me.timer.tick;
        if (this.lastUpdate > 20) {
            this.lastUpdate = 0;
            this.drawAnyKey = !this.drawAnyKey;
            return true;
        }
    },
});
