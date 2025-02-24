// app.js
"use strict"

import Theme from "./src/assets/script/theme.js";
import Store from "./src/services/Store.js";
import Router from "./src/services/Router.js";
import { getEvents } from "./src/services/Event.js";
import { getProjects } from "./src/services/Projects.js";

// Link the web components
import { HomePage } from "./src/components/HomePage.js";
import { EventPage } from "./src/components/EventPage.js";
import { ProjectPage } from "./src/components/ProjectPage.js";

window.app = {};
app.theme = Theme;
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", async () => {

    // Make API call
    await getProjects();
    await getEvents();
    console.log(app.store.projects);

    // Initialize app
    app.router.init();

    // miscellenous
    document.getElementById('year').innerHTML = new Date().getFullYear();
});