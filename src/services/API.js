// src/services/API.js
const API = {
    fetch: async (endpoint) => {
        // Use relative path for GitHub Pages
        const url = `./data/${endpoint}.json`;
        const result = await fetch(url);
        return await result.json();
    },

    fetchEvents: async () => {
        const { events } = await API.fetch('events');
        return events;
    },

    fetchProjects: async () => {
        const { projects } = await API.fetch('projects');
        return projects;
    }
}

export default API;