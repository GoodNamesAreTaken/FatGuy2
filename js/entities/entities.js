game.EPS = 0.001;
game.movingPlatforms = 0;
game.bullets = 0;

game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {

        settings.image = 'player';
        settings.spritewidth = 50;
        settings.type = 'player';
        this.parent(x, y, settings);
        this.updateColRect(0, 50, 25, 50);

        this.renderable.addAnimation('side', [0, 1, 2, 3]);
        this.renderable.addAnimation('down', [4, 5, 6, 7]);
        this.renderable.addAnimation('up', [8, 9, 10, 11]);

        this._performed = {};
        this._stops = false;
    },

    update: function() {

        if (me.input.isKeyPressed('restart')) {
            game.restartLevel();
            return;
        }
        if (game.movingPlatforms === 0 && game.bullets === 0) {
            if (this._isStopped()) {
                this._onKeyOnce('left', function() {
                    this.flipX(true);
                    this.renderable.setCurrentAnimation('side');
                    this.vel.x = -2;
                });

                this._onKeyOnce('right', function() {
                    this.flipX(false);
                    this.renderable.setCurrentAnimation('side');
                    this.vel.x = 2;
                });

                this._onKeyOnce('up', function() {
                    this.renderable.setCurrentAnimation('up');
                    this.vel.y = -2;
                });

                this._onKeyOnce('down', function() {
                    this.renderable.setCurrentAnimation('down');
                    this.vel.y = 2;
                });

                this._onKeyOnce('shoot', this._shoot);
            } else {
                this._onKeyOnce('stop', this._stop);
            }
        }
 
        this.updateMovement();

        if (Math.abs(this.vel.y) > game.EPS) {
            me.game.world.sort(true);
        }

        if (this.collideType('finish')) {
            game.resetHUD();
            me.audio.play('teleport');
            me.levelDirector.nextLevel();
        }

        var res = this.collideType('moving_block');
        if (res) {
            this.collidable = false;
            this.pos.sub(res);
        } else {
            this.collidable = true;
        }
 
        me.game.sort();
        if (this.vel.x !== 0 || this.vel.y !== 0 || this._stops) {
            this.parent();

            if (this.vel.y > 0) {
            }
            return true;
        }

        return false;
    },

    _isStopped: function() {
        return Math.abs(this.vel.x) < game.EPS && Math.abs(this.vel.y) < game.EPS && !this._stops;
    },

    _onKeyOnce: function(action, fn) {
        if (me.input.isKeyPressed(action) && !this._performed[action]) {
            fn.call(this);
            this._performed[action] = true;
            me.state.current().HUD.disableButton(action);
        }
    },

    _shoot: function() {
        me.audio.play('shot');
        ['up', 'down', 'left', 'right'].forEach(function(dir) {
            var bullet = new game.Bullet(this, dir);
            me.game.add(bullet, this.z);
        }, this);
    },

    _stop: function() {
        var floor = me.game.currentLevel.getLayerByName('floor'),
            to;

        if (this.vel.x > game.EPS) {
            to = {
                x: floor.getTile(this.collisionBox.right, this.pos.y).pos.x,
                y: this.pos.y
            };
        } else if (this.vel.x < -game.EPS) {
            to = {
                x: floor.getTile(this.collisionBox.left, this.pos.y).pos.x,
                y: this.pos.y
            };
        } else if (this.vel.y > game.EPS) {
            to = {
                x: this.pos.x,
                y: floor.getTile(this.pos.x, this.collisionBox.bottom).pos.y - 25
            };
        } else if (this.vel.y < -game.EPS) {
            to = {
                x: this.pos.x,
                y: floor.getTile(this.pos.x, this.collisionBox.top).pos.y - 25
            };
        }

        var dx = this.pos.x - to.x,
            dy = this.pos.y - to.y,
            l = Math.sqrt(dx*dx + dy*dy);

        this._stops = true;
        new me.Tween(this.pos).to(to, l / 120 * 1000).onComplete(function() {
            this._stops = false;
        }.bind(this)).start();

        this.vel.x = this.vel.y = 0;
    }
});

game.BULLET_TYPE = 10;

