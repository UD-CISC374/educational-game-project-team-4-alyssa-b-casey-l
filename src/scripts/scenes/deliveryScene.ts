import food from '../objects/food';
import bag from '../objects/bag';
import player from '../objects/player';
import { GameObjects } from 'phaser';

export default class DeliveryScene extends Phaser.Scene {
  private deliveryscene;
  private orderscene;
  private tomato: food;
  private chicken: food;
  private chickenText;
  private bacon: food;
  private baconText;
  private ham: food;
  private hamText;
  private bag: bag;
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
  private level: any;
  orderFoodText: any[];

  constructor() {
    super({ key: 'DeliveryScene' });
  }

  create() {
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

    this.checkmark = this.add.image(60, 105, "checkmark");
    this.checkmark.setScale(0.15);
    this.checkmark.setAlpha(0.0);

    this.score = 0;
    this.scoreLabel = this.add.bitmapText(2000, 1500, "pixelFont", "SCORE", 100);

    //Vegetables
    this.tomato = this.physics.add.image(this.scale.width / 4 - 50, this.scale.height / 2, "tomato").setInteractive();
    this.input.setDraggable(this.tomato);

    //Meats
    this.chicken = this.physics.add.image(this.scale.width / 50, this.scale.height / 2, "chicken").setInteractive();
    this.input.setDraggable(this.chicken);
    this.chicken.setScale(0.5);
    this.chickenText = this.add.text(0, 0, "chicken", {fill:"#000000", fontSize:"35px"});
    this.bacon = this.physics.add.image(this.scale.width / 3 - 50, this.scale.height / 2, "bacon").setInteractive();
    this.input.setDraggable(this.bacon);
    this.baconText = this.add.text(0, 0, "bacon", {fill:"#000000", fontSize:"35px"});
    this.ham = this.physics.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "ham").setInteractive();
    this.input.setDraggable(this.ham);
    this.ham.setScale(0.5);
    this.hamText = this.add.text(0, 0, "ham", {fill:"#000000", fontSize:"35px"});


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
    this.foods = ["chicken", "ham", "tomato", "bacon"];
    this.foodList = [];

    // creating the foodtext array to print, and randomizing it?
    this.orderFoodText = [this.chickenText, this.baconText, this.hamText];
    this.orderFoodText = Phaser.Math.RND.pick(this.orderFoodText);

    // pausing the game
    let pause = this.add.bitmapText(1600, 1500, "pixelFont", "PAUSE", 100);
        pause.setInteractive({ useHandCursor: true });
        pause.on('pointerdown', () => this.pauseButton());

    let resume = this.add.bitmapText(1200, 1500, "pixelFont", "RESUME", 100);
        resume.setInteractive({ useHandCursor: true });
        resume.on('pointerdown', () => this.resumeButton());
  }

  pauseButton() {
    this.scene.pause('DeliveryScene');
  }

  resumeButton() {
    this.scene.resume('DeliveryScene');
  }

  iterFoodText(arr, size){
    arr = this.orderFoodText;
    size = arr.length();
    let x:number = 60;
    let y: number = 100;
    for(var i:number = 0; i < size; i++){
      Phaser.Utils.Array.Shuffle(arr);
      //recommending sort list randomly, iteratively placing first ith elements onto the screen
      // google how to shuffle a list in phaser/js
      //how to overwrite x and y coordinates of the text?
      y += 50;
    }
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

  update() {
    this.moveFood(this.chicken, 4);
    this.moveFood(this.ham, 4);
    this.moveFood(this.bacon, 4);
    this.moveFood(this.tomato, 4);
    this.conveyor.tilePositionX -= 4;
  }

}
