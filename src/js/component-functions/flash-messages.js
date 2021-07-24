const flashMessages = document.querySelector(
  '.js--components-function--flash-messages'
);

Array.from(
  document.querySelectorAll('.js--components-function--flash-close-btn')
).forEach((btn) => {
  btn.addEventListener('click', function () {
    const message = btn.closest(
      '.js--components-function--flash-messages__message'
    );

    flashMessages.removeChild(message);
  });
});
