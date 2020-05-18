import food from '../objects/food';
import bag from '../objects/bag';
import player from '../objects/player';
import { GameObjects } from 'phaser';
import {Entry} from '../objects/entry';
import {Dictionary} from '../objects/dictionary';

export default class orderScene9 extends Phaser.Scene {
  private deliveryscene;
  private orderscene;
  private carrot: food;
  private coffee: food;
  private strawberry: food;
  private water: food;
  private cheese: food;
  private apple: food;
  private watermelon: food;
  private chickenText;
  private lettuce: food;
  private soda: food;
  private pineapple: food;
  private baconText;
  private banana: food;
  private hamText;
  private bag: bag;
  private paper: any;
  private orderDone: any;
  private food: string;
  private foods: Array<any>;
  private foodList: any;
  private foodDragged: any;
  private order: any;
  private table: any;
  private checkmark1: GameObjects.Image;
  private checkmark2: GameObjects.Image;
  private checkmark3: GameObjects.Image;
  private xmark: any;
  orderComplete: boolean = false;
  orderFoodText;
  tempOrderFoodText;
  cursorKeys;
  score: number;
  scoreLabel;
  conveyor;
  private level: any;
  orderFood: any;
  tomatoText: GameObjects.Text;
  dictionary;
  fullList: any[];
  completed: GameObjects.Image;
  checkmark4: GameObjects.Image;
  checkmark5: GameObjects.Image;
  checkmark6: GameObjects.Image;
  checkmark7: GameObjects.Image;
  checkmark8: GameObjects.Image;

  constructor() {
    super({ key: 'orderScene9' });
    
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
    this.add.text(50,50, "Order:",{fill:"#000000", fontSize:"45px"});
    this.add.text(60,100, "cafe",{fill:"#000000", fontSize:"40px"});
    this.add.text(60,150, "ananas",{fill:"#000000", fontSize:"40px"});
    this.add.text(60,200, "pasteque",{fill:"#000000", fontSize:"40px"});
    this.add.text(60,250, "lechuga",{fill:"#000000", fontSize:"40px"});
    this.add.text(60,300, "fromage",{fill:"#000000", fontSize:"40px"});
    this.add.text(60,350, "agua",{fill:"#000000", fontSize:"40px"});
    this.add.text(60,400, "soda",{fill:"#000000", fontSize:"40px"});
    this.add.text(60,450, "manzana",{fill:"#000000", fontSize:"40px"});

    this.checkmark1 = this.add.image(55, 100, "checkmark").setVisible(false);
    this.checkmark1.setScale(0.15);
    this.checkmark2 = this.add.image(55, 150, "checkmark").setVisible(false);
    this.checkmark2.setScale(0.15);
    this.checkmark3 = this.add.image(55, 200, "checkmark").setVisible(false);
    this.checkmark3.setScale(0.15);
    this.checkmark4 = this.add.image(55, 250, "checkmark").setVisible(false);
    this.checkmark4.setScale(0.15);
    this.checkmark5 = this.add.image(55, 300, "checkmark").setVisible(false);
    this.checkmark5.setScale(0.15);
    this.checkmark6 = this.add.image(55, 350, "checkmark").setVisible(false);
    this.checkmark6.setScale(0.15);
    this.checkmark7 = this.add.image(55, 400, "checkmark").setVisible(false);
    this.checkmark7.setScale(0.15);
    this.checkmark8 = this.add.image(55, 450, "checkmark").setVisible(false);
    this.checkmark8.setScale(0.15);


    this.score = 160;
    this.scoreLabel = this.add.bitmapText(2000, 1500, "pixelFont", "SCORE", 100);
    this.scoreLabel.setTint("#000000");

    //Produce
    this.carrot = this.physics.add.image(this.scale.width / 4 - 50, this.scale.height / 2, "carrot").setInteractive();
    this.input.setDraggable(this.carrot);
    this.coffee = this.physics.add.image(1750, this.scale.height / 2, "coffee").setInteractive();
    this.coffee.setScale(0.5);
    this.input.setDraggable(this.coffee);
    this.strawberry = this.physics.add.image(this.scale.width / 6 - 50, this.scale.height / 2, "strawberry").setInteractive();
    this.strawberry.setScale(0.05);
    this.input.setDraggable(this.strawberry);
    this.water = this.physics.add.image(1900, this.scale.height / 2, "water").setInteractive();
    this.water.setScale(1.3);
    this.input.setDraggable(this.water);
    this.cheese = this.physics.add.image(2100, this.scale.height / 2, "cheese").setInteractive();
    this.cheese.setScale(0.4);
    this.input.setDraggable(this.cheese);
    this.apple = this.physics.add.image(1450, this.scale.height / 2, "apple").setInteractive();
    this.apple.setScale(0.3);
    this.input.setDraggable(this.apple);

    //Meats
    this.watermelon = this.physics.add.image(0, this.scale.height / 2, "watermelon").setInteractive();
    this.input.setDraggable(this.watermelon);
    this.watermelon.setScale(0.3);
    this.pineapple = this.physics.add.image(this.scale.width / 3 - 50, this.scale.height / 2, "pineapple").setInteractive();
    this.input.setDraggable(this.pineapple);
    this.pineapple.setScale(0.3);
    this.banana = this.physics.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "banana").setInteractive();
    this.input.setDraggable(this.banana);
    this.banana.setScale(0.2);
    this.soda = this.physics.add.image(this.scale.width / 9 - 50, this.scale.height / 2, "soda").setInteractive();
    this.input.setDraggable(this.soda);
    this.soda.setScale(1);
    this.lettuce = this.physics.add.image(2300, this.scale.height / 2, "lettuce").setInteractive();
    this.input.setDraggable(this.lettuce);
    this.lettuce.setScale(1);

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
   

