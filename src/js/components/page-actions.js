const html = String.raw;

class PageActions extends HTMLElement {
  constructor() {
    super();

    this.state = {
      supportedActions: ['customise'],
      rendered: false
    };
  }

  connectedCallback() {
    if (this.state.rendered) {
      return;
    }

    this.render();
    this.state.rendered = true;
  }

  render() {
    this.innerHTML = html`
      ${this.state.supportedActions.includes('customise')
        ? html`
            <button
              type="button"
              data-element="customise"
              class="bg-primary color-light border-primary text-500 font-base-heavy"
            >
              Customise
            </button>
          `
        : ''}
      ${this.state.supportedActions.includes('share')
        ? html`
            <button
              type="button"
              data-element="share"
              class="bg-transparent color-primary text-500 font-base-heavy"
            >
              Share
            </button>
          `
        : ''}
    `;

    this.postRender();
  }

  postRender() {
    this.querySelector('[data-element="customise"]').addEventListener('click', evt => {
      evt.preventDefault();
      window.state.modalVisibility = 'open';
    });
  }
}

if ('customElements' in window) {
  customElements.define('page-actions', PageActions);
}

export default PageActions;
