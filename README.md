# Pokémon-Style House Exploration Game

A 2D top-down exploration game inspired by classic Pokémon games, built with Phaser.js and optimized for mobile.

## Features

- ✅ Top-down house with multiple rooms (living room, bedroom, kitchen, bathroom)
- ✅ Player character with 4-directional movement
- ✅ Collision detection with walls and furniture
- ✅ NPC character for dialogue interactions
- ✅ Interactive objects (bookshelf, table, plant, mirror) with hidden surprises
- ✅ Mobile-responsive with touch controls
- ✅ Desktop support with arrow keys + spacebar
- ✅ Personalized content via URL parameters

## How to Run

### Option 1: Simple HTTP Server (Python)
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Option 2: Node.js HTTP Server
```bash
npx http-server -p 8000
```

Then open: `http://localhost:8000`

### Option 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## Controls

### Desktop
- **Arrow Keys**: Move character
- **Spacebar**: Interact with NPCs and objects

### Mobile
- **On-screen D-pad**: Move character
- **A Button**: Interact with NPCs and objects

## Personalization

Add a `?friend=name` parameter to the URL to load personalized content:
```
http://localhost:8000/?friend=john
```

To add new personalized content, edit the `getPersonalizedContent()` function in `js/config.js`.

## Project Structure

```
letter/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # Styles and mobile controls
├── js/
│   ├── main.js            # Game initialization
│   ├── config.js          # Configuration and data
│   ├── scenes/
│   │   ├── PreloadScene.js    # Asset loading
│   │   └── GameScene.js       # Main game scene
│   ├── entities/
│   │   ├── Player.js          # Player character
│   │   └── NPC.js             # NPC character
│   ├── controls/
│   │   └── TouchControls.js   # Mobile touch input
│   └── ui/
│       └── DialogueManager.js # Dialogue system
```

## Next Steps

1. **Add Custom Sprites**: Replace placeholder graphics with pixel art sprites
2. **More Rooms**: Expand the house layout
3. **More NPCs**: Add more characters to interact with
4. **Sound Effects**: Add music and sound effects
5. **Save System**: Remember which objects were interacted with
6. **Mini-games**: Add interactive mini-games or puzzles

## Customization

### Adding New Interactive Objects

Edit `GameScene.js` in the `createFurniture()` method:

```javascript
const newObject = this.furniture.create(x, y, 'sprite-key');
newObject.setOrigin(0, 0);
newObject.refreshBody();
this.interactiveObjects.push({
    sprite: newObject,
    name: 'object-name',
    message: 'Your message here!',
    interacted: false
});
```

### Adding New Dialogue

Edit `DIALOGUE_DATA` in `js/config.js`:

```javascript
const DIALOGUE_DATA = {
    greeting: [
        "Line 1",
        "Line 2",
        "Line 3"
    ]
};
```

## Technologies

- [Phaser 3](https://phaser.io/) - Game framework
- Vanilla JavaScript - No build tools required
- CSS3 - Mobile-responsive design

## License

MIT License - Feel free to use for personal projects!
