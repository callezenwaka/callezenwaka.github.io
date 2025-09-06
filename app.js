// app.js
"use strict"

import Theme from "./assets/script/Theme.js";
import Store from "./assets/script/Store.js";
import Router from "./src/services/Router.js";
import { getEvents } from "./src/services/Event.js";
import { getProjects } from "./src/services/Projects.js";

// Link the web components
import { HomePage } from "./src/components/HomePage.js";
import { EventPage } from "./src/components/EventPage.js";
import { ProjectPage } from "./src/components/ProjectPage.js";
import { BirthdayPage } from "./src/components/BirthdayPage.js";

window.app = {};
app.theme = new Theme();
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", async () => {

    // Make API call
    await getProjects();
    await getEvents();

    // Initialize app
    app.router.init();

    // miscellenous
    document.getElementById('year').innerHTML = new Date().getFullYear();
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            app.theme.darkThemeSwitch();
            updateThemeIcon();
        });
        updateThemeIcon();
    }
});

function updateThemeIcon() {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const isDark = document.querySelector('#dark-theme-style');
    
    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }
}