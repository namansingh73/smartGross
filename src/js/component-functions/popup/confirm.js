const container = document.getElementsByClassName(
  'js--components-function--popup-confirm'
)[0];

const heading = document.getElementsByClassName(
  'js--components-function--popup-confirm__heading'
)[0];

const body = document.getElementsByClassName(
  'js--components-function--popup-confirm__body'
)[0];

const closeBtn1 = document.getElementsByClassName(
  'js--components-function--popup-confirm__close-btn-1'
)[0];

const closeBtn2 = document.getElementsByClassName(
  'js--components-function--popup-confirm__close-btn-2'
)[0];

const confirmBtn = document.getElementsByClassName(
  'js--components-function--popup-confirm__confirm-btn'
)[0];

const confirmFunction = (title, message, noFn, yesFn) => {
  // Call the default one if the custom one cannot be called
  if (
    !container ||
    !heading ||
    !body ||
    !(closeBtn1 || closeBtn2) ||
    !confirmBtn ||
    !container.dataset.noneClass
  ) {
    if (window.confirm(message)) {
      yesFn && yesFn();
    } else {
      noFn && noFn();
    }
    return;
  }

  let noFnToCall, yesFnToCall;

  // Remove listeners and hide the dialog when work is done
  const removeEventListenerAndHide = () => {
    container.classList.add(container.dataset.noneClass);
    confirmBtn.removeEventListener('click', yesFnToCall);
    if (closeBtn1) {
      closeBtn1.removeEventListener('click', noFnToCall);
    }
    if (closeBtn2) {
      closeBtn2.removeEventListener('click', noFnToCall);
    }
  };

  yesFnToCall = () => {
    removeEventListenerAndHide();
    yesFn && yesFn();
  };

  noFnToCall = () => {
    removeEventListenerAndHide();
    noFn && noFn();
  };

  confirmBtn.addEventListener('click', yesFnToCall);
  if (closeBtn1) {
    closeBtn1.addEventListener('click', noFnToCall);
  }
  if (closeBtn2) {
    closeBtn2.addEventListener('click', noFnToCall);
  }

  container.addEventListener('click', function (e) {
    if (e.target !== this) {
      return;
    }
    noFnToCall();
  });

  // Add message
  heading.textContent = title;
  body.textContent = message;
  container.classList.remove(container.dataset.noneClass);
};

export default confirmFunction;
