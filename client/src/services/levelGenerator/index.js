import LevelBuilder from './levelBuilder';
import levelConfig from './models/levelConfig';

const levelGenerator = {
    create(){
        const levelBuilder = new LevelBuilder(levelConfig);
        return levelBuilder
            .createLayers(34 * 3, 23 * 10)
            .randomBackground()
            .build();
    }
};

export default levelGenerator;
