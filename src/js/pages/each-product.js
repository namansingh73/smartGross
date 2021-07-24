const bigImg = document.querySelector('.js--page-each-product--big-img');
const imgs = document.querySelectorAll('.js--page-each-product--imgs');

const lens = document.querySelector('.js--page-each-product--lens');
const zoomedImg = document.querySelector('.js--page-each-product--zoomed-img');
const toZoom = document.querySelector('.js--page-each-product--to-zoom');

/* =========== Img changer ========== */

Array.from(imgs).forEach((img) => {
  img.addEventListener('mouseover', function () {
    if (!bigImg) {
      return;
    }

    bigImg.src = this.src;
    zoomedImg.style.backgroundImage = `url("${bigImg.src}")`;
  });
});

if (lens && zoomedImg && toZoom && bigImg) {
  let ratioX, ratioY;

  zoomedImg.style.backgroundImage = `url("${bigImg.src}")`;

  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener('mousemove', moveLens);
  toZoom.addEventListener('mousemove', moveLens);

  // show hide zoomedImg and lens
  toZoom.addEventListener('mouseenter', showZoomEffect);
  toZoom.addEventListener('mouseleave', hideZoomEffect);

  function moveLens(e) {
    e.preventDefault();

    const pos = getCursorPos(e);

    let x = pos.x - lens.offsetWidth / 2;
    let y = pos.y - lens.offsetHeight / 2;

    if (x > toZoom.offsetWidth - lens.offsetWidth) {
      x = toZoom.offsetWidth - lens.offsetWidth;
    } else if (x < 0) {
      x = 0;
    }

    if (y > toZoom.offsetHeight - lens.offsetHeight) {
      y = toZoom.offsetHeight - lens.offsetHeight;
    } else if (y < 0) {
      y = 0;
    }

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;

    // const ratioX = zoomedImg.offsetWidth / lens.offsetWidth;
    // const ratioY = zoomedImg.offsetHeight / lens.offsetHeight;

    // zoomedImg.style.backgroundSize = `${toZoom.offsetWidth * ratioX}px ${
    //   toZoom.offsetHeight * ratioY
    // }px`;

    zoomedImg.style.backgroundPosition = `-${x * ratioX}px -${y * ratioY}px`;
  }

  function showZoomEffect() {
    zoomedImg.style.display = 'block';
    lens.style.display = 'block';

    zoomedImg.style.height = `${zoomedImg.offsetWidth}px`;

    ratioX = zoomedImg.offsetWidth / lens.offsetWidth;
    ratioY = zoomedImg.offsetHeight / lens.offsetHeight;

    zoomedImg.style.backgroundSize = `${toZoom.offsetWidth * ratioX}px ${
      toZoom.offsetHeight * ratioY
    }px`;
  }

  function hideZoomEffect() {
    zoomedImg.style.display = 'none';
    lens.style.display = 'none';
  }

  function getCursorPos(e) {
    let a,
      x = 0,
      y = 0;

    e = e || window.event;

    a = toZoom.getBoundingClientRect();

    x = e.pageX - a.left;
    y = e.pageY - a.top;

    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x, y };
  }
}
