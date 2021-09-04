const container = document.getElementsByClassName(
  'js--components-function--popup-prompt'
)[0];

const form = document.getElementsByClassName(
  'js--components-function--popup-prompt__form'
)[0];

const heading = document.getElementsByClassName(
  'js--components-function--popup-prompt__heading'
)[0];

const body = document.getElementsByClassName(
  'js--components-function--popup-prompt__body'
)[0];

const textarea = document.getElementsByClassName(
  'js--components-function--popup-prompt__textarea'
)[0];

const closeBtn1 = document.getElementsByClassName(
  'js--components-function--popup-prompt__close-btn-1'
)[0];

const closeBtn2 = document.getElementsByClassName(
  'js--components-function--popup-prompt__close-btn-2'
)[0];

const promptFunction = (
  title,
  message,
  fn,
  defaultInput,
  minlength = 1,
  maxlength = 10
) => {
  // Call the default one if the custom one cannot be called
  if (
    !container ||
    !form ||
    !heading ||
    !body ||
    !(closeBtn1 || closeBtn2) ||
    !container.dataset.noneClass
  ) {
    const ans = prompt(message, defaultInput);
    fn && fn(ans);
    return;
  }

  let fnToCallForm, fnToCallCancel;

  // Remove listeners and hide the dialog when work is done
  const removeEventListenerAndHide = () => {
    container.classList.add(container.dataset.noneClass);
    form.removeEventListener('submit', fnToCallForm);
    closeBtn1 && closeBtn1.removeEventListener('click', fnToCallCancel);
    closeBtn2 && closeBtn2.removeEventListener('click', fnToCallCancel);
  };

  // Function to call while submitting form
  fnToCallForm = function (e) {
    e.preventDefault();
    const ans = textarea.value || undefined;
    removeEventListenerAndHide();
    fn && fn(ans);
  };

  // Function to call if request is cancelled
  fnToCallCancel = () => {
    removeEventListenerAndHide();
    fn && fn();
  };

  form.addEventListener('submit', fnToCallForm);
  closeBtn1 && closeBtn1.addEventListener('click', fnToCallCancel);
  closeBtn2 && closeBtn2.addEventListener('click', fnToCallCancel);

  container.addEventListener('click', function (e) {
    if (e.target !== this) {
      return;
    }
    fnToCallCancel();
  });

  // Add message
  heading.textContent = title;
  body.textContent = message;
  textarea.textContent = defaultInput || '';
  textarea.value = defaultInput || '';
  textarea.minLength = minlength;
  textarea.maxLength = maxlength;
  container.classList.remove(container.dataset.noneClass);
};

export default promptFunction;
