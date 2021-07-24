Array.from(
  document.getElementsByClassName('js--components-function--dropdown__btn')
).forEach((btn) => {
  btn.addEventListener('click', function () {
    const parent = btn.closest('.js--components-function--dropdown');
    if (!parent) {
      return;
    }
    const dropdownList = parent.querySelector(
      '.js--components-function--dropdown__list'
    );
    if (!dropdownList || !dropdownList.dataset.toggleClass) {
      return;
    }
    dropdownList.classList.toggle(dropdownList.dataset.toggleClass);
  });
});

const lists = Array.from(
  document.getElementsByClassName('menu-dropdown__list')
);

window.addEventListener('click', function (event) {
  if (
    !event.target.matches('.js--components-function--dropdown') &&
    !event.target.matches('.js--components-function--dropdown *')
  ) {
    lists.forEach((list) => {
      if (list.dataset.toggleClass) {
        list.classList.remove(list.dataset.toggleClass);
      }
    });
  }
});
