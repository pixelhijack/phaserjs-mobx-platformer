import Human from '../../components/Human';
import AI from '../../components/AI';

function create(){
    console.log('[PHASER][Component][Create]');
    // fps debugging
    this.game.time.advancedTiming = true;

    // [SET LEVEL] set dimensions, start physic system
    this.game.world.setBounds(
        0,
        0,
        this.globalConfig.width * this.globalConfig.blocks,
        this.globalConfig.height
    );

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.levelLoader.createBackground('backgroundLayer');
    this.levelLoader.createTiles(
        this.levelConfig.tilemap, 
        this.levelConfig.tileset,
        this.levelConfig.tilesetImage
    );
    this.levelLoader.createLayers(this.levelConfig.layers);

    // [SET LEVEL] fix background, resize
    this.level.backgroundLayer.fixedToCamera = this.levelConfig.fixedBackground;
    this.level.groundLayer.resizeWorld();

    this.gameState = mobx.observable({
        initialised: false,
        score: 0
    });

    this.updateState = mobx.action((change) => {
        this.gameState = Object.assign(this.gameState, change);
    });

    mobx.observe(this.gameState, change => {
        console.log('[gameState] change', change, this.gameState);
    });

    this.updateState({ initialised: true });

    // [PLAYER]
    this.player = new Human(this.game, 200, 200, 'pre2atlas', {
        acceleration: 10,
        maxSpeed: 200,
        animations: [
          { name: 'move', frames: [11,'03','05',14,20], fps: 10, loop: false },
          { name: 'hit', frames: [22,24,28,31,34,22,24,28,31,34], fps: 10, loop: true },
          { name: 'stop', frames: [42,45,49,52], fps: 10, loop: false },
          { name: 'jump', frames: [16,41,47,50,50,50,50,50,50,50,50,13,50,13,50,13], fps: 10, loop: false },
          { name: 'idle', frames: [25,25,25,25,25,25,25,25,27,27,27,27,25,25,25,25,25,25,25,25,30,25,25,25,25,25,25,25,25,27,30,27,30,35,36,25,25,25,25,25,25,25,25,'07','07','07','07','02','02'], fps: 5, loop: true },
          { name: 'hurt', frames: [19], fps: 10, loop: true },
          { name: 'stun', frames: [19], fps: 10, loop: true },
          { name: 'die', frames: [19], fps: 10, loop: false },
          { name: 'spawn', frames: [11,'03','05',14,20], fps: 10, loop: false }
        ]
    });

    // [ENEMY]
    this.enemy = new AI(this.game, 400, 200, 'pre2atlas', {
      mass: 1.5,
      jumping: 300,
      maxSpeed: 50,
      acceleration: 5,
      animations: [
        { name: 'idle', frames: [360,360,360,360,360,360,360,367], fps: 5, loop: true },
        { name: 'move', frames: [360,361,364,367,369], fps: 10, loop: true },
        { name: 'jump', frames: [360,361,364,367,369], fps: 10, loop: true },
        { name: 'fall', frames: [369], fps: 10, loop: true },
        { name: 'die', frames: [371], fps: 10, loop: true },
        { name: 'spawn', frames: [360,361,364,367], fps: 10, loop: true }
      ]
    });
    this.enemy.body.velocity.x = Math.random() * (-10) - 10;

    this.game.camera.follow(this.player);

    // bind keys
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // score text
    this.menu = this.game.add.text(
        150,
        0,
        "Life: " + this.player.spriteState.life,
        { font: "24px Courier", fill: "#000", align: "center" }
    );
    mobx.observe(this.player.spriteState, change => {
        this.menu.setText("Life: " + this.player.spriteState.life);
    });
};

export default create;
