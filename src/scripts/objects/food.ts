

export default class Food extends Phaser.Physics.Arcade.Image {
    //body: Phaser.Physics.Arcade.Body;

    constructor(scene,x,y) {
        
        super(scene, x, y, "body");
        scene.add.existing(this);
        
    }

    update(){
        if(this.x < 0){
            this.destroy();
        }
    }
}