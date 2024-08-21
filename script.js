const navEl = document.querySelector('.nav');
headerTop = document.querySelector('.header__top');

const cardsContainerEl = document.querySelector('.reviews__container');
const cardsEl = document.querySelectorAll('.reviews__card');
const cardActiveEl = document.querySelector('.reviews__card--active');

const statsToFindEl = document.querySelector('.stats--to-find');
const statsAmount = document.querySelectorAll('.stats__amount');

const toTopEl = document.querySelector('.to-top');
const work = document.querySelector('.work');

const navIconEl = document.querySelector('.nav__icon');
const navNamesEl = document.querySelector('.nav__names');

// FOR COUNTER
let statsOnlyOnce = false;

// MOVE NAV
const navPos = () => {
  const startsFrom = headerTop.offsetHeight - headerTop.offsetHeight * 0.075;
  // console.log(startsFrom);
  const move = startsFrom - window.scrollY;
  if (move >= 0) navEl.style.top = `${move}px`;
  else navEl.style.top = '0';
};
navPos();

window.addEventListener('scroll', () => {
  // NAV
  navPos();

  // STATS
  if (
    window.scrollY + window.innerHeight - statsToFindEl.offsetTop > 0 &&
    !statsOnlyOnce
  ) {
    statsAmount.forEach(el => {
      el.textContent = '0';

      let currentNum;
      const dataCeil = el.getAttribute('data-ceil');
      const devider = 200;

      incrementCounter();

      function incrementCounter() {
        currentNum = +el.textContent.slice(0, -1);
        const increment = dataCeil / devider;

        currentNum += Math.ceil(increment);

        if (currentNum < dataCeil) {
          setTimeout(incrementCounter, 25);
          el.textContent = currentNum + '+';
        } else {
          el.textContent = dataCeil + '+';
        }
      }
    });

    // STOP FROM EXECUTING IN THE FUTURE
    statsOnlyOnce = true;
  }

  // DISPLAY TO-TOP
  if (window.scrollY - work.offsetTop + 175 > 0)
    toTopEl.classList.remove('u-hidden');
  else toTopEl.classList.add('u-hidden');
});

let right = 0;
const len = cardsEl.length;
let test = Math.ceil(len / 2);

const fullWidth =
  cardActiveEl.offsetWidth +
  +getComputedStyle(cardActiveEl).marginLeft.replace('px', '') * 2;

let curRight = 1;

setInterval(() => {
  // SWITCH ACTIVE
  document
    .querySelector(`.reviews__card-${test}`)
    .classList.remove('reviews__card--active');
  document
    .querySelector(`.reviews__card-${test < len ? test + 1 : 1}`)
    .classList.add('reviews__card--active');
  test++;
  if (test > len) test = 1;

  // MOVE
  right += fullWidth;
  if (right > fullWidth * Math.floor(len / 2))
    right = -fullWidth * Math.floor(len / 2);

  cardsEl.forEach(el => {
    el.style.right = `${right}px`;
  });
}, 5000);

navIconEl.addEventListener('click', () => {
  navNamesEl.classList.toggle('nav__names--active');
});
