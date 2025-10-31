class NPC {
    constructor(scene, x, y, name = "NPC") {
        this.scene = scene;
        this.name = name;

        // Create NPC sprite
        this.sprite = scene.physics.add.sprite(x, y, 'npc');
        this.sprite.setImmovable(true);
        this.sprite.setSize(24, 24);
        this.sprite.setOffset(4, 8);

        // Interaction properties
        this.canInteract = false;
        this.interactionDistance = 50;

        // Create interaction indicator
        this.indicator = scene.add.text(x, y - 40, '!', {
            fontSize: '20px',
            fill: '#ffffff',
            backgroundColor: '#ff0000',
            padding: { x: 6, y: 2 }
        });
        this.indicator.setOrigin(0.5);
        this.indicator.setVisible(false);
    }

    update(playerSprite) {
        // Check distance to player
        const distance = Phaser.Math.Distance.Between(
            this.sprite.x,
            this.sprite.y,
            playerSprite.x,
            playerSprite.y
        );

        // Show interaction indicator when player is close
        if (distance < this.interactionDistance) {
            this.canInteract = true;
            this.indicator.setVisible(true);
            this.indicator.setPosition(this.sprite.x, this.sprite.y - 40);

            // Make indicator pulse
            const scale = 1 + Math.sin(this.scene.time.now / 200) * 0.2;
            this.indicator.setScale(scale);
        } else {
            this.canInteract = false;
            this.indicator.setVisible(false);
        }
    }
}
