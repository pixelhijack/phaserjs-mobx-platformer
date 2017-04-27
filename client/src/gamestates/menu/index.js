import create from './menu.create';
//import update from './play.update';

class Menu {
    constructor() {
        this.keys = undefined;
    }
}

Menu.prototype.create = create;

module.exports = Menu;
