export class HomePage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch('src/components/HomePage.css');
            styles.textContent = await request.text();
            // styles.textContent = homePageCSS;
        }

        loadCSS();
    }

    // When the component is attached to the DOM.
    connectedCallback() {
        const template = document.getElementById('home-page-template');
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        // window.addEventListener('apphomechange', () => {
        //     this.render();
        // });
        this.render();
    }

    render() {
        // const interestItems = document.getElementById("interests");
        // homeHeader.innerHTML = `Home page`;
        // this.root.appendChild(homeHeader);
        if (app.store.interests) {
            this.root.querySelector(".interests").innerHTML = '';
            // for (const interest of app.store.interests) {
            //     const interestItem = document.createElement('div');
            //     interestItem.classList.add("tip");
            //     const interestName = interestItem.createElement('span');
            //     interestName.innerHTML = `${interest.name}`
            //     this.root.querySelector('interests').appendChild(interestItem);
            // }
            for (const interest of app.store.interests) {
                const interestItem = document.createElement('div');
                interestItem.classList.add("tip");
            
                const interestName = document.createElement('span');
                interestName.innerHTML = `${interest.name}`;
                interestItem.appendChild(interestName);
            
                this.root.querySelector('.interests').appendChild(interestItem);
            }
        } else {
            this.root.querySelector(".interests").innerHTML = 'Loading . . .';
        }
    };
}

customElements.define("home-page", HomePage);