const flashMessages = document.querySelector(
  '.js--components-function--flash-messages'
);

if (flashMessages) {
  flashMessages.addEventListener('click', function (event) {
    if (
      event.target &&
      event.target.classList.contains(
        'js--components-function--flash-close-btn'
      )
    ) {
      const message = event.target.closest(
        '.js--components-function--flash-messages__message'
      );
      flashMessages.removeChild(message);
    }
  });
}

const clearFlashMessages = () => {
  if (flashMessages) {
    flashMessages.textContent = '';
  }
};

const scrollToFlashMessages = () => {
  window.scrollTo(0, 0);
};

const addFlashMessage = (type, message) => {
  if (!flashMessages) {
    alert(message);
    return;
  }

  let heading, color, icon;
  if (type && type.toLowerCase() === 'success') {
    heading = 'Success';
    color = 'green';
    icon = '&checkmark;';
  } else if (type && type.toLowerCase() === 'error') {
    heading = 'Error';
    color = 'red';
    icon = '&Cross;';
  } else {
    heading = 'Warning';
    color = 'yellow';
    icon = '&excl;';
  }

  const markup = `<div class="flash-messages__message flash-messages__message--${color} js--components-function--flash-messages__message"><div class="flash-messages__icon">${icon}</div><div class="flash-messages__content"><h4 class="flash-messages__heading">${heading}</h4><div class="flash-messages__body">${message}</div></div><button class="flash-messages__close-btn js--components-function--flash-close-btn">&Cross;</button></div>`;

  flashMessages.insertAdjacentHTML('afterbegin', markup);

  scrollToFlashMessages();
};

export { addFlashMessage, clearFlashMessages, scrollToFlashMessages };

// export { addFlashMessage, clearFlashMessages };
