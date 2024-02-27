---
toc: true
comments: true
layout: post
title: Sonic Animation
description: Sonic animation
type: hacks
courses: { compsci: {week: 5} }
---

<body>
    <div>
        <canvas id="spriteContainer">
            <img id="sonicSprite" src="{{site.baseurl}}/images/sonic_spritesheet.jpg">
        </canvas>
        <div id="controls">
            <input type="radio" name="animation" id="idle" checked>
            <label for="idle">Idle</label><br>
            <input type="radio" name="animation" id="run">
            <label for="run">Run</label><br>
            <input type="radio" name="animation" id="punch">
            <label for="punch">Punch</label><br>
        </div>
    </div>
</body>

<script>
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 76;
        const SPRITE_HEIGHT = 102;
        const SCALE_FACTOR = 1;
        const FRAME_LIMIT = 5;

        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        class Sonic {
            constructor() {
                this.image = document.getElementById("sonicSprite");
                this.spriteWidth = SPRITE_WIDTH;
                this.spriteHeight = SPRITE_HEIGHT;
                this.width = this.spriteWidth;
                this.height = this.spriteHeight;
                this.x = 0;
                this.y = 0;
                this.scale = 1;
                this.minFrame = 0;
                this.maxFrame = FRAME_LIMIT;
                this.frameX = 0;
                this.frameY = 0;
            }

            draw(context) {
                context.drawImage(
                    this.image,
                    this.frameX * SPRITE_WIDTH,
                    this.frameY * SPRITE_HEIGHT,
                    SPRITE_WIDTH,
                    SPRITE_HEIGHT,
                    this.x,
                    this.y,
                    canvas.width,
                    canvas.height,
                );
            }

            update() {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX = 0;
                }
            }
        }

        const sonic = new Sonic();

        const controls = document.getElementById('controls');
        controls.addEventListener('click', function (event) {
            if (event.target.tagName === 'INPUT') {
                const selectedAnimation = event.target.id;
                switch (selectedAnimation) {
                    case 'idle':
                        sonic.frameY = 0;
                        sonic.maxFrame = 6;
                        break;
                    case 'run':
                        sonic.frameY = 1;
                        sonic.maxFrame = 2;
                        break;
                    case 'punch':
                        sonic.frameY = 6;
                        sonic.maxFrame = 7;
                        break;
                    default:
                        break;
                }
            }
        });

        let framesPerSecond = 10

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            sonic.draw(ctx);

            sonic.update();

             setTimeout(function() {
        requestAnimationFrame(animate);

        }, 1000 / framesPerSecond);

        }

        animate();
    });
</script>