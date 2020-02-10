import getParam from '../helpers/get-param.js';
import stripTags from '../helpers/strip-tags.js';

const html = String.raw;

// Store keycodes in readable format
const keyCodes = {
  tab: 9,
  esc: 27
};

class ModalWindow extends HTMLElement {
  constructor() {
    super();

    this.state = {
      visibility: 'hidden',
      rendered: false,
      focusIndex: 0
    };

    this.closeButton = null;
    this.focusableElements = [];
    this.form = null;
    this.modalWindow = null;
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  get message() {
    return this.getAttribute('message') || '';
  }

  connectedCallback() {
    if (this.state.rendered) {
      return;
    }

    this.render();
    this.state.rendered = true;

    document.addEventListener('keyup', evt => {
      switch (evt.keyCode) {
        case keyCodes.tab:
          this.toggleFocus(evt.shiftKey ? 'backwards' : 'forwards');
          break;
        case keyCodes.esc:
          this.toggle('close');
          break;
      }
    });

    window.subscribers.push(state => {
      this.state.visibility = state.modalVisibility;
      this.toggle(this.state.visibility);
    });
  }

  render() {
    this.innerHTML = html`
      <div role="dialog" class="modal" data-state="closed" data-element="modal-window">
        <div class="modal__window">
          <button type="button" class="modal__close" data-element="close">
            <svg
              width="1em"
              height="1em"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 27 28"
            >
              <path
                d="M3.72792206 1.27207794c.78104823-.78104823 2.04737854-.78104859 2.82842713 0l7.0703607 7.0703607 7.07177492-7.0703607c.78104823-.78104823 2.04737854-.78104859 2.82842713 0l2.82842712 2.82842712c.78104859.78104859.78104823 2.0473789 0 2.82842713L19.28285704 14l7.07248202 7.07106781c.78104859.78104859.78104823 2.0473789 0 2.82842713l-2.82842712 2.82842712c-.78104894.78104894-2.04737854.78104859-2.82842713 0l-7.07248202-7.07106781-7.0696536 7.07106781c-.78104894.78104894-2.04737854.78104859-2.82842713 0L.89949494 23.89949494c-.78104859-.78104859-.78104894-2.0473782 0-2.82842713l7.0703607-7.07177492-7.0703607-7.0703607c-.78104859-.78104859-.78104894-2.04737819 0-2.82842713l2.82842712-2.82842712z"
                fill="currentColor"
                fill-rule="evenodd"
              />
            </svg>
            <span>Close</span>
          </button>
          <form class="flow" action="/" method="GET" data-element="form">
            <div>
              <label class="font-serif text-500" for="name">Reply Guy’s name</label>
              <input
                type="text"
                autocorrect="off"
                id="name"
                name="name"
                required
                value="${this.name}"
              />
            </div>
            <div>
              <label class="font-serif text-500" for="message">Message</label>
              <textarea name="message" id="message" rows="5" required>
${this.message}</textarea
              >
            </div>
            <div class="space-700">
              <button
                class="bg-primary color-light border-primary text-500 font-base-heavy"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    this.postRender();
  }

  postRender() {
    this.closeButton = this.querySelector('[data-element="close"]');
    this.form = this.querySelector('[data-element="form"]');
    this.focusableElements = [
      ...this.querySelectorAll(
        'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
      )
    ];
    this.modalWindow = this.querySelector('[data-element="modal-window"]');

    this.closeButton.addEventListener('click', evt => {
      evt.preventDefault();
      this.toggle('close');
    });

    this.form.addEventListener('submit', evt => {
      evt.preventDefault();

      const data = new FormData(evt.target);
      this.setGlobalState(data.get('name'), data.get('message'), true);
    });

    this.setGlobalState();
  }

  toggleFocus(direction) {
    // Run a quick check to see if there's any elements
    if (!this.focusableElements.length) {
      return;
    }

    // Generate a new index based on direction
    let newIndex =
      direction === 'forwards' ? this.state.focusIndex + 1 : this.state.focusIndex - 1;

    switch (direction) {
      case 'forwards':
        // Reset to 0 if the new index exceeds the elements length
        if (newIndex >= this.focusableElements.length) {
          newIndex = 0;
        }

        if (newIndex < 0) {
          newIndex = 0;
        }
        break;
      case 'backwards':
        // If we fell below 0, go to the last item
        if (newIndex < 0) {
          newIndex = this.focusableElements.length - 1;
        }
        break;
    }

    // Update the focusable index and then set that element's focus
    this.state.focusIndex = newIndex;
    this.focusableElements[this.state.focusIndex].focus();
  }

  toggle(state = 'open') {
    if (state === 'open') {
      this.state.visibility = 'open';
      setTimeout(() => {
        const firstInput = this.focusableElements.find(x => x.hasAttribute('name'));

        if (firstInput) {
          firstInput.focus();
          this.state.focusIndex = this.focusableElements.findIndex(x =>
            x.hasAttribute('name')
          );
        }
      }, 500);
    } else {
      this.state.visibility = 'closed';
    }

    this.modalWindow.setAttribute('data-state', this.state.visibility);
  }

  setGlobalState(
    name = getParam('name'),
    message = getParam('message'),
    hideModal = false
  ) {
    const newName = stripTags(name);
    const newMessage = stripTags(message);
    const newTitle = `Thanks for the reply, ${newName}!`;
    const nameInput = this.querySelector('[name="name"]');
    const messageInput = this.querySelector('[name="message"]');

    if (newName) {
      window.state.name = newName;
      window.state.message = newMessage;

      nameInput.value = newName;
      messageInput.value = newMessage;

      history.pushState(
        {},
        newTitle,
        `?name=${encodeURI(newName)}&message=${encodeURI(newMessage)}`
      );

      document.title = newTitle;
    }
    if (hideModal) {
      this.toggle('close');
    }
  }
}

if ('customElements' in window) {
  customElements.define('modal-window', ModalWindow);
}

export default ModalWindow;
