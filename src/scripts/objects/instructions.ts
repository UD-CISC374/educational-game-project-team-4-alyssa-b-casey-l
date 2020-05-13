export default class Instructions extends Phaser.Scene {
    public instructions: any;

    constructor(handle) {
        super(handle);
      }

      preload(){
          this.load.image("instructions", "assets/images/instructions.PNG");
      }

      create(){
          this.instructions = this.add.image(1000,800,"instructions");
          this.instructions.setScale(3);
      }
}