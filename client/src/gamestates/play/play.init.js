import levelGenerator from '../../services/levelGenerator';

function init(levelConfig){
    console.log('[PHASER][Component][Init]', levelConfig);
    this.levelConfig = levelConfig || levelGenerator.create();
};

export default init;
