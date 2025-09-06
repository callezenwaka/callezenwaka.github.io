// src/services/Router.js
const Router = {
    init: () => {
        document.querySelectorAll("a.nav-link").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault();
                const link_url = event.target.getAttribute("href");
                Router.go(link_url);
            });
        });

        // Event handler for url changes
        window.addEventListener('popstate', event => {
            Router.go(event.state?.route || location.pathname, false);
        })

        // Check the initial link_url
        // Handle GitHub Pages redirect with query parameter
        let initialRoute = location.pathname;
        
        // Handle GitHub Pages 404 redirect
        if (location.search) {
            const queryMatch = location.search.match(/\?\/?(.*)/);
            if (queryMatch && queryMatch[1]) {
                initialRoute = '/' + queryMatch[1].replace(/~and~/g, '&');
            }
        }
        
        // Clean up the route
        if (initialRoute === '/' || initialRoute === '') {
            initialRoute = '/';
        }
        
        Router.go(initialRoute);
    },

    go: (route, addToHistory=true) => {
        // Clean up route - remove hash if present
        const cleanRoute = route.replace(/^#/, '');
        
        console.log('Router: Navigating to', cleanRoute);
        
        if (addToHistory) {
            history.pushState({ route: cleanRoute }, '', cleanRoute);
        }

        let pageElement = null;

        switch (cleanRoute) {
            case "/":
            case "":
                pageElement = document.createElement("home-page");
                break;
            case "/events":
                pageElement = document.createElement("event-page");
                break;
            case "/projects":
                pageElement = document.createElement("project-page");
                break;
        
            default:
                if(cleanRoute.startsWith("/events/")) {
                    pageElement = document.createElement("event-page");
                    const paramsId = cleanRoute.split("/").pop();
                    pageElement.id = paramsId;
                }
                if(cleanRoute.startsWith("/projects/")) {
                    pageElement = document.createElement("project-page");
                    const paramsId = cleanRoute.split("/").pop();
                    pageElement.id = paramsId;
                }
                if(cleanRoute.startsWith("/birthday/")) {
                    pageElement = document.createElement("birthday-page");
                    const friendName = cleanRoute.split("/birthday/")[1];
                    pageElement.id = friendName;
                }
                break;
        }

        if (pageElement) {
            let cacheMain = document.querySelector("main");
            cacheMain.innerHTML = ""
            cacheMain.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        } else {
            console.log('Router: No matching route for', cleanRoute);
            // Fallback to home page for unknown routes
            pageElement = document.createElement("home-page");
            let cacheMain = document.querySelector("main");
            cacheMain.innerHTML = ""
            cacheMain.appendChild(pageElement);
        }

    }
}

export default Router;