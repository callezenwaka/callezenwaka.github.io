// src/services/Event.js
import API from "./API.js";

export async function getEvents() {    
    app.store.events = await API.fetchEvents();
}

export async function getEventById(id) {
    if (app.store.events == null) {
        await getEvents();
    }

    const events = app.store.events;
    console.log(typeof events);

    for (const event of events) {
        if (event.id == id) {
            return event;
        }
    }
    
    return null;
}