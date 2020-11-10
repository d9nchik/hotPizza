class Router {
    #links = {};

    constructor() {
        window.onhashchange = () => {
            var path = location.hash.slice(1);
            this.openLink(path);
        }
    }

    addLink(link, link_render) {
        this.#links[link] = link_render;
    }

    removeLink(link) {
        delete this.#links[link];
    }

    openLink(link) {
        location.hash = link;
        this.#links[link]();
    }

}

var routing = new Router();

export {routing};
