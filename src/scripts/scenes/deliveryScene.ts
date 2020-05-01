import food from '../objects/food';
import bag from '../objects/bag';
import player from '../objects/player';
import { GameObjects } from 'phaser';

export default class DeliveryScene extends Phaser.Scene {
  private deliveryscene;
  private orderscene;
  private tomato: food;
  private carrot: food;
  private lettuce: food;
  private apple: food;
  private banana: food;
  private orange: food;
  private pineapple: food;
  private strawberry: food;
  private watermelon: food;
  private cheese: food;
  private chicken: food;
  private bacon: food;
  private ham: food;
  private soda: food;
  private tea: food;
  private coffee: food;
  private lemonade: food;
  private water: food;
  private bag: bag;
  private player;
  private paper: any;
  private orderDone: any;
  private food: any;
  private foods: Array<any>;
  private foodList: any;
  private foodDragged: any;
  private order: any;
  private table: any;
  private checkmark: any;
  private xmark: any;
  cursorKeys;
  score: number;
  scoreLabel;
  conveyor;

  constructor() {
    super({ key: 'DeliveryScene' });
  }

  create() {
    
  
    //this.deliveryscene = this.add.image(0,0, "deliveryscene");
    //this.deliveryscene.setOrigin(0,0);

    this.orderscene = this.add.image(0,0, "orderscene");
    this.orderscene.setOrigin(0,0);
    this.conveyor = this.add.tileSprite(0, 750, 2600, 200, "conveyor");
    this.conveyor.setOrigin(0,0);
    this.table = this.add.image(this.scale.width / 2 - 900, this.scale.height / 2 + 630, "table");
    //Non-Food Related Items
    this.bag = this.physics.add.image(this.scale.width / 2 - 900, this.scale.height / 2 + 400, "bag");
    this.paper = this.add.image(285, 300, "paper");
    this.paper.setScale(1.5);
    this.add.text(50,50, "Order:",{fill:"#000000", fontSize:"40px"});
    this.add.text(65,102, "chicken (pollo)",{fill:"#000000", fontSize:"40px"});
    this.add.text(65,152, "ham (jamón)",{fill:"#000000", fontSize:"40px"});
    this.add.text(65,202, "bacon (tocino)",{fill:"#000000", fontSize:"40px"});
    this.add.text(60, 400, "drag the food into\n the bag to\n fulfill the order", {fill:"#000000", fontSize:"40px"});

    this.score = 0;
    this.scoreLabel = this.add.bitmapText(2000, 1500, "pixelFont", "SCORE", 100);

    this.foods = ["chicken", "ham", "bacon"];
    this.foodList = [];

    //Vegetables
    this.tomato = this.physics.add.image(this.scale.width / 4 - 50, this.scale.height / 2, "tomato").setInteractive();
    this.input.setDraggable(this.tomato);

    //this.carrot = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "carrot");
    //this.lettuce = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "lettuce");
    
    //Fruits
    //this.apple = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "apple");
    //this.banana = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "banana");
    //this.orange = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "orange");
    //this.pineapple = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "pineapple");
    //this.strawberry = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "strawberry");
    //this.watermelon = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "watermelon");

    //Meats
    this.chicken = this.physics.add.image(this.scale.width / 50, this.scale.height / 2, "chicken").setInteractive();
    this.input.setDraggable(this.chicken);
    this.chicken.setScale(0.5);
    this.bacon = this.physics.add.image(this.scale.width / 3 - 50, this.scale.height / 2, "bacon").setInteractive();
    this.input.setDraggable(this.bacon);
    this.ham = this.physics.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "ham").setInteractive();
    this.input.setDraggable(this.ham);
    this.ham.setScale(0.5);
  
    //Drinks
    //this.soda = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "soda");
    //this.coffee = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "coffee");
    //this.tea = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "tea");
    //this.lemonade = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "lemonade");
    //this.water = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "water");

    //Other Food Related Items
    //this.cheese = this.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "cheese");


    // dragging code
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
    
    this.orderDone = false;


    let foodarr = [["chicken", "pollo", "poulet"], ["bacon", "tocino", "bacon"], ["ham", "jamon", "jambon"]];
    let randFood = foodarr[Math.floor(Math.random() * 3)];

    // player for delivery scene
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

    // hard coded collisions
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
   /*  pick: function (orderFood){
      return orderFood[this.integerInRange(0, orderFood.length - 1)];
    } */
  }

  //moves food across screen
  moveFood(food, speed){
    food.x += speed;
    if(food.x > 2500){
      this.resetFood(food);
    }
  }

  //puts food back to beginning
  resetFood(food){
    food.x = 0;
    let randomY = Phaser.Math.Between(800, 850);
    food.y = randomY;
  }

  // destroys food that collides with bag
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
    this.moveFood(this.chicken, 4);
    this.moveFood(this.ham, 4);
    this.moveFood(this.bacon, 4);
    this.moveFood(this.tomato, 4);
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
