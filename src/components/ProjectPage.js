export class ProjectPage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);

        async function loadCSS() {
            const request = await fetch('src/components/ProjectPage.css');
            styles.textContent = await request.text();
        }

        loadCSS();
    }
    
    // When the component is attached to the DOM.
    connectedCallback() {
        const template = document.getElementById('project-page-template');
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        window.addEventListener('appprojectschange', () => {
            this.render();
        });
        this.render();
    }

    render() {
        const projects = app.store.projects;
        console.log(typeof projects);
        if (Array.isArray(projects)) {
            // this.root.querySelector("#project").innerHTML = "";
            const project_lists = document.createElement('ul');
            project_lists.classList.add('project--items');
            for (const project of projects) {
                console.log(project_lists);
                console.log(project);
                const project_list = document.createElement('li');
                project_list.classList.add('project--item');
                project_list.dataset.project = JSON.stringify(project);
                    // <img class="project--avatar" src="${ project?.avatar }" alt="${ project.title }" type="image/*" title="${ project.title }"></img>
                project_list.innerHTML = `
                    <div class="project--summary">
					    <h2 class="project--title">${ project.title }</h2>
                        <p>${ project.summary }</p>
                        <a href="${ project.link }" target="_blank">Event Website</a>
                    </div>
                `;
                project_lists.appendChild(project_list);
            }
            this.root.querySelector("#project").appendChild(project_lists);
        } else {
            this.root.querySelector("#project").innerHTML = 'Loading . . .';
        }
    };
}

customElements.define("project-page", ProjectPage);