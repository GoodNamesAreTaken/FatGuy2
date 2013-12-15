game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
    {name: 'walls', type: 'image', src: 'data/img/walls.png'},
    {name: 'floor', type: 'image', src: 'data/img/floor.png'},
    {name: 'player', type: 'image', src: 'data/img/player.png'},
    {name: 'bullet', type: 'image', src: 'data/img/bullet.png'},
    {name: 'generator', type: 'image', src: 'data/img/generator.png'},
    {name: 'moving_block', type: 'image', src: 'data/img/moving_block.png'},
    {name: 'buttons', type: 'image', src: 'data/img/buttons.png'},
    {name: 'splash', type: 'image', src: 'data/img/splash.png'},
    {name: 'splash2', type: 'image', src: 'data/img/splash2.png'},
    {name: 'splash3', type: 'image', src: 'data/img/splash3.png'},
    {name: 'anykey', type: 'image', src: 'data/img/anykey.png'},
    {name: 'fan', type: 'image', src: 'data/img/fan.png'},

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
    {name: '0', type: 'tmx', src: 'data/map/0.tmx'},
    {name: '1', type: 'tmx', src: 'data/map/1.tmx'},
    {name: '2', type: 'tmx', src: 'data/map/2.tmx'},
    {name: '3', type: 'tmx', src: 'data/map/3.tmx'},
    {name: '4', type: 'tmx', src: 'data/map/4.tmx'},
    {name: '5', type: 'tmx', src: 'data/map/5.tmx'},
    {name: '6', type: 'tmx', src: 'data/map/6.tmx'},
    {name: '8', type: 'tmx', src: 'data/map/8.tmx'},
    {name: '9', type: 'tmx', src: 'data/map/9.tmx'},
    {name: '10', type: 'tmx', src: 'data/map/10.tmx'},
    {name: '11', type: 'tmx', src: 'data/map/11.tmx'},
    {name: '12', type: 'tmx', src: 'data/map/12.tmx'},
    {name: '13', type: 'tmx', src: 'data/map/13.tmx'},
    {name: '14', type: 'tmx', src: 'data/map/14.tmx'},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
	 */	
    {name: "007", type: 'audio', src: 'data/bgm/', channel: 1},

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
	 */
    {name: "crate_move", type: 'audio', src: 'data/sfx/', channel: 2},
    {name: "shot", type: 'audio', src: 'data/sfx/', channel: 2},
    {name: "teleport", type: 'audio', src: 'data/sfx/', channel: 2},
    {name: "gate", type: 'audio', src: 'data/sfx/', channel: 2}
];
