type Options = {
    id: string;
    mountNode?: HTMLElement;
};

export const createContainer = ({ id, mountNode = document.body }: Options) => {
    if (document.getElementById(id)) {
        return;
    }

    const portalContainer = document.createElement('div');

    portalContainer.setAttribute('id', id);
    mountNode.appendChild(portalContainer);
};
