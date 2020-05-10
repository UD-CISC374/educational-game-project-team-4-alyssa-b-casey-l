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
        this.load.image("instructions", "assets/images/instructions.png");
        this.load.bitmapFont("pixelFont", "assets/font/font.png","assets/font/font.xml");
    }

    create(){
        let title = this.add.image(0,0,"title");
        title.setOrigin(0,0);
        var text = this.add.text(100,100, 'Welcome To Our Game!',{fill:"#000000", fontSize:"100px"});

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



        // idk where this goes or if it works but maybe for the instruction popup
        /* function createModals() {
            reg.modal.createModal({
                      type:"modal1",
                      includeBackground: true,
                      modalCloseOnInput: true,
                      itemsArr: [
                          {
                      type: "graphics",
                      graphicColor: "0xffffff",
                      graphicWidth: 300,
                      graphicHeight: 300,
                      graphicRadius: 40
                  }, {
                      type: "text",
                      content: "The white behind me\nis a [Phaser.Graphic]",
                      fontFamily: "Luckiest Guy",
                      fontSize: 22,
                      color: "0x1e1e1e",
                      offsetY: -50
                  }
                      ]
                  }); 
          }
          
          function showModal1(){
            reg.modal.showModal("modal1");
          }
          
          var GameState = function(game) {
          };
          
          GameState.prototype.create = function() {
            reg.modal = new gameModal(game);
            createModals();
            var m1 = this.game.add.button(30, 50, "m1", showModal1);
          };
          
          var game = new Phaser.Game(750, 380, Phaser.CANVAS, 'game');
          game.state.add('game', GameState, true);
          <script src="http://netgfx.com/trunk/games/phaser_modals/phaser.min.js"></script>
          <script src="http://netgfx.com/trunk/games/phaser_modals/modal.js"></script>
          <div style="font-family:'Luckiest Guy',cursive;visibility:hidden;opacity:0;position:fixed;">&nbsp;</div> */

    }

    clickButton() {
        this.instruction.destroy(); // trying to destroy the image once you hit play; doesn't work yet
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