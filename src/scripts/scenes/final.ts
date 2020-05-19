export default class Final extends Phaser.Scene {
    private final;
    private score;
    private scoreLabel;
    private music;

    constructor() {
        super({ key: 'final' });
        
      }
    
      create() {
        this.final = this.add.image(0,0, "final");
        this.final.setOrigin(0,0);

        this.music = this.sound.add("end", {volume: 0.5, loop: false});
        this.music.play();

        this.score = 200;
        this.scoreLabel = this.add.bitmapText(1900, 1500, "pixelFont", "SCORE: 200", 100);
        this.scoreLabel.setTint("#000000");

        let pause = this.add.bitmapText(400, 1500, "pixelFont", "PLAY AGAIN", 100);
        pause.tint = 0x000000;
        pause.setInteractive({ useHandCursor: true });
        pause.on('pointerdown', () => this.pauseButton());

  }

  pauseButton() {
    this.scene.switch('TitleScene');
  }

}