    // hard coded collisions
     this.physics.add.collider(this.bag, this.carrot, this.orderBag, function(bag, carrot){
       null;
     }, this);

    this.physics.add.overlap(this.bag, this.carrot, this.orderBag, undefined, this);

    this.physics.add.collider(this.bag, this.soda, this.orderBag, function(bag, soda){
      null;
    }, this);

   this.physics.add.overlap(this.bag, this.soda, this.orderBag, undefined, this);

   this.physics.add.collider(this.bag, this.lettuce, this.orderBag, function(bag, lettuce){
    null;
  }, this);

    this.physics.add.overlap(this.bag, this.lettuce, this.orderBag, undefined, this);

    this.physics.add.collider(this.bag, this.coffee, this.orderBag, function(bag, coffee){
      null;
    }, this);

   this.physics.add.overlap(this.bag, this.coffee, this.orderBag, undefined, this);

   this.physics.add.collider(this.bag, this.strawberry, this.orderBag, function(bag, strawberry){
    null;
  }, this);

 this.physics.add.overlap(this.bag, this.carrot, this.orderBag, undefined, this);

    this.physics.add.collider(this.bag, this.watermelon, this.orderBag, function(bag, watermelon){
       null;
      }, 
     this
    );

    this.physics.add.overlap(this.bag, this.watermelon, this.orderBag, undefined, this);

    this.physics.add.collider(this.bag, this.banana, this.orderBag, function(bag, banana){
       null;
    }, this
    );

    this.physics.add.overlap(this.bag, this.banana, this.orderBag, undefined, this);

    this.physics.add.collider(this.bag, this.pineapple, this.orderBag, function(bag, pineapple){
       null;
     }, this
    );

    this.physics.add.overlap(this.bag, this.pineapple, this.orderBag, undefined, this);

    this.physics.add.collider(this.bag, this.water, this.orderBag, function(bag, water){
        null;
      }, this
     );
 
     this.physics.add.overlap(this.bag, this.water, this.orderBag, undefined, this);

     this.physics.add.collider(this.bag, this.cheese, this.orderBag, function(bag, cheese){
        null;
      }, this
     );
 
     this.physics.add.overlap(this.bag, this.cheese, this.orderBag, undefined, this);

     this.physics.add.collider(this.bag, this.apple, this.orderBag, function(bag, apple){
      null;
    }, this
   );

   this.physics.add.overlap(this.bag, this.apple, this.orderBag, undefined, this);


    // pausing the game
    let pause = this.add.bitmapText(1600, 1500, "pixelFont", "RESTART", 100);
    pause.tint = 0x000000;
    pause.setInteractive({ useHandCursor: true });
    pause.on('pointerdown', () => this.pauseButton());

  }

  pauseButton() {
    this.scene.switch('TitleScene');
  }

  resumeButton() {
    this.scene.resume('orderScene');
  }

  iterFoodText(arr, size){
    let x: number = 65;
    let y: number = 100;
    arr = Phaser.Utils.Array.Shuffle(arr);
    this.tempOrderFoodText = arr.slice(0, size);
    for(var i:number = 0; i < size; i++){
      arr[i].x = x;
      arr[i].y = y;
      y += 50;
      arr[i].setVisible(true);
      // somehow enter the text thats printed into the dictionary? or create a list to store the values printed?
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
    this.score += 5;
    this.scoreLabel.text = "SCORE " + this.score;
  }

  nextScene(){
    if(this.orderComplete == true){
      this.scene.switch('final');
    }
  }

  orderBag(bag, food){
    if (food == this.coffee) {
      this.eatFood(bag, food);
      this.checkmark1.setVisible(true);
    }
    if (food == this.pineapple){
      this.eatFood(bag, food);
      this.checkmark2.setVisible(true);
    }
    if (food == this.watermelon) {
      this.eatFood(bag, food);
      this.checkmark3.setVisible(true);
    }
    if (food == this.lettuce){
        this.eatFood(bag, food);
        this.checkmark4.setVisible(true);
    }
    if (food == this.cheese){
      this.eatFood(bag, food);
      this.checkmark5.setVisible(true);
    }
    if (food == this.water){
      this.eatFood(bag, food);
      this.checkmark6.setVisible(true);
    }
    if (food == this.soda){
      this.eatFood(bag, food);
      this.checkmark7.setVisible(true);
    }
    if (food == this.apple){
      this.eatFood(bag, food);
      this.checkmark8.setVisible(true);
    }
    else{
      this.resetFood(food);
    }
    if(this.score == 200){ //array.length returns one number higher than the highest index. for some reason
      // add an order complete image here before scene transition
      this.completed = this.add.image(1300, 800, "complete");
      this.completed.setScale(2);
      this.orderComplete = true;
      this.nextScene();
    }  
  }

  update() {
    this.moveFood(this.watermelon, 4);
    this.moveFood(this.banana, 4);
    this.moveFood(this.pineapple, 4);
    this.moveFood(this.carrot, 4);
    this.moveFood(this.strawberry, 4);
    this.moveFood(this.coffee, 4);
    this.moveFood(this.cheese, 4);
    this.moveFood(this.water, 4);
    this.moveFood(this.apple, 4);
    this.moveFood(this.soda, 4);
    this.moveFood(this.lettuce, 4);
    this.conveyor.tilePositionX -= 4;
  }

}