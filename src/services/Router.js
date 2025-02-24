// src/services/Router.js
const Router = {
    init: () => {
        document.querySelectorAll("a.nav-link").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault();
                console.log(event.target);
                const link_url = event.target.getAttribute("href");
                Router.go(link_url);
            });
        });

        // Event handler for url changes
        window.addEventListener('popstate', event => {
            Router.go(event.state.route, false);
        })

        // Check the initial link_url
        Router.go(location.pathname);
    },

    go: (route, addToHistory=true) => {
        console.log(`Going to ${route}`);

        if (addToHistory) {
            history.pushState({ route }, '', route);
        }

        let pageElement = null;

        switch (route) {
            case "/":
                pageElement = document.createElement("home-page");
                break;
            case "/events":
                pageElement = document.createElement("event-page");
                break;
            case "/projects":
                pageElement = document.createElement("project-page");
                break;
        
            default:
                if(route.startsWith("/events-/*")) {
                    pageElement = document.createElement("events-page");
                    const paramsId = route.substring(route.lastIndexOf("-")+1);
                    pageElement.id = paramsId;
                }
                if(route.startsWith("/projects-/*")) {
                    pageElement = document.createElement("projects-page");
                    const paramsId = route.substring(route.lastIndexOf("-")+1);
                    pageElement.id = paramsId;
                }
                // break;
        }

        if (pageElement) {
            let cacheMain = document.querySelector("main");
            cacheMain.innerHTML = ""
            cacheMain.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        } else {
            document.querySelector('main').innerHTML = '404, Not found!';
        }

    }
}

export default Router;