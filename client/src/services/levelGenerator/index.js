import LevelBuilder from './levelBuilder';
import levelConfig from './models/levelConfig';

const levelGenerator = {
    create(){
        const levelBuilder = new LevelBuilder(levelConfig);
        return levelBuilder
            .createLayers(200, 100)
            .build();
    }
};

export default levelGenerator;
