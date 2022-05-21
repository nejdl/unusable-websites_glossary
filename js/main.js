// GET ELEMENTS FROM HTML
// get header / toggle / glossary letters / terms
const header = document.getElementsByTagName('header')[0];
const toggle = document.getElementById('toggle');
const letters = document.getElementsByTagName('h3');
const terms = document.getElementsByClassName('term');

// SETTINGS
// font size scaling min / max
const minScale = 0.1;
const maxScale = 1; // if > 1, overflow appears
// animation time  min / max, determining the animation speed
const minAnimationTime = 7500;
const maxAnimationTime = 100000;

// FUNCTION: START / STOP FLOATING
function startOrStopFloating() {
  const isChecked = toggle.checked;
  // if toggle is set on'unusable' aka not checked
  if (!isChecked) {
    toggleStyle('remove');
    setInitialPositionAndScale();
    startFloating();
    // else if toggle is set on'usable' aka checked
  } else {
    toggleStyle('add');
    resetInitialPositionAndScale();
    stopFloating();
  }
}

// TOGGLE STYLE FROM UNUSABLE TO USUBALE
function toggleStyle(toggle) {
  if (toggle === 'add') {
    document.body.classList.add('usable');
  } else {
    document.body.classList.remove('usable');
  }
}

// FUNCTION: SET INITIAL RANDOM POSITION / SCALE OF TERM
function setInitialPositionAndScale() {
  // position the terms at a random start position
  for (const term of terms) {
    // resize term font size for easier scaling
    term.classList.add('biggerFontSizeForEasierScaling');
    term.style.transform =
      'scale(' +
      generateRandomNumber(minScale, maxScale) +
      ') ' +
      'translateX(' +
      generateRandomWidth(term) +
      'px) ' +
      'translateY(' +
      generateRandomHeight(term) +
      'px)';
  }
  // position title / toggle on top
  header.classList.add('positionOnTop');
}

// FUNCTION: RESET TERMS TO POSITION / SCALE IN LIST
function resetInitialPositionAndScale() {
  // reset term positions
  for (const term of terms) {
    term.classList.remove('biggerFontSizeForEasierScaling');
    term.style.transform = 'scale(1) ' + 'translateX(0) ' + 'translateY(0)';
  }
  // reset header to position relative
  header.classList.add('positionOnTop');
}

// START ANIMATING / FLOATING THE TERMS AROUND
function startFloating() {
  // hide glossary letters
  for (const letter of letters) {
    letter.classList.add('hidden');
  }
  for (const term of terms) {
    // set position to absolute, so floating transformation is possible
    term.classList.add('floating');
    // floating animation
    // between five positions with randomly generated X / Y coordinates
    const floatingAnimation = [
      {
        transform:
          'scale(' +
          generateRandomNumber(minScale, maxScale) +
          ') ' +
          'translateX(' +
          generateRandomWidth(term) +
          'px) ' +
          'translateY(' +
          generateRandomHeight(term) +
          'px)',
      },
      {
        transform:
          'scale(' +
          generateRandomNumber(minScale, maxScale) +
          ') ' +
          'translateX(' +
          generateRandomWidth(term) +
          'px) ' +
          'translateY(' +
          generateRandomHeight(term) +
          'px)',
      },
      {
        transform:
          'scale(' +
          generateRandomNumber(minScale, maxScale) +
          ') ' +
          'translateX(' +
          generateRandomWidth(term) +
          'px) ' +
          'translateY(' +
          generateRandomHeight(term) +
          'px)',
      },
      {
        transform:
          'scale(' +
          generateRandomNumber(minScale, maxScale) +
          ') ' +
          'translateX(' +
          generateRandomWidth(term) +
          'px) ' +
          'translateY(' +
          generateRandomHeight(term) +
          'px)',
      },
      {
        transform:
          'scale(' +
          generateRandomNumber(minScale, maxScale) +
          ') ' +
          'translateX(' +
          generateRandomWidth(term) +
          'px) ' +
          'translateY(' +
          generateRandomHeight(term) +
          'px)',
      },
      {
        transform:
          'scale(' +
          generateRandomNumber(minScale, maxScale) +
          ') ' +
          'translateX(' +
          generateRandomWidth(term) +
          'px) ' +
          'translateY(' +
          generateRandomHeight(term) +
          'px)',
      },
    ];
    // animation options
    const animationOptions = {
      duration: generateRandomNumber(minAnimationTime, maxAnimationTime),
      iterations: Infinity,
      direction: 'alternate',
    };
    // start animation with defined random animation and options
    term.animate(floatingAnimation, animationOptions);
  }
}

// FUNCTION: GENERATE A RANDOM WIDTH < WINDOW WIDTH
function generateRandomWidth(term) {
  const windowWidth = window.innerWidth;
  const termWidth = term.offsetWidth;
  const randomWidth = Math.floor(
    generateRandomNumber(0, windowWidth - termWidth)
  );
  return randomWidth;
}

// FUNCTION: GENERATE A RANDOM HEIGHT < WINDOW HEIGHT
function generateRandomHeight(term) {
  const windowHeight = window.innerHeight;
  const termHeight = term.offsetHeight;
  const randomHeight = Math.floor(
    generateRandomNumber(0, windowHeight - termHeight)
  );
  return randomHeight;
}

// FUNCTION: GENERATE A RANDOM NUMBER IN BETWEEN MIN / MAX
function generateRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// FUNCTION: STOP FLOATING
function stopFloating() {
  // show glossary letters again
  for (const letter of letters) {
    letter.classList.remove('hidden');
  }

  // reset position to relative again
  for (const term of terms) {
    term.classList.remove('floating');
    // stop all animations
    term
      .getAnimations({ subtree: true })
      .map((animation) => animation.cancel());
  }
}

// INITIAL: START FLOATING ON LOAD
startOrStopFloating();

// ON TOGGLE CHANGE: START / STOP FLOATING
toggle.addEventListener('click', startOrStopFloating);

// ON RESIZE: RECALCULATE POSITION
window.addEventListener('resize', startOrStopFloating);
