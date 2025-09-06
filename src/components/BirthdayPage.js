export class BirthdayPage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch('/src/components/BirthdayPage.css');
            styles.textContent = await request.text();
        }

        loadCSS();
    }

    connectedCallback() {
        const template = document.getElementById('birthday-page-template');
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        this.render();
    }

    render() {
        // Get the friend's name from the URL
        const currentPath = window.location.pathname;
        const friendName = currentPath.split('/birthday/')[1];
        
        if (friendName) {
            // Decode the friend's name (in case it has special characters)
            const decodedName = decodeURIComponent(friendName);
            
            // Update the birthday message with the friend's name
            const nameElement = this.root.querySelector('.birthday-name');
            const messageElement = this.root.querySelector('.birthday-message');
            
            if (nameElement) {
                nameElement.textContent = decodedName;
            }
            
            if (messageElement) {
                messageElement.textContent = `Wishing you the happiest of birthdays, ${decodedName}! 🎉`;
            }
            
            // Start confetti animation
            this.startConfetti();
        } else {
            // Fallback if no name is provided
            const nameElement = this.root.querySelector('.birthday-name');
            const messageElement = this.root.querySelector('.birthday-message');
            
            if (nameElement) {
                nameElement.textContent = 'Friend';
            }
            
            if (messageElement) {
                messageElement.textContent = 'Wishing you the happiest of birthdays! 🎉';
            }
            
            this.startConfetti();
        }
    }

    startConfetti() {
        // Create confetti elements
        const confettiContainer = this.root.querySelector('.confetti-container');
        
        if (confettiContainer) {
            // Clear any existing confetti
            confettiContainer.innerHTML = '';
            
            // Create multiple confetti pieces
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                
                // Random colors
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                confettiContainer.appendChild(confetti);
            }
        }
    }
}

customElements.define("birthday-page", BirthdayPage);
