class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create player sprite
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setSize(24, 24);
        this.sprite.setOffset(4, 8);

        // Player properties
        this.speed = GAME_CONFIG.playerSpeed;
        this.direction = 'down';

        // Create animations (placeholder - will be enhanced with sprite sheets)
        this.createAnimations();
    }

    createAnimations() {
        // For now, just use the static sprite
        // Later we'll add proper walking animations
    }

    update(cursors) {
        // Get input from keyboard or touch controls
        const velocity = { x: 0, y: 0 };

        // Keyboard input
        if (cursors.left.isDown) {
            velocity.x = -1;
            this.direction = 'left';
        } else if (cursors.right.isDown) {
            velocity.x = 1;
            this.direction = 'right';
        }

        if (cursors.up.isDown) {
            velocity.y = -1;
            this.direction = 'up';
        } else if (cursors.down.isDown) {
            velocity.y = 1;
            this.direction = 'down';
        }

        // Touch controls input (if active)
        if (window.touchControls) {
            const touchDir = window.touchControls.getDirection();
            if (touchDir.x !== 0 || touchDir.y !== 0) {
                velocity.x = touchDir.x;
                velocity.y = touchDir.y;

                // Set direction based on touch input
                if (Math.abs(touchDir.x) > Math.abs(touchDir.y)) {
                    this.direction = touchDir.x > 0 ? 'right' : 'left';
                } else {
                    this.direction = touchDir.y > 0 ? 'down' : 'up';
                }
            }
        }

        // Normalize diagonal movement
        if (velocity.x !== 0 && velocity.y !== 0) {
            const length = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
            velocity.x /= length;
            velocity.y /= length;
        }

        // Apply velocity
        this.sprite.setVelocity(
            velocity.x * this.speed,
            velocity.y * this.speed
        );

        // Update sprite based on direction
        this.updateSprite();
    }

    updateSprite() {
        // For now, just keep the same sprite
        // Later we'll switch sprites/animations based on direction
        if (this.sprite.body.velocity.x === 0 && this.sprite.body.velocity.y === 0) {
            // Stop animation when idle
        }
    }
}
