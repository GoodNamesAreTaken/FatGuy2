

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();
		
		// persistent across level change
        this.isPersistent = true;
		
		// non collidable
		this.collidable = false;

        this.floating = true;
		
		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";

        var x = 59;
        this._buttons = ['left', 'up', 'down', 'right', 'shoot', 'stop', 'restart'].reduce(function(hash, type) {
            var button = new game.HUD.ButtonItem(x, 405, type);
            this.addChild(button);
            x += button.width + 2;
            hash[type] = button;
            return hash;
        }.bind(this), {});
	},

    disableButton: function(button) {
        this._buttons[button].off();
    },

    enableAllButtons: function() {
        Object.keys(this._buttons).forEach(function(button) {
            this._buttons[button].on();
        }, this);
    }
});

game.HUD.ButtonItem = me.AnimationSheet.extend({
    _anims: {
        on: {
            'shoot': [0],
            'left': [1],
            'up': [2],
            'down': [3],
            'right': [4],
            'restart': [5],
            'stop': [3]
        },

        off: {
            'shoot': [8],
            'left': [9],
            'up': [10],
            'down': [11],
            'right': [12],
            'restart': [13],
            'stop': [7]
        }


    },

    init: function(x, y, type) {
        this.parent(x, y,
            me.loader.getImage('buttons'),
            type === 'stop' ? 80 : 40,
            40);

        this.addAnimation('on', this._anims.on[type]);
        this.addAnimation('off', this._anims.off[type]);
        this.on();
    },

    on: function() {
        this.setCurrentAnimation('on');
    },


    off: function() {
        this.setCurrentAnimation('off');
    }
});


/** 
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 
		
		// local copy of the global score
		this.score = -1;

		// make sure we use screen coordinates
		this.floating = true;
	},

	/**
	 * update function
	 */
	update : function () {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if (this.score !== game.data.score) {	
			this.score = game.data.score;
			return true;
		}
		return false;
	},

	/**
	 * draw the score
	 */
	draw : function (context) {
		// draw it baby !
	}

});
