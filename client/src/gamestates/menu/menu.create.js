function create(){

    // fps debugging
    this.game.time.advancedTiming = true;

    // CTA text
    const text = this.game.add.text(
        this.game.width / 2,
        this.game.height / 2,
        "Choose a level!\n1 2 3 4 5 6 \nOr press a key to generate!",
        { font: "24px Courier", fill: "#ffffff", align: "center" }
    );

    text.anchor.set(0.5);

    this.game.input.keyboard.onDownCallback = (e) => {
        // if pressed key is number (space is empty string which evaluates true)
        if(!isNaN(e.key) && /[^\s]/.test(e.key)){
            fetch('/level/' + e.key, {
                method: 'GET'
            }).then((response) => {
                return response.json();
            }).then((levelConfig) => {
                this.game.state.start('Play', true, true, levelConfig);
                this.game.input.keyboard.onDownCallback = null;
            });
        } else {
            this.game.state.start('Play', true, true, undefined);
            this.game.input.keyboard.onDownCallback = null;
        }
    };


    console.log('[PHASER][Menu][Create]');
};

module.exports = create;
