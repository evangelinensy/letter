class DialogueManager {
    constructor() {
        this.dialogueBox = document.getElementById('dialogue-box');
        this.dialogueText = document.getElementById('dialogue-text');
        this.nextButton = document.getElementById('dialogue-next');
        this.imageContainer = document.getElementById('dialogue-image-container');
        this.image = document.getElementById('dialogue-image');

        this.currentDialogue = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.currentImageUrl = null;

        // Bind next button
        this.nextButton.addEventListener('click', () => this.nextDialogue());
        this.nextButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.nextDialogue();
        });
    }

    showDialogue(messages, imageUrl = null) {
        if (this.isActive) return;

        this.currentDialogue = messages;
        this.currentIndex = 0;
        this.isActive = true;
        this.currentImageUrl = imageUrl;

        // Show or hide image
        if (imageUrl) {
            this.image.src = imageUrl;
            this.imageContainer.classList.remove('hidden');
        } else {
            this.imageContainer.classList.add('hidden');
        }

        this.dialogueBox.classList.remove('hidden');
        this.displayCurrentMessage();
    }

    displayCurrentMessage() {
        if (this.currentIndex < this.currentDialogue.length) {
            this.dialogueText.textContent = this.currentDialogue[this.currentIndex];
        }
    }

    nextDialogue() {
        this.currentIndex++;

        if (this.currentIndex < this.currentDialogue.length) {
            this.displayCurrentMessage();
        } else {
            this.hideDialogue();
        }
    }

    hideDialogue() {
        this.dialogueBox.classList.add('hidden');
        this.imageContainer.classList.add('hidden');
        this.isActive = false;
        this.currentDialogue = [];
        this.currentIndex = 0;
        this.currentImageUrl = null;
    }
}
