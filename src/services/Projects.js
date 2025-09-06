// src/services/Projects.js
import API from "./API.js";

export async function getProjects() {    
    app.store.projects = await API.fetchProjects();
}

export async function getProjectById(id) {
    if (app.store.projects == null) {
        await getProjects();
    }

    const projects = app.store.projects;

    for (const project of projects) {
        if (project.id == id) {
            return project;
        }
    }
    
    return null;
}