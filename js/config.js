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

    // Personalized content for each friend
    // Each friend gets unique dialogue, messages, and surprises!
    const personalizedData = {
        default: {
            npcName: "Evangeline",
            npcGreeting: [
                "Hey! Welcome to my place!",
                "Feel free to explore around...",
                "You might find some interesting things hidden in the house!",
                "Talk to me again if you need hints!"
            ],
            surprises: {
                bookshelf: {
                    message: "A collection of my favorite books! 📚",
                    imageUrl: null, // Optional: URL to an image
                    revealed: false
                },
                table: {
                    message: "Some birthday decorations! 🎂",
                    imageUrl: null,
                    revealed: false
                },
                plant: {
                    message: "This plant has been with me for years. 🌱",
                    imageUrl: null,
                    revealed: false
                },
                mirror: {
                    message: "Looking good! Happy Birthday! ✨",
                    imageUrl: null,
                    revealed: false
                }
            },
            theme: "birthday" // birthday, cny, general
        },

        // Example friend 1
        sarah: {
            npcName: "Evangeline",
            npcGreeting: [
                "Sarah! You made it! 🎉",
                "I'm so happy you're here!",
                "I've left some special surprises around the house just for you.",
                "Explore and interact with things - you never know what you'll find!"
            ],
            surprises: {
                bookshelf: {
                    message: "Remember when we stayed up all night reading this series? Those were the days! 📚💕",
                    imageUrl: "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Our+Book+Club+Memories", // Replace with real image
                    revealed: false
                },
                table: {
                    message: "Happy Birthday Sarah! 🎂 Here's a little gift for you: Starbucks Gift Card: XXXX-XXXX-XXXX (Check your email for the real code!)",
                    imageUrl: null,
                    revealed: false
                },
                plant: {
                    message: "This succulent reminds me of the one you gave me. Thanks for always being such a caring friend! 🌱",
                    imageUrl: null,
                    revealed: false
                },
                mirror: {
                    message: "You're amazing Sarah! Never forget how special you are! ✨💖",
                    imageUrl: null,
                    revealed: false
                }
            },
            theme: "birthday"
        },

        // Example friend 2
        john: {
            npcName: "Evangeline",
            npcGreeting: [
                "John! Welcome! 🎮",
                "I built this little game just for you!",
                "Walk around and check out the different objects.",
                "There are surprises waiting in each room!"
            ],
            surprises: {
                bookshelf: {
                    message: "Found this old photo of us from that game night! 🎲",
                    imageUrl: "https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Game+Night+2023", // Replace with real image
                    revealed: false
                },
                table: {
                    message: "Happy Birthday John! 🎂 Your gift: $25 Amazon Gift Card: XXXX-XXXX-XXXX",
                    imageUrl: null,
                    revealed: false
                },
                plant: {
                    message: "This plant survived my terrible plant-parenting, just like our friendship survived my terrible jokes! 😄",
                    imageUrl: null,
                    revealed: false
                },
                mirror: {
                    message: "Looking sharp as always! Have an amazing birthday! 🎉",
                    imageUrl: null,
                    revealed: false
                }
            },
            theme: "birthday"
        },

        // Example friend 3 - Chinese New Year theme
        mei: {
            npcName: "Evangeline",
            npcGreeting: [
                "Mei! 新年快乐! 🧧",
                "Welcome to my virtual home!",
                "I've prepared some special CNY surprises for you.",
                "Go explore and collect your red envelopes! 🎊"
            ],
            surprises: {
                bookshelf: {
                    message: "Found our photo from last year's CNY celebration! Such good memories! 🏮",
                    imageUrl: "https://via.placeholder.com/400x300/FF0000/FFFF00?text=CNY+2024", // Replace with real image
                    revealed: false
                },
                table: {
                    message: "恭喜发财! 🧧 Your hongbao: $20 Venmo Gift! (Check your Venmo!)",
                    imageUrl: null,
                    revealed: false
                },
                plant: {
                    message: "Like this bamboo plant, may you grow strong and prosperous this year! 🎋",
                    imageUrl: null,
                    revealed: false
                },
                mirror: {
                    message: "May this year bring you health, wealth, and happiness! 新年快乐! ✨",
                    imageUrl: null,
                    revealed: false
                }
            },
            theme: "cny"
        }
    };

    return personalizedData[friendId] || personalizedData.default;
}
