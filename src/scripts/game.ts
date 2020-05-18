import 'phaser';
import DeliveryScene from './scenes/deliveryScene';
import PreloadScene from './scenes/preloadScene';
import OrderScene from './scenes/orderScene';
import TitleScene from './scenes/titleScene';
import GameConfig = Phaser.Types.Core.GameConfig;
import orderScene2 from './scenes/orderScene2';
import orderScene3 from './scenes/orderScene3';
import orderScene4 from './scenes/orderScene4';
import orderScene5 from './scenes/orderScene5';
import orderScene6 from './scenes/orderScene6';
import orderScene7 from './scenes/orderScene7';
import orderScene8 from './scenes/orderScene8';
import orderScene9 from './scenes/orderScene9';

const DEFAULT_WIDTH = 2560;
const DEFAULT_HEIGHT = 1600;


const config: GameConfig = {
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },

    scene: [TitleScene, PreloadScene, DeliveryScene, orderScene2, OrderScene, orderScene3, 
        orderScene4, orderScene5, orderScene6, orderScene7, orderScene8, orderScene9],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
