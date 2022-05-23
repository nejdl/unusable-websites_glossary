const text = document.getElementById('text');

// CHECK IF TEXT SHOUDN’T BE STICKY (for easier scroll)
function checkIfTextShouldntBeSticky() {
  setTimeout(() => {
    const textShouldntBeSticky = isOutOfViewport(text);

    // if text is outside of viewport
    // remove sticky class for easier scrolling of the text
    if (textShouldntBeSticky) {
      // scroll text to top for easier reading
      // if sticky is about to get removed
      // only for desktop
      if (
        text.classList.contains('sticky') &&
        document.body.clientWidth > 650
      ) {
        scrollToTop();
      }
      text.classList.remove('sticky');
    } else {
      text.classList.add('sticky');
    }
  }, 100);
}

// inital check
checkIfTextShouldntBeSticky();
// check on resize
window.addEventListener('resize', checkIfTextShouldntBeSticky);
// check on click (e.g. when expanding details-tags)
document.addEventListener('click', checkIfTextShouldntBeSticky);

// CHECK IF ELEMENT IS OUT OF VIEWPORT
function isOutOfViewport(element) {
  // get element's bounding
  var bounding = element.getBoundingClientRect();

  // Cceck if it's out of the viewport on each side
  var out = {};
  out.top = bounding.top < 0;
  out.left = bounding.left < 0;
  out.bottom =
    bounding.bottom >
    (window.innerHeight || document.documentElement.clientHeight);
  out.right =
    bounding.right >
    (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;
  out.all = out.top && out.left && out.bottom && out.right;

  return out.any;
}

// from https://gomakethings.com/how-to-check-if-any-part-of-an-element-is-out-of-the-viewport-with-vanilla-js/

// scroll to top of body
function scrollToTop() {
  document.body.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
}
