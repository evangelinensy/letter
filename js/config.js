// Game Configuration
const GAME_CONFIG = {
    // Canvas settings
    width: 800,
    height: 600,

    // Tile settings
    tileSize: 32,

    // Player settings
    playerSpeed: 100,

    // Game settings
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    // Scaling
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
        parent: 'game-container'
    },

    // Pixel art settings
    pixelArt: true,
    roundPixels: true,

    // Background color
    backgroundColor: '#2d2d2d'
};

// Room layouts and collision data
const ROOM_DATA = {
    // Define walls and furniture positions
    walls: [
        // Outer walls will be defined in the scene
    ],

    furniture: [
        // Furniture collision boxes will be defined in the scene
    ]
};

// NPC dialogue data
const DIALOGUE_DATA = {
    greeting: [
        "Hey! Welcome to my place!",
        "Feel free to explore around...",
        "You might find some interesting things hidden in the house!"
    ],

    birthday: [
        "Happy Birthday!",
        "I'm so glad you could visit my virtual home.",
        "Look around - I've hidden something special for you!"
    ]
};

// Get personalized content based on URL parameter
function getPersonalizedContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const friendId = urlParams.get('friend') || 'default';

    // This will be expanded to include personalized messages/gifts per friend
    const personalizedData = {
        default: {
            npcName: "Me",
            surprises: {
                bookshelf: "A collection of my favorite books!",
                table: "Some birthday decorations!",
                plant: "This plant has been with me for years.",
                mirror: "Looking good! Happy Birthday!"
            }
        }
        // Add more friends here with unique content
    };

    return personalizedData[friendId] || personalizedData.default;
}
