export default class Food extends Phaser.Physics.Arcade.Image {

    constructor(scene,x,y, flag) {
        
        super(scene, x, y, "body", flag);
        scene.add.existing(this);
        
        
    }

    update(){
        if(this.x < 0){
            this.destroy();
        }
    }
}