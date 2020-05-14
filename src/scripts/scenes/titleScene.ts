import Instructions from '../objects/instructions';

export default class TitleScene extends Phaser.Scene {
    private count: number;
    private instruction: any;

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
        var text = this.add.text(100,100, 'ORDER UP!',{fill:"#000000", fontSize:"100px"});

        //play button
        let play = this.add.bitmapText(300, 300, "pixelFont", "PLAY", 100);
        play.tint = 0x000000;
        play.setInteractive({ useHandCursor: true });
        play.on('pointerdown', () => this.clickButton());
        

        //instructions button
        this.instruction = this.add.bitmapText(500, 500, "pixelFont", "HOW TO PLAY", 100);
        this.instruction.tint = 0x000000;
        this.instruction.setInteractive({ useHandCursor: true });
        this.instruction.on('pointerdown', () => this.instructionButton());
        
    }

    //  deleteIns(instruction){
    //      instruction = this.instruction;
    //      instruction.destroy;
    //  }
    clickButton() {
        this.instruction.setVisible(false); // trying to destroy the image once you hit play; doesn't work yet
        this.scene.switch('PreloadScene');
    }

    instructionButton(){
        this.createWindow(Instructions);
    }

    createWindow (func){ //from http://labs.phaser.io/edit.html?src=src%5Cscenes%5Cdrag%20scenes%20demo.js
        var x = Phaser.Math.Between(400, 600);
        var y = Phaser.Math.Between(64, 128);

        var handle = 'window' + this.count++;

        var win = this.add.zone(x, y, 472, 74).setInteractive().setOrigin(0);

        var demo = new func(handle, win);

        this.input.setDraggable(win);

        win.on('drag', function (pointer, dragX, dragY) {

            x = dragX;
            y = dragY;

            demo.refresh()

        });

        this.scene.add(handle, demo, true);
    }
}