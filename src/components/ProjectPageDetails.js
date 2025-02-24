import { getEventById } from 'src/services/Event.js';

export class EventPageDetails extends HTMLElement {
    constructor() {
        super();
        this.root  = this.attachShadow({ mode: 'open' });

        const template = document.getElementById('event-page-details-template');
        const content = template.content.cloneNode(true);
        const styles = document.createElement("style");
        this.root.appendChild(content);
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch("src/components/EventPageDetails.css");
            styles.textContent = await request.text();
            // styles.textContent = EventPageDetailsCSS;
        }

        loadCSS();
    // }

    // connectedCallback() {
        

        // window.addEventListener("appeventschange", () => {
        //     this.render();
        // });
        // this.render();
    }

    render() {
        const { events } = app.store.events;
        console.log(typeof events);
        if (Array.isArray(events)) {
            this.root.querySelector("#event").innerHTML = "";
            console.log(events);
            const event_lists = document.createElement('ul');
            event_lists.classList.add('event--items');
            for (const event of events) {
                console.log(event);
                const event_list = document.createElement('li');
                event_list.classList.add('event--item');
                event_list.dataset.event = JSON.stringify(event);
                event_list.innerHTML = `
                    <img class="event--avatar" src="${ event?.presentation }" alt="${ event.name }" type="image/*" title="${ event.name }">
                    <div class="event--summary">
					    <h2 class="event--title">${ event.name }</h2>
                        <p>${ event.summary }</p>
                        <a href="${ event.link }" target="_blank">Event Website</a>
                    </div>
                `;
                event_lists.appendChild(event_list);
            }
            this.root.querySelector("#event").appendChild(event_lists);
        } else {
            this.root.querySelector("#event").innerHTML = "Loading . . .";
        }
    }
}

customElements.define("event-page", EventPageDetails);