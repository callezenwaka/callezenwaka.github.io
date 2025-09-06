const Store = {
    // menu: null,
    projects: [],
    events: [],
    interests: [
        {
            id: 'cv',
            name: 'Computer Vision'
        },
        {
            id: 'ai',
            name: 'AI Safety & Ethics'
        },
        {
            id: 'hc',
            name: 'Healthcare Technology'
        },
        {
            id: 'sc',
            name: 'Supply Chain Optimization'
        },
        {
            id: 'pr',
            name: 'Privacy-Preserving Technologies'
        },
        {
            id: 'cs',
            name: 'Cybersecurity'
        },
        {
            id: 'se',
            name: 'Secure Computation'
        },
        {
            id: 'ei',
            name: 'Energy Infrastructure'
        }
    ],
    _interests: ['Computer Vision', 'AI Safety & Ethics', 'Healthcare Technology', 'Supply Chain Optimization', 'Privacy-Preserving Technologies', 'Cybersecurity', 'Secure Computation', 'Energy Infrastructure'],
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