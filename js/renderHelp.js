export const MAIN = document.getElementsByTagName('main')[0];

export function clearMain() {
    MAIN.innerHTML = '';
}

function showLoading(node) {
    var center = document.createElement('div');
    center.setAttribute('style', 'text-align: center;');
    var loading = document.createElement('div');
    loading.setAttribute('class', 'lds-dual-ring');
    center.appendChild(loading);
    node.appendChild(center);
}

showLoading(MAIN);