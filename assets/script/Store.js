const Store = {
    // menu: null,
    projects: [],
    events: [],
    interests: [
        {
            id: 'ai',
            name: 'Software Security'
        },
        {
            id: 'wb',
            name: 'Wearable Biosensors'
        },
        {
            id: 'et',
            name: 'Emerging Technologies'
        },
        {
            id: 'dp',
            name: 'Data Privacy'
        },
        {
            id: 'es',
            name: 'Enterprise SaaS'
        },
    ],
    _interests: ['Software Security', 'Wearable Biosensors', 'Emerging Technologies', 'Data Privacy', 'Enterprise SaaS'],
}

const proxiedStore = new Proxy(Store, {
    set(target, property, value) {
        target[property] = value;
        if (property=="projects") {
            window.dispatchEvent(new Event("appprojectschange"));
        }
        if (property=="events") {
            window.dispatchEvent(new Event("appeventschange"));
        }
        return true;
    }
});

export default proxiedStore;