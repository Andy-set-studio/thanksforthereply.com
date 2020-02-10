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

    if (navigator.share) {
      this.state.supportedActions.push('share');
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
    const customiseButton = this.querySelector('[data-element="customise"]');
    const shareButton = this.querySelector('[data-element="share"]');

    customiseButton.addEventListener('click', evt => {
      evt.preventDefault();
      window.state.modalVisibility = 'open';
    });

    shareButton.addEventListener('click', async evt => {
      try {
        await navigator.share({
          title: `Thanks for the reply, ${window.state.name}!`,
          text: window.state.message,
          url: `${window.location.protocol}//${window.location.host}/${window.location.pathname}${window.location.search}`
        });
      } catch (ex) {
        console.error(ex);
      }
    });
  }
}

if ('customElements' in window) {
  customElements.define('page-actions', PageActions);
}

export default PageActions;
