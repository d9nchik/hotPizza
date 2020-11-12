class Router {
    links = {};

    constructor() {
        window.onhashchange = () => {
           this.refresh();
        }
    }

    addLink(link, link_render) {
        this.links[link] = link_render;
        this.refresh();
    }

    removeLink(link) {
        delete this.links[link];
    }

    openLink(link) {
        location.hash = link;
        var value = this.links[link];
        if (value != null) {
            value();
            this.opened = link;
        }
    }

    refresh() {
        var path = location.hash.slice(1);
        if (this.link !== path) {
            this.openLink(path);
        }
    }

}

var routing = new Router();

export {routing};
