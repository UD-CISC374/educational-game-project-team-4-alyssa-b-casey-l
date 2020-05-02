//"realDScene line 1-18"
import food from '../objects/food';
import bag from '../objects/bag';
import player from '../objects/player';
import { GameObjects } from 'phaser';

export default class DeliveryScene extends Phaser.Scene {
  private deliveryscene;
  private orderscene;
  private tomato: any;
  //real DScene linesn28-36
  private chicken: any;
  private chickenText;
  private bacon: any;
  private baconText;
  private ham: any;
  private hamText;
  //real DScene lines 43-47
  private bag: bag;
  private player;
  private paper: any;
  private orderDone: any;
  private food: any;
  private foods: Array<any>;
  private foodList: any;
  private foodDragged: any;
  private order: any;
  cursorKeys;
  score: number;
  scoreLabel;
  conveyor;

  constructor() {
    super({ key: 'DeliveryScene' });
  }

  create() {
    this.score = 0;
    this.scoreLabel = this.add.bitmapText(500, 500, "pixelFont", "SCORE", 200);
  
    //realDScene 70/71

    this.orderscene = this.add.image(0,0, "orderscene");
    this.orderscene.setOrigin(0,0);
    this.conveyor = this.add.tileSprite(0, 750, 2600, 200, "conveyor");
    this.conveyor.setOrigin(0,0);
    //Non-Food Related Items
    this.bag = this.physics.add.image(this.scale.width / 2 - 900, this.scale.height / 2 + 400, "bag");
    this.paper = this.add.image(200, 200, "paper");
    this.add.text(50,50, "Order:",{fill:"#000000", fontSize:"40px"});
    this.add.text(60,100, "chicken (pollo)",{fill:"#000000", fontSize:"35px"});
    this.add.text(60,150, "ham (jamon)",{fill:"#000000", fontSize:"35px"});
    this.add.text(60,200, "bacon (tocino)",{fill:"#000000", fontSize:"35px"});
    this.add.text(60, 400, "drag the food into the bag to fulfill the order", {fill:"#000000", fontSize:"40px"})

    this.foods = ["chicken", "ham", "bacon"];
    this.foodList = [];

    //Vegetables
    this.tomato = this.physics.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "tomato").setInteractive();
    this.input.setDraggable(this.tomato);

    this.input.dragDistanceThreshold = 16;
    
    this.input.on('dragstart', function (pointer, gameObject) {
      //change this color later
      gameObject.setTint(0xff0000);
  });
  
  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  this.input.on('dragend', function (pointer, gameObject) {
    gameObject.clearTint();
  });

    //realDscene 109-118

