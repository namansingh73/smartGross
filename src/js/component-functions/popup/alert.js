const container = document.getElementsByClassName(
  'js--components-function--popup-alert'
)[0];

const heading = document.getElementsByClassName(
  'js--components-function--popup-alert__heading'
)[0];

const body = document.getElementsByClassName(
  'js--components-function--popup-alert__body'
)[0];

const confirmBtn = document.getElementsByClassName(
  'js--components-function--popup-alert__confirm-btn'
)[0];

const alertFunction = (title, message, fn) => {
  // Call the default one if the custom one cannot be called
  if (
    !container ||
    !heading ||
    !body ||
    !confirmBtn ||
    !container.dataset.noneClass
  ) {
    alert(message);
    fn && fn();
    return;
  }

  let fnToCall;

  // Remove listeners and hide the dialog when work is done
  const removeEventListenerAndHide = () => {
    container.classList.add(container.dataset.noneClass);
    confirmBtn.removeEventListener('click', fnToCall);
  };

  fnToCall = () => {
    removeEventListenerAndHide();
    fn && fn();
  };

  confirmBtn.addEventListener('click', fnToCall);

  container.addEventListener('click', function (e) {
    if (e.target !== this) {
      return;
    }
    fnToCall();
  });

  // Add message
  heading.textContent = title;
  body.textContent = message;
  container.classList.remove(container.dataset.noneClass);
};

export default alertFunction;
