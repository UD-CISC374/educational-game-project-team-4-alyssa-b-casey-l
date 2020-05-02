export default class Instructions extends Phaser.Scene {
    public instructions: any;

    constructor(handle) {
        super(handle);
      }

      preload(){
          this.load.image("instructions", "assets/images/instructions.png");
      }

      create(){
          this.instructions = this.add.image(600,600,"instructions");
      }
}