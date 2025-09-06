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

    // Register service worker for PWA functionality
    registerServiceWorker();

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

    // Initialize shrinking logo functionality
    initShrinkingLogo();
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

// Service Worker Registration
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('./serviceworker.js');
            // console.log('Service Worker registered successfully:', registration);
            
            // Handle service worker updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New content is available, show update notification
                        showUpdateNotification();
                    }
                });
            });
            
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
}

// Show update notification
function showUpdateNotification() {
    // Create a simple update notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: 'Open Sans', sans-serif;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>New version available!</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: 10px;">&times;</button>
        </div>
        <div style="margin-top: 10px;">
            <button onclick="window.location.reload()" style="background: rgba(255,255,255,0.2); border: 1px solid white; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 10px;">Update</button>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: 1px solid white; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Later</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

// Simple Shrinking Logo
function initShrinkingLogo() {
    // Wait for DOM to be ready
    setTimeout(() => {
        const logo = document.getElementById('logo');
        const header = document.querySelector('.header');
        
        if (!logo) {
            console.error('Logo not found!');
            return;
        }

        let isShrunk = false;

        function handleScroll() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            
            if (scrollY > 20 && !isShrunk) {
                // Shrink
                logo.classList.add('shrunk');
                if (header) {
                    header.style.height = '60px';
                    header.classList.add('scrolled');
                }
                isShrunk = true;
            } else if (scrollY <= 20 && isShrunk) {
                // Unshrink
                logo.classList.remove('shrunk');
                if (header) {
                    header.style.height = '';
                    header.classList.remove('scrolled');
                }
                isShrunk = false;
            }
        }

        // Try multiple scroll event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true });
        document.body.addEventListener('scroll', handleScroll, { passive: true });
        
        // Also try on document.documentElement
        document.documentElement.addEventListener('scroll', handleScroll, { passive: true });
        
        // Test immediately
        handleScroll();
        
        // console.log('Shrinking logo functionality ready');
    }, 100);
}