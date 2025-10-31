// Main game initialization
window.addEventListener('load', () => {
    const config = {
        type: Phaser.AUTO,
        width: GAME_CONFIG.width,
        height: GAME_CONFIG.height,
        physics: GAME_CONFIG.physics,
        scale: GAME_CONFIG.scale,
        pixelArt: GAME_CONFIG.pixelArt,
        roundPixels: GAME_CONFIG.roundPixels,
        backgroundColor: GAME_CONFIG.backgroundColor,
        parent: 'game-container',
        scene: [PreloadScene, GameScene]
    };

    const game = new Phaser.Game(config);

    // Initialize touch controls
    const touchControls = new TouchControls();

    // Make game globally accessible for debugging
    window.game = game;
    window.touchControls = touchControls;
});
