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
        if (this.timerInvalidRedirection) {
            clearTimeout(this.timerInvalidRedirection);
            this.timerInvalidRedirection = null;
        }
        location.hash = link;
        var value = this.links[link];
        if (value != null) {
            document.querySelectorAll('html, body').forEach(element => element.scrollTo({
                top: 0,
                behavior: "smooth"
            }));
            value();
            this.opened = link;
        } else if (typeof this.links['catalog'] == 'function') {
            this.timerInvalidRedirection = setTimeout(() => this.links['catalog'](), 0);
        }
    }

    refresh() {
        var path = location.hash.slice(1);
        if (this.opened !== path) {
            this.openLink(path);
        }
    }

}

var routing = new Router();

export {routing};
