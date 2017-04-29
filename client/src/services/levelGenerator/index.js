import LevelBuilder from './levelBuilder';
import levelConfig from './models/levelConfig';

const levelGenerator = {
    create(width = 16 * 34 * 3, height = 16 * 23, entryPoint = { x: 20, y: 50 }){
        const levelBuilder = new LevelBuilder(levelConfig);
        return levelBuilder
            .createLayers()
            .build();
    }
};

export default levelGenerator;
