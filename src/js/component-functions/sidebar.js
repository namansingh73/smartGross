const sidebarContainer = document.querySelector(
  '.js--components-function--sidebar__container'
);
const sidebar = document.querySelector('.js--components-function--sidebar');
const sidebarCross = document.querySelector(
  '.js--components-function--sidebar__cross'
);
const hamburger = document.querySelector(
  '.js--components-function--sidebar__hamburger'
);

if (sidebarContainer && sidebar && hamburger) {
  const { toggleClass } = sidebarContainer.dataset;

  if (toggleClass) {
    hamburger.addEventListener('click', function () {
      sidebarContainer.classList.add(toggleClass);
    });

    sidebarContainer.addEventListener('click', function (e) {
      // sidebarContainer.classList.toggle(toggleClass);
      // return;

      if (e.target !== sidebarCross && sidebar.contains(e.target)) {
        return;
      }
      sidebarContainer.classList.remove(toggleClass);
    });
  }
}
