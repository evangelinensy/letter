class TouchControls {
    constructor() {
        this.direction = { x: 0, y: 0 };
        this.interactPressed = false;

        // Get control elements
        this.dpadButtons = document.querySelectorAll('.dpad-btn');
        this.interactButton = document.getElementById('interact-btn');

        // Bind events
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        // D-pad controls
        this.dpadButtons.forEach(button => {
            const direction = button.getAttribute('data-direction');

            // Touch start
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.setDirection(direction, true);
            });

            // Touch end
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.setDirection(direction, false);
            });

            // Mouse events for desktop testing
            button.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.setDirection(direction, true);
            });

            button.addEventListener('mouseup', (e) => {
                e.preventDefault();
                this.setDirection(direction, false);
            });

            button.addEventListener('mouseleave', (e) => {
                e.preventDefault();
                this.setDirection(direction, false);
            });
        });

        // Interact button
        if (this.interactButton) {
            this.interactButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.interactPressed = true;
            });

            this.interactButton.addEventListener('touchend', (e) => {
                e.preventDefault();
            });

            // Mouse events for desktop testing
            this.interactButton.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.interactPressed = true;
            });

            this.interactButton.addEventListener('mouseup', (e) => {
                e.preventDefault();
            });
        }
    }

    setDirection(dir, pressed) {
        if (pressed) {
            switch (dir) {
                case 'up':
                    this.direction.y = -1;
                    break;
                case 'down':
                    this.direction.y = 1;
                    break;
                case 'left':
                    this.direction.x = -1;
                    break;
                case 'right':
                    this.direction.x = 1;
                    break;
            }
        } else {
            switch (dir) {
                case 'up':
                case 'down':
                    this.direction.y = 0;
                    break;
                case 'left':
                case 'right':
                    this.direction.x = 0;
                    break;
            }
        }
    }

    getDirection() {
        return this.direction;
    }

    resetInteract() {
        this.interactPressed = false;
    }
}
