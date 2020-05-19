import food from '../objects/food';
import bag from '../objects/bag';
import player from '../objects/player';
import { GameObjects } from 'phaser';
import {Entry} from '../objects/entry';
import {Dictionary} from '../objects/dictionary';

export default class orderScene4 extends Phaser.Scene {
  private deliveryscene;
  private orderscene;
  private tomato: food;
  private lettuce: food;
  private strawberry: food;
  private water: food;
  private cheese: food;
  private apple: food;
  private chicken: food;
  private chickenText;
  private bacon: food;
  private baconText;
  private ham: food;
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
  correct;
  incorrect;
  transition;

  constructor() {
    super({ key: 'orderScene4' });
    
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
    this.add.text(50,50, "Order: (French)",{fill:"#000000", fontSize:"45px"});
    this.add.text(60,200, "lechuga (salade)",{fill:"#000000", fontSize:"40px"});
    this.add.text(60,150, "tomate (tomate)",{fill:"#000000", fontSize:"40px"});
    this.add.text(60,100, "tocino (bacon)",{fill:"#000000", fontSize:"40px"});

    this.checkmark1 = this.add.image(55, 100, "checkmark").setVisible(false);
    this.checkmark1.setScale(0.15);
    this.checkmark2 = this.add.image(55, 150, "checkmark").setVisible(false);
    this.checkmark2.setScale(0.15);
    this.checkmark3 = this.add.image(55, 200, "checkmark").setVisible(false);
    this.checkmark3.setScale(0.15);


    this.score = 90;
    this.scoreLabel = this.add.bitmapText(2000, 1500, "pixelFont", "SCORE", 100);
    this.scoreLabel.setTint("#000000");

    //audio
    this.transition = this.sound.add("transition");
    this.correct = this.sound.add("correct");
    this.incorrect = this.sound.add("incorrect");

    //Produce
    this.tomato = this.physics.add.image(this.scale.width / 4 - 50, this.scale.height / 2, "tomato").setInteractive();
    this.input.setDraggable(this.tomato);
    this.lettuce = this.physics.add.image(1750, this.scale.height / 2, "lettuce").setInteractive();
    this.lettuce.setScale(1.5);
    this.input.setDraggable(this.lettuce);
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
    this.chicken = this.physics.add.image(0, this.scale.height / 2, "chicken").setInteractive();
    this.input.setDraggable(this.chicken);
    this.chicken.setScale(0.5);
    this.bacon = this.physics.add.image(this.scale.width / 3 - 50, this.scale.height / 2, "bacon").setInteractive();
    this.input.setDraggable(this.bacon);
    this.ham = this.physics.add.image(this.scale.width / 2 - 50, this.scale.height / 2, "ham").setInteractive();
    this.input.setDraggable(this.ham);
    this.ham.setScale(0.5);
    
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
     this.physics.add.collider(this.bag, this.tomato, this.orderBag, function(bag, tomato){
       null;
     }, this);

    this.physics.add.overlap(this.bag, this.tomato, this.orderBag, undefined, this);

    this.physics.add.collider(this.bag, this.lettuce, this.orderBag, function(bag, lettuce){
      null;
    }, this);

   this.physics.add.overlap(this.bag, this.lettuce, this.orderBag, undefined, this);

   this.physics.add.collider(this.bag, this.strawberry, this.orderBag, function(bag, strawberry){
    null;
  }, this);

 this.physics.add.overlap(this.bag, this.tomato, this.orderBag, undefined, this);

    this.physics.add.collider(this.bag, this.chicken, this.orderBag, function(bag, chicken){
       null;
      }, 
     this
    );

    this.physics.add.overlap(this.bag, this.chicken, this.orderBag, undefined, this);

    this.physics.add.collider(this.bag, this.ham, this.orderBag, function(bag, ham){
       null;
    }, this
    );

    this.physics.add.overlap(this.bag, this.ham, this.orderBag, undefined, this);

    this.physics.add.collider(this.bag, this.bacon, this.orderBag, function(bag, bacon){
       null;
     }, this
    );

    this.physics.add.overlap(this.bag, this.bacon, this.orderBag, undefined, this);

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


    //testing a random function for order sheet
    //this.orderFood = [this.chicken, this.ham, this.tomato, this.bacon];
    
    //this.orderFoodText = [this.chickenText, this.baconText, this.hamText, this.tomatoText];

  
  



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
      this.scene.switch('orderScene5');
    }
  }

  //2 items: tomato, bacon
  orderBag(bag, food){
    if (food == this.bacon) {
      this.eatFood(bag, food);
      this.correct.play();
      this.checkmark1.setVisible(true);
    }
    if (food == this.tomato){
      this.eatFood(bag, food);
      this.correct.play();
      this.checkmark2.setVisible(true);
    }
    if (food == this.lettuce) {
      this.eatFood(bag, food);
      this.correct.play();
      this.checkmark3.setVisible(true);
    }
    else{
      this.resetFood(food);
    }
    if(this.score == 105){ //array.length returns one number higher than the highest index. for some reason
      // add an order complete image here before scene transition
      this.transition.play();
      this.completed = this.add.image(1300, 800, "complete");
      this.completed.setScale(2);
      this.orderComplete = true;
      this.nextScene();
    }  
  }

  update() {
    this.moveFood(this.chicken, 4);
    this.moveFood(this.ham, 4);
    this.moveFood(this.bacon, 4);
    this.moveFood(this.tomato, 4);
    this.moveFood(this.strawberry, 4);
    this.moveFood(this.lettuce, 4);
    this.moveFood(this.cheese, 4);
    this.moveFood(this.water, 4);
    this.moveFood(this.apple, 4);
    this.conveyor.tilePositionX -= 4;
  }

}