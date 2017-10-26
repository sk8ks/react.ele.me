import { getStyle } from './utils';

export const getScrollTop = (element) => {
    if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
    }
    return element.scrollTop;
};

export const getScrollEventTarget = (element) => {
    let currentNode = element;
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        const overflowY = getStyle(currentNode).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }
    return window;
};

export const getVisibleHeight = (element) => {
    if (element === window) {
        return document.documentElement.clientHeight;
    }
    return element.clientHeight;
};

export const getElementTop = (element) => {
    if (element === window) {
        return getScrollTop(window);
    }
    return element.getBoundingClientRect().top + getScrollTop(window);
};
