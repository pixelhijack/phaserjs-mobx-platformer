import Human from '../../components/Human';
import AI from '../../components/AI';
import creatureConfig from '../../components/creatureconfig';

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
    this.player = new Human(this.game, 200, 200, 'pre2atlas', creatureConfig.man);

    // [ENEMY]
    this.enemy = new AI(this.game, 400, 200, 'pre2atlas', creatureConfig.dino);
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
