// Get input field here
const getInput = (btn) => {
  const ancestor = btn.closest(
    '.js--components-function--increment-decrement-input-number'
  );

  if (!ancestor) {
    return null;
  }

  const input = ancestor.querySelector(
    '.js--components-function--increment-decrement-input-number__input'
  );

  return input;
};

// Decrease btn
Array.from(
  document.getElementsByClassName(
    'js--components-function--increment-decrement-input-number__decrease'
  )
).forEach((decrement) => {
  decrement.addEventListener('click', function () {
    const input = getInput(this);

    if (!input) {
      return;
    }

    input.stepDown();
  });
});

// Increase btn
Array.from(
  document.getElementsByClassName(
    'js--components-function--increment-decrement-input-number__increase'
  )
).forEach((decrement) => {
  decrement.addEventListener('click', function () {
    const input = getInput(this);

    if (!input) {
      return;
    }

    input.stepUp();
  });
});
