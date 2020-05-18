import Instructions from '../objects/instructions';

export default class TitleScene extends Phaser.Scene {
    private count: number;
    private instruction: any;
    private instructions: Instructions;
    private instr;

    constructor() {
      super({ key: 'TitleScene' });
      this.count = 0;
    }

    preload(){
        this.load.image("title", "assets/images/orderScene.png");
        this.load.image("instructions", "assets/images/instructions.PNG");
        this.load.bitmapFont("pixelFont", "assets/font/font.png","assets/font/font.xml");
    }

    create(){
        let title = this.add.image(0,0,"title");
        title.setOrigin(0,0);
        var text = this.add.bitmapText(1020,100, "pixelFont", "ORDER UP!", 150);
        text.tint = 0x000000;

        //play button
        let play = this.add.bitmapText(1185, 300, "pixelFont", "PLAY", 100);
        play.tint = 0x000000;
        play.setInteractive({ useHandCursor: true });
        play.on('pointerdown', () => this.clickButton());
        

        //instructions button
        this.instruction = this.add.bitmapText(1050, 500, "pixelFont", "HOW TO PLAY", 100);
        this.instruction.tint = 0x000000;
        this.instruction.setInteractive({ useHandCursor: true });
        this.instruction.on('pointerdown', () => this.instructionButton());
        
    }

    clickButton() {
        this.instr.destroy(true);
        this.scene.switch('PreloadScene');
    }

    instructionButton(){
        //this.instr = this.add.image(1300,800,"instructions");
        this.instr = this.add.bitmapText(680, 750, "pixelFont", "Read the customer's order in the top left corner,\nthen click and drag food into the delivery bag!", 80);
        this.instr.tint = 0x000000;
    }

}