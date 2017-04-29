import levelGenerator from '../../services/levelGenerator/index';

function init(levelConfig){
    console.log('[PHASER][Component][Init]', levelConfig);
    this.levelConfig = levelConfig || levelGenerator.create();
};

export default init;
