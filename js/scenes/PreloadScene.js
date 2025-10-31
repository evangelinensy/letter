class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Create loading text
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const loadingText = this.add.text(width / 2, height / 2, 'Loading...', {
            fontSize: '20px',
            fill: '#ffffff'
        });
        loadingText.setOrigin(0.5);

        // Progress bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 + 20, 320, 30);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 + 25, 300 * value, 20);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Load assets - we'll create simple placeholder graphics for now
        // These will be replaced with actual sprite sheets later
        this.createPlaceholderAssets();
    }

    createPlaceholderAssets() {
        // Create player sprite placeholder
        const playerGraphics = this.make.graphics({ x: 0, y: 0, add: false });

        // Draw simple player sprites for each direction
        const colors = {
            down: 0x4287f5,
            up: 0x4287f5,
            left: 0x4287f5,
            right: 0x4287f5
        };

        // Generate a simple player texture
        playerGraphics.fillStyle(0x4287f5, 1);
        playerGraphics.fillRect(0, 0, 32, 32);
        playerGraphics.fillStyle(0xffd700, 1);
        playerGraphics.fillCircle(16, 12, 8); // Head
        playerGraphics.fillStyle(0x4287f5, 1);
        playerGraphics.fillRect(8, 20, 16, 12); // Body

        playerGraphics.generateTexture('player', 32, 32);
        playerGraphics.destroy();

        // Create NPC sprite placeholder
        const npcGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        npcGraphics.fillStyle(0xff6b6b, 1);
        npcGraphics.fillRect(0, 0, 32, 32);
        npcGraphics.fillStyle(0xffd700, 1);
        npcGraphics.fillCircle(16, 12, 8); // Head
        npcGraphics.fillStyle(0xff6b6b, 1);
        npcGraphics.fillRect(8, 20, 16, 12); // Body

        npcGraphics.generateTexture('npc', 32, 32);
        npcGraphics.destroy();

        // Create furniture and interactive object placeholders
        const furnitureTypes = [
            { key: 'bookshelf', color: 0x8B4513, width: 64, height: 96 },
            { key: 'table', color: 0xD2691E, width: 96, height: 64 },
            { key: 'plant', color: 0x228B22, width: 32, height: 48 },
            { key: 'mirror', color: 0x87CEEB, width: 48, height: 64 },
            { key: 'wall', color: 0x696969, width: 32, height: 32 },
            { key: 'floor', color: 0xF5DEB3, width: 32, height: 32 }
        ];

        furnitureTypes.forEach(item => {
            const graphics = this.make.graphics({ x: 0, y: 0, add: false });
            graphics.fillStyle(item.color, 1);
            graphics.fillRect(0, 0, item.width, item.height);

            // Add border for better visibility
            graphics.lineStyle(2, 0x000000, 1);
            graphics.strokeRect(0, 0, item.width, item.height);

            graphics.generateTexture(item.key, item.width, item.height);
            graphics.destroy();
        });
    }

    create() {
        this.scene.start('GameScene');
    }
}
