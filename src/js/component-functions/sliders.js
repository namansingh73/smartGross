const setProperties = (sliders, slided, slideTotal) => {
  sliders.dataset.sliders = JSON.stringify({
    slided,
    slideTotal,
  });
};

const getProperties = (sliders, slided, slideTotal) => {
  return JSON.parse(sliders.dataset.sliders);
};

const startAutoScroll = (sliders) => {
  const k = setInterval(() => {
    slide(sliders, 'right');
  }, 4000);
  sliders.dataset.autoScroll = k;
};

const stopAutoScroll = (sliders) => {
  if (sliders.dataset.autoScroll !== undefined) {
    clearInterval(sliders.dataset.autoScroll);
  }
};

const slide = (sliders, to = 'left') => {
  const properties = getProperties(sliders);
  to = to.toLowerCase();

  if (to === 'left') {
    properties.slided -= 1;
    if (properties.slided < 0) {
      properties.slided = properties.slideTotal - 1;
    }
  } else {
    properties.slided += 1;
    if (properties.slided >= properties.slideTotal) {
      properties.slided = 0;
    }
  }

  const container = sliders.getElementsByClassName(
    'home-intro-box__container'
  )[0];

  if (container) {
    container.style.transform = `translateX(-${
      sliders.offsetWidth * properties.slided
    }px)`;
  }

  setProperties(sliders, properties.slided, properties.slideTotal);
};

Array.from(
  document.getElementsByClassName('js--components-function--sliders')
).forEach((sliders) => {
  setProperties(
    sliders,
    0,
    sliders.getElementsByClassName('js--components-function--sliders__each')
      .length
  );

  const leftBtn = sliders.querySelector(
    '.js--components-function--sliders__btn--left'
  );

  const rightBtn = sliders.querySelector(
    '.js--components-function--sliders__btn--right'
  );

  startAutoScroll(sliders);

  if (leftBtn) {
    leftBtn.addEventListener('click', function () {
      stopAutoScroll(this.parentElement);
      slide(this.parentElement, 'left');
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', function () {
      stopAutoScroll(this.parentElement);
      slide(this.parentElement, 'right');
    });
  }
});
