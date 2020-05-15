export default class Instructions extends Phaser.Scene {
    public instructions: any;
    parent: any;

    constructor(handle,parent) {
        super(handle);
        this.parent = parent;
      }

      preload(){
          this.load.image("instructions", "assets/images/instructions.PNG");
      }

      create(){
          this.instructions = this.physics.add.image(1300,800,"instructions");
          this.instructions.setGravity(0);
          this.instructions.setScale(2);
      }

      refresh (){
        this.cameras.main.setPosition(this.parent.x, this.parent.y);

        this.scene.bringToTop();
     }

      /* instrDestroy(){
          if(this.TitleScene.isVisible == true){

          }
      } */
}