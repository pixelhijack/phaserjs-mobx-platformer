import LevelBuilder from './levelBuilder';
import levelConfig from './models/levelConfig';

const levelGenerator = {
    create(){
        const levelBuilder = new LevelBuilder(levelConfig);
        return levelBuilder
            .createLayers(34 * 5, 23 * 2)
            .build();
    }
};

export default levelGenerator;
