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

    if(this.levelConfig.maxHeight){
        this.game.scale.setGameSize(this.globalConfig.width, this.levelConfig.maxHeight);
    }

    // [SET LEVEL] fix background, resize
    this.level.backgroundLayer.fixedToCamera = this.levelConfig.fixedBackground;
    this.level.groundLayer.resizeWorld();

    this.gameState = mobx.observable({
        initialised: false,
        score: 0,
        playerAt: {
            x: undefined,
            y: undefined
        }
    });

    this.updateState = mobx.action((change) => {
        this.gameState = Object.assign(this.gameState, change);
    });

    mobx.observe(this.gameState, change => {
        console.log('[gameState] change', change, this.gameState);
    });

    this.updateState({ initialised: true });

    // [PLAYER]
    this.player = new Human(
        this.game,
        this.levelConfig.entryPoint.x,
        this.levelConfig.entryPoint.y,
        this.globalConfig.textureAtlasName,
        this.creatureConfig.man
    );

    // [ENEMIES]
    this.enemies = new Phaser.Group(this.game);
    this.levelConfig.enemies.forEach(this.creatureFactory.create);

    this.game.camera.follow(this.player);

    // bind keys
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.keys.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.keys.alt = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    this.keys.control = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    this.keys.shift = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    // items & platforms
    this.items.platforms = new Phaser.Group(this.game);

    // score text
    this.menu = this.game.add.text(
        this.globalConfig.width - 120,
        0,
        "Life: " + this.player.spriteState.life,
        { font: "24px Courier", fill: "#fff", align: "center" }
    );
    this.menu.fixedToCamera = true;
    mobx.observe(this.player.spriteState, change => {
        this.menu.setText("Life: " + this.player.spriteState.life);
    });
};

export default create;