    //Meats
    this.chicken = this.physics.add.image(this.scale.width / 50, this.scale.height / 2, "chicken").setInteractive();
    this.input.setDraggable(this.chicken);
    this.chickenText = this.add.text(0, 0, "chicken", {fill:"#000000", fontSize:"35px"});
    this.bacon = this.physics.add.image(this.scale.width / 3 - 300, this.scale.height / 2, "bacon").setInteractive();
    this.input.setDraggable(this.bacon);
    this.baconText = this.add.text(0, 0, "bacon", {fill:"#000000", fontSize:"35px"});
    this.ham = this.physics.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "ham").setInteractive();
    this.input.setDraggable(this.ham);
    this.hamText = this.add.text(0, 0, "ham", {fill:"#000000", fontSize:"35px"});
  


    //realDScene line 133-141

    
    this.orderDone = false;


    let foodarr = [["chicken", "pollo", "poulet"], ["bacon", "tocino", "bacon"], ["ham", "jamon", "jambon"]];
    let randFood = foodarr[Math.floor(Math.random() * 3)];


    //Dictionary Code
    //realDscene 151-159


    this.player = this.physics.add.sprite(this.scale.width / 2-8, this.scale.height - 64, "player");
    this.player.setScale(10);
    this.player.setGravity(0,0);
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player", {start: 0, end: 1}),
      frameRate: 20,
      repeat: -1
    });


    // collisions that make everything freeze for some raison
    this.physics.add.collider(this.bag, this.tomato, this.eatFood, function(bag, tomato){
      tomato.destroy(true);
    }, this);

    this.physics.add.overlap(this.bag, this.tomato, this.eatFood, undefined, this);

    this.physics.add.collider(this.bag, this.chicken, this.eatFood, function(bag, chicken){
      chicken.destroy(true);
    }, this);

    this.physics.add.overlap(this.bag, this.chicken, this.eatFood, undefined, this);

    this.physics.add.collider(this.bag, this.ham, this.eatFood, function(bag, ham){
      ham.destroy(true);
    }, this);

    this.physics.add.overlap(this.bag, this.ham, this.eatFood, undefined, this);

    this.physics.add.collider(this.bag, this.bacon, this.eatFood, function(bag, bacon){
      bacon.destroy(true);
    }, this);

    this.physics.add.overlap(this.bag, this.bacon, this.eatFood, undefined, this);

    //testing a random function for order sheet
    var orderFood = ["chicken", "ham", "tomato", "bacon"];
    var orderFoodText = [this.chickenText, this.baconText, this.hamText];
    Phaser.Math.RND.pick(orderFoodText);
  }
  
  iterFoodText(arr, size){
    var x:number = 60;
    for(var i:number = 0; i < size; i++){
      var y:number = 100;
      //recommending sort list randomly, iteratively placing first ith elements onto the screen
      // google how to shuffle a list in phaser/js
      var temp:number = Phaser.Math.RND.pick(arr.length);
      //how to overwrite x and y coordinates of the text?
      delete arr[temp];
      y += 50;
    }
  }

  moveChicken(chicken, speed){
    chicken.x += speed;
    if(chicken.x > 2500){
      this.resetChicken(chicken);
    }
  }
  resetChicken(chicken){
    chicken.x = 0;
    let randomY = Phaser.Math.Between(800, 900);
    chicken.y = randomY;
  }
  moveHam(ham, speed){
    ham.x += speed;
    if(ham.x > 2500){
      this.resetHam(ham);
    }
  }
  resetHam(ham){
    ham.x = 0;
    let randomY = Phaser.Math.Between(800, 900);
    ham.y = randomY;
  }
  moveBacon(bacon, speed){
    bacon.x += speed;
    if(bacon.x > 2500){
      this.resetChicken(bacon);
    }
  }

  resetBacon(bacon){
    bacon.x = 0;
    let randomY = Phaser.Math.Between(800, 900);
    bacon.y = randomY;
  }


  eatFood(bag, food){
    food.destroy(true); 
    //this.beamSound.play();
    this.score += 5;
    this.scoreLabel.text = "SCORE " + this.score;
  }

  startDrag(pointer, targets){
    this.input.off('pointerdown', this.startDrag, this);
    this.foodDragged=targets[0];
    this.input.on('pointermove', this.doDrag, this);
    this.input.on('pointerup', this.stopDrag, this);

  }
  doDrag(pointer){
    this.foodDragged.x=pointer.x;
    this.foodDragged.y=pointer.y;
  }

  stopDrag(){
    this.input.on('pointerdown', this.startDrag, this);
    this.input.off('pointermove', this.doDrag, this);
    this.input.off('pointerup', this.stopDrag, this);
  }


  update() {
    this.moveChicken(this.chicken, 4);
    this.moveHam(this.ham, 4);
    this.moveBacon(this.bacon, 4);
    this.movePlayerManager();
    this.conveyor.tilePositionX -= 5;
  }

  movePlayerManager(){
    
    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-300);
    }
    else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(300);
    }
    else this.player.setVelocityX(0);

    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-300);
    }
    else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(300);
    }
    else this.player.setVelocityY(0);
  }


}