game.Bullet = me.ObjectEntity.extend({
    init: function(player, direction) {
        this.parent(player.left + player.width / 2,
            player.top + player.height / 2,
            {
                image: 'bullet',
                type: game.BULLET_TYPE,
                spritewidth: 15,
                spriteheight: 15
            }
        );
        this.collidable = false;
        game.bullets++;

        this._direction = direction;

        if (direction === 'up') {
            this.pos.y = player.top;
            this.vel.y = -15;
        }

        if (direction === 'down') {
            this.pos.y = player.bottom;
            this.vel.y = 15;
        }

        if (direction === 'left') {
            this.pos.x = player.left;
            this.vel.x = -15;
        }

        if (direction === 'right') {
            this.pos.x = player.right;
            this.vel.x = 15;
        }
    },

    update: function() {
        this.updateMovement();

        var res = this.collideType('generator');
        if (res && res.type === 'generator') {
            this._die();
            res.obj.explode();
        }

        var tile = me.game.collisionMap.getTile(this.pos.x, this.pos.y);
        if (this.alive && tile && !this._isWater(tile)) {
            this._die();
        }

        return true;
    },

    _die: function() {
        this.collidable = false;
        this.alive = false;
        me.game.remove(this);
        game.bullets--;
    },

    _isWater: function(tile) {
        return !!tile.tileset.TileProperties[tile.tileId].water;
    }
});

game.Finish = me.ObjectEntity.extend({

    init: function(x, y,settings) {
        settings.type = 'finish';
        this.parent(x, y, settings);
        this.updateColRect(15, 20, 15, 20);
    }

});

game.Generator = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = 'generator';
        settings.type = 'generator';
        settings.spritewidth = 50;
        this.parent(x, y, settings);
        this.updateColRect(0, 50, 25, 50);
        this._activate = settings.activate;
        this.renderable.setAnimationFrame(1);
    },

    update: function() {

        return true;
    },

    explode: function() {
        this.renderable.setAnimationFrame(0);
        me.game.getEntityByProp('objectId', this._activate).forEach(function(activeObject) {
            activeObject.activate();
        });
    }
});

game.ActiveObject = me.ObjectEntity.extend({

    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.objectId = settings.id;
    },

    activate: function() {
        throw new Error('activate is not implemented');
    }
});


game.CLOSED_TRAP_TILE = 12;
game.Trap = game.ActiveObject.extend({
    activate: function() {
        var collisions = me.game.collisionMap,
            floor = me.game.currentLevel.getLayerByName('floor'),
            tile = collisions.getTile(this.pos.x, this.pos.y);

        collisions.clearTile(tile.col, tile.row);
        
        floor.setTile(tile.col, tile.row, game.CLOSED_TRAP_TILE);
    }
});

game.MovingBlock = game.ActiveObject.extend({
    init: function(x, y, settings) {
        settings.image = 'moving_block';
        settings.type = 'moving_block';
        this.parent(x, y, settings);
        this.updateColRect(0, 50, 25, 50);
        this._direction = settings.direction;
        this._offset = settings.offset * 1;
    },

    activate: function() {
        var collisions = me.game.collisionMap,
            tile = collisions.getTile(this.pos.x, this.pos.y + 25),
            dest = this._getDest(tile);

        this._moving = true;
        if (game.movingPlatforms === 0) {
            me.audio.play('crate_move');
        }
        console.log(tile);
        console.log(dest);
        game.movingPlatforms++;
        new me.Tween(this.pos).to({
            x: dest.col * me.game.currentLevel.tilewidth,
            y: dest.row * me.game.currentLevel.tileheight - 25
        }, 1000)
        .onComplete(function() {
            collisions.clearTile(tile.col, tile.row);
            collisions.setTile(dest.col, dest.row, collisions.tileset.firstgid);
            game.movingPlatforms--;
            this._moving = false;
        }.bind(this))
        .start();
    },

    update: function() {
        return this._moving;
    },

    _getDest: function(tile) {
        if (this._direction === 'up') {
            return {row: tile.row - this._offset, col: tile.col};
        } else if (this._direction === 'down') {
            return {row: tile.row + this._offset, col: tile.col};
        } else if (this._direction === 'left') {
            return {row: tile.row, col: tile.col - this._offset};
        } else {
            return {row: tile.row, col: tile.col + this._offset};
        }
    }
});

