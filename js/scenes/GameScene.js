class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.npc = null;
        this.cursors = null;
        this.interactKey = null;
        this.walls = null;
        this.furniture = null;
        this.interactiveObjects = [];
        this.dialogueManager = null;
    }

    create() {
        const width = GAME_CONFIG.width;
        const height = GAME_CONFIG.height;

        // Create tilemap/floor
        this.createFloor();

        // Create walls
        this.walls = this.physics.add.staticGroup();
        this.createWalls();

        // Create furniture and interactive objects
        this.furniture = this.physics.add.staticGroup();
        this.createFurniture();

        // Create player
        this.player = new Player(this, 400, 300);

        // Create NPC
        const personalizedContent = getPersonalizedContent();
        this.npc = new NPC(this, 500, 200, personalizedContent.npcName);

        // Setup collisions
        this.physics.add.collider(this.player.sprite, this.walls);
        this.physics.add.collider(this.player.sprite, this.furniture);

        // Setup input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Setup camera
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, width, height);

        // Initialize dialogue manager
        this.dialogueManager = new DialogueManager();

        // Setup interaction with NPC
        this.physics.add.overlap(
            this.player.sprite,
            this.npc.sprite,
            () => this.handleNPCInteraction(),
            null,
            this
        );

        // Setup interaction with objects
        this.interactiveObjects.forEach(obj => {
            this.physics.add.overlap(
                this.player.sprite,
                obj.sprite,
                () => this.handleObjectInteraction(obj),
                null,
                this
            );
        });
    }

    createFloor() {
        // Create a simple floor pattern
        const tileSize = 32;
        const cols = Math.ceil(GAME_CONFIG.width / tileSize);
        const rows = Math.ceil(GAME_CONFIG.height / tileSize);

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const floor = this.add.image(x * tileSize, y * tileSize, 'floor');
                floor.setOrigin(0, 0);
                floor.setAlpha(0.8);
            }
        }
    }

    createWalls() {
        const width = GAME_CONFIG.width;
        const height = GAME_CONFIG.height;
        const tileSize = 32;

        // Top wall
        for (let x = 0; x < width; x += tileSize) {
            const wall = this.walls.create(x, 0, 'wall');
            wall.setOrigin(0, 0);
            wall.refreshBody();
        }

        // Bottom wall
        for (let x = 0; x < width; x += tileSize) {
            const wall = this.walls.create(x, height - tileSize, 'wall');
            wall.setOrigin(0, 0);
            wall.refreshBody();
        }

        // Left wall
        for (let y = tileSize; y < height - tileSize; y += tileSize) {
            const wall = this.walls.create(0, y, 'wall');
            wall.setOrigin(0, 0);
            wall.refreshBody();
        }

        // Right wall
        for (let y = tileSize; y < height - tileSize; y += tileSize) {
            const wall = this.walls.create(width - tileSize, y, 'wall');
            wall.setOrigin(0, 0);
            wall.refreshBody();
        }

        // Interior walls to create rooms
        // Vertical divider (middle)
        for (let y = tileSize; y < height / 2; y += tileSize) {
            const wall = this.walls.create(width / 2, y, 'wall');
            wall.setOrigin(0, 0);
            wall.refreshBody();
        }

        // Horizontal divider
        for (let x = tileSize; x < width - tileSize; x += tileSize) {
            if (x < width / 2 - 32 || x > width / 2 + 32) { // Leave doorway
                const wall = this.walls.create(x, height / 2, 'wall');
                wall.setOrigin(0, 0);
                wall.refreshBody();
            }
        }
    }

    createFurniture() {
        const personalizedContent = getPersonalizedContent();

        // Bookshelf in top-left room (living room)
        const bookshelf = this.furniture.create(100, 100, 'bookshelf');
        bookshelf.setOrigin(0, 0);
        bookshelf.refreshBody();
        this.interactiveObjects.push({
            sprite: bookshelf,
            name: 'bookshelf',
            message: personalizedContent.surprises.bookshelf,
            interacted: false
        });

        // Table in top-right room (kitchen)
        const table = this.furniture.create(550, 150, 'table');
        table.setOrigin(0, 0);
        table.refreshBody();
        this.interactiveObjects.push({
            sprite: table,
            name: 'table',
            message: personalizedContent.surprises.table,
            interacted: false
        });

        // Plant in bottom-left room (bedroom)
        const plant = this.furniture.create(150, 400, 'plant');
        plant.setOrigin(0, 0);
        plant.refreshBody();
        this.interactiveObjects.push({
            sprite: plant,
            name: 'plant',
            message: personalizedContent.surprises.plant,
            interacted: false
        });

        // Mirror in bottom-right room (bathroom)
        const mirror = this.furniture.create(600, 380, 'mirror');
        mirror.setOrigin(0, 0);
        mirror.refreshBody();
        this.interactiveObjects.push({
            sprite: mirror,
            name: 'mirror',
            message: personalizedContent.surprises.mirror,
            interacted: false
        });
    }

    handleNPCInteraction() {
        if (this.npc.canInteract && (Phaser.Input.Keyboard.JustDown(this.interactKey) || window.touchControls?.interactPressed)) {
            window.touchControls?.resetInteract();
            this.dialogueManager.showDialogue(DIALOGUE_DATA.birthday);
        }
    }

    handleObjectInteraction(obj) {
        if (Phaser.Input.Keyboard.JustDown(this.interactKey) || window.touchControls?.interactPressed) {
            window.touchControls?.resetInteract();

            if (!obj.interacted) {
                obj.interacted = true;
                // Add visual feedback
                this.tweens.add({
                    targets: obj.sprite,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 100,
                    yoyo: true,
                    onComplete: () => {
                        this.dialogueManager.showDialogue([obj.message]);
                    }
                });
            } else {
                this.dialogueManager.showDialogue([obj.message]);
            }
        }
    }

    update() {
        // Update player
        if (this.player) {
            this.player.update(this.cursors);
        }

        // Update NPC
        if (this.npc && this.player) {
            this.npc.update(this.player.sprite);
        }
    }
}
