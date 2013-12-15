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

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
    {name: '1', type: 'tmx', src: 'data/map/1.tmx'},
    {name: '2', type: 'tmx', src: 'data/map/2.tmx'},
    {name: '3', type: 'tmx', src: 'data/map/3.tmx'},
    {name: '4', type: 'tmx', src: 'data/map/4.tmx'},
    {name: '5', type: 'tmx', src: 'data/map/5.tmx'},
    {name: '6', type: 'tmx', src: 'data/map/6.tmx'},
    {name: '7', type: 'tmx', src: 'data/map/7.tmx'},

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
    {name: "teleport", type: 'audio', src: 'data/sfx/', channel: 2}
];
