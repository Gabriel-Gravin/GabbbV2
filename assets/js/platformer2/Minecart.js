import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

export class Minecart extends GameObject {
    constructor(canvas, image) {
        super(canvas, image, 0, 0.5, 0.5);
    }
    
    // Required, but no update action
    update() {
    }

    // Draw position is always 0,0
    draw() {
        this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }

    // Set Tree position
    size() {
        // Formula for Height should be on constant ratio, using a proportion of 832
        const scaledHeight = GameEnv.innerHeight * (600/832);
        // Formula for Width is scaled: scaledWidth/scaledHeight == this.width/this.height
        const scaledWidth = scaledHeight * this.aspect_ratio;
        const minecartX = .80 * GameEnv.innerWidth;
        const minecartY = (GameEnv.bottom - (.25 * scaledHeight));

        // set variables used in Display and Collision algorithms
        this.bottom = minecartY;
        this.collisionHeight = scaledHeight;
        this.collisionWidth = scaledWidth;
    
        //this.canvas.width = this.width; 
        //this.canvas.height = this.height;
        this.canvas.style.Width = `${scaledWidth}px`;
        this.canvas.style.Height = `${scaledHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${minecartX}px`;
        this.canvas.style.top = `${minecartY}px`; 

    }
}

export default Minecart;