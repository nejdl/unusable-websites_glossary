// get terms
const terms = document.getElementsByClassName('term');
const letters = document.getElementsByTagName('h3');
const header = document.getElementsByTagName('header')[0];

function generateRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomWidth(term) {
  const windowWidth = window.innerWidth;
  const termWidth = term.offsetWidth;
  const randomWidth = Math.floor(
    generateRandomNumber(0, windowWidth - termWidth)
  );
  return randomWidth;
}

function generateRandomHeight(term) {
  const windowHeight = window.innerHeight;
  const termHeight = term.offsetHeight;
  const randomHeight = Math.floor(
    generateRandomNumber(0, windowHeight - termHeight)
  );
  return randomHeight;
}

// const minScale = 0.8;
// const maxScale = 2.5
const minScale = 0.1;
const maxScale = 1;
const minAnimationTime = 5000;
const maxAnimationTime = 100000;
const minTranslate = 0;
const maxTranslate = 100;

// SET INITIAL RANDOM POSITION / SCALE
function setInitialPositionAndScale() {
  // position the terms at a random start position
  for (const term of terms) {
    term.classList.add('unusableFontSize');
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

// RESET TO LIST POSITION / SCALE
function resetInitialPositionAndScale() {
  // reset term positions
  for (const term of terms) {
    term.classList.remove('unusableFontSize');
    term.style.transform = 'scale(1) ' + 'translateX(0) ' + 'translateY(0)';
  }
  // reset header to position relative
  header.classList.add('positionOnTop');
}

// START ANIMATING / FLOATING THE TERMS AROUND
function startFloating() {
  for (const letter of letters) {
    letter.classList.add('hidden');
  }

  for (const term of terms) {
    term.classList.add('floating');
    const termWidth = term.offsetWidth;

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

    const animationOptions = {
      duration: generateRandomNumber(minAnimationTime, maxAnimationTime),
      iterations: Infinity,
      direction: 'alternate',
    };

    term.animate(floatingAnimation, animationOptions);
  }
}

function stopFloating() {
  for (const letter of letters) {
    letter.classList.remove('hidden');
  }

  for (const term of terms) {
    term.classList.remove('floating');
    term
      .getAnimations({ subtree: true })
      .map((animation) => animation.cancel());
  }
}

// toggle
const toggle = document.getElementById('toggle');

toggle.addEventListener('click', function (e) {
  const toggleValue = e.target.checked;
  if (toggleValue) {
    resetInitialPositionAndScale();
    stopFloating();
  } else {
    setInitialPositionAndScale();
    startFloating();
  }
});

setInitialPositionAndScale();
startFloating();
