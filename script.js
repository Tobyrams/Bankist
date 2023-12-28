'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Button Scrolling //   ///////////////////////////////////////////////////////////////////////////////////
btnScrollTo.addEventListener('click', function (e) {
  //Getting the coordinates for secion 1 //
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  //Scrolling   window.scrollTo(left,top)
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //Better way
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //  Modern/best way of scrollong
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page Navigation //   ///////////////////////////////////////////////////////////////////////////////////
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     // console.log(id);
//     //Scrolling to the href which is the secion of that page
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Event Deligation⚠️
//1. Add event listiner to common parent element (.nav__links)
//2. Determine what element originated the event (nav__link)

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching stretegy - this only registers when a click is on the nav__link and nothing else
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    //Scrolling to the href which is the secion of that page
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component //   ///////////////////////////////////////////////////////////////////////////////////

//Using EVENT DELEGATION for the tab clicks
//Adding an event listiner to the common parent element
tabsContainer.addEventListener('click', function (e) {
  //Here we use .closest() to find the closest parent(operations__tab) element which is the button itself
  // console.log(e.target);
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //  Active tab  //
  //Guard clause
  if (!clicked) return; // if operationstab is click but not on the button we must return true so program doesn't crash

  //Here we remove the active class first from all operations__tab then we add it later.
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  //When the button is clicked we add the acive class to the clicked button
  clicked.classList.add('operations__tab--active');

  // Active content area //
  // console.log(clicked.dataset.tab);
  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation //   //////////////////////////////////////////////////////////////////////////////////

//Function to handle the hover effects so that our code isn't repeating
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link);
    //This selects all the siblings(.nav__links)
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(siblings);
    const logo = link.closest('.nav').querySelector('img');
    //If the current hoveredon link doenst equal link then make the reast 0.5 opasity
    siblings.forEach(el => {
      //this show us all the nav__links (sibling)
      // console.log(el);

      //if the current el doesn't equal the link(the one were currenly hover over)
      // then make the rest of the links 0.5 opcity
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
//When mouse is over the nav__link(<a>)
nav.addEventListener('mouseover', e => handleHover(e, 0.5));

//When mouse moves away from nav__link(<a>)
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//Using BIND method as it creates a new function with a new 'this'  //⚠️
// const handleHover = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     // console.log(link);
//     //This selects all the siblings(.nav__links)
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     // console.log(siblings);
//     const logo = link.closest('.nav').querySelector('img');
//     //If the current hoveredon link doenst equal link then make the reast 0.5 opasity
//     siblings.forEach(el => {
//       //this show us all the nav__links (sibling)
//       // console.log(el);

//       //if the current el doesn't equal the link(the one were currenly hover over)
//       // then make the rest of the links 0.5 opcity
//       if (el !== link) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };
// //When mouse is over the nav__link(<a>)
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// //When mouse moves away from nav__link(<a>)
// nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation //   //////////////////////////////////////////////////////////////////////////////////
/*/ Old way (inefficient)

//This is the coordinates for section 1
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function () {
  // console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

//*/

//  Sticky Nav: Intersection Observer API //⚠️

// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   //Root is null as we are interestin in the entire viewport
//   root: null,
//   // Threshold, is basically the percentage of intersection at
//   //which the observer callback will be called.
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  //The logic - tell the program what to do
  const [entry] = entries;
  // console.log(entry);

  //when the target(headerSection) is not intersecting the root(viewpage), then we want the sticky class to be applied.
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //rootMargin is the height of the nav before it exits the header viewport
});

headerObserver.observe(header);

// Reveal Sections //   //////////////////////////////////////////////////////////////////////////////////

// Selecting all the sections with class 'section'
const allSections = document.querySelectorAll('.section');

// Callback function for the Intersection Observer
const revealSection = function (entries, observer) {
  // Destructuring the entries array to get the first entry
  const [entry] = entries;
  // If the section is not intersecting with the viewport, return
  if (!entry.isIntersecting) return;
  // Remove the 'section--hidden' class to reveal the section
  entry.target.classList.remove('section--hidden');
  // Stop observing this section after it has been revealed
  observer.unobserve(entry.target);
};

// Creating an Intersection Observer with the revealSection callback
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // Use the viewport as the root
  threshold: 0.15, // Trigger the callback when 15% of the section is visible
});

// Observing each section in the 'allSections' NodeList
allSections.forEach(section => {
  // Adding the 'section--hidden' class to all the sections initially
  section.classList.add('section--hidden');
  // Start observing each section
  sectionObserver.observe(section);
});

// Lazy Loading images //   //////////////////////////////////////////////////////////////////////////////////
//(Good for performance)

// Selecting all images with a 'data-src' attribute
const imgTargets = document.querySelectorAll('img[data-src]');

// Callback function for the Intersection Observer
const loadImg = function (entries, observer) {
  // Destructuring the entries array to get the first entry
  const [entry] = entries;
  // If the image is not intersecting with the viewport, return
  if (!entry.isIntersecting) return;
  // Replace 'src' with 'data-src' to load the image
  entry.target.src = entry.target.dataset.src;

  // Event listener to handle the removal of the 'lazy-img' class after the image has loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  // Stop observing this image after it has been loaded
  observer.unobserve(entry.target);
};

// Creating an Intersection Observer with the loadImg callback
const imgObserver = new IntersectionObserver(loadImg, {
  root: null, // Use the viewport as the root
  threshold: 0, // Trigger the callback as soon as the image is partially visible
  rootMargin: '200px', // Add a 200px margin around the viewport for intersection checking
});

// Observing each image in the 'imgTargets' NodeList
imgTargets.forEach(img => imgObserver.observe(img));

/*Explanation: TOPIC  

//1. const imgTargets = document.querySelectorAll('img[data-src]');: 
Selects all img elements with a data-src attribute, which typically holds the URL of the image to be lazy-loaded.

//2. Callback Function (loadImg):

//- const [entry] = entries;: Destructures the entries array to get the first entry.
//- if (!entry.isIntersecting) return;: Checks if the image is currently intersecting with the viewport. If not, the function returns early.
//- entry.target.src = entry.target.dataset.src;: Replaces the src attribute with the data-src attribute, triggering the lazy loading of the image.
//- entry.target.addEventListener('load', function () { ... });: Listens for the 'load' event to handle the removal of the 'lazy-img' class after the image has loaded.
//- observer.unobserve(entry.target);: Stops observing the image after it has been loaded.

// 3. const imgObserver = new IntersectionObserver(loadImg, {...});: Creates an Intersection Observer instance with the loadImg callback and configuration options.
// - root: null,: Uses the viewport as the root for visibility checking.
// - threshold: 0,: Triggers the callback as soon as the image is partially visible.
// - rootMargin: '200px',: Adds a 200px margin around the viewport for intersection checking.

// 4. imgTargets.forEach(img => imgObserver.observe(img));: Observes each image in the imgTargets NodeList with the Intersection Observer.
*/

// Slider Component //   //////////////////////////////////////////////////////////////////////////////////

// Function to create a slider
const slider = function () {
  // Selecting DOM elements
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  // Initial slide index and maximum slide index
  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // Function to move to a specific slide
  const goToSlide = function (slide) {
    // Adjusting the transform property for each slide
    slides.forEach(
      (s, index) =>
        (s.style.transform = `translateX(${100 * (index - slide)}%)`)
    );
  };

  // Function to create dots for each slide
  const createDots = function () {
    slides.forEach(function (_, index) {
      // Adding dots to the dot container
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  // Function to activate the corresponding dot for the current slide
  const activateDot = function (slide) {
    // Removing the 'dots__dot--active' class from all dots
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    // Adding the 'dots__dot--active' class to the dot corresponding to the current slide
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // Function to move to the next slide
  const nextSlide = function () {
    curSlide === maxSlide ? (curSlide = 0) : curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Function to move to the previous slide
  const prevSlide = function () {
    curSlide === 0 ? (curSlide = maxSlide) : curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Initialization function
  const init = function () {
    // Set up the initial state
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers

  // Button click events
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Keyboard arrow key events
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Dot click event
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // Extracting the slide index from the data attribute
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

// Calling the slider function to initialize it
slider();

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//#region  Selecting, Creating and Deleting elements  ///////SECTION/////////////////////////////////////
/*/

//  Selecting the whole documtnt//TOPIC
console.log(document.documentElement);

//Selecting section elements
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

//Selecting an element
document.getElementById('section--1');
//Selecting button element
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//  Creating and inserting elements //TOPIC

//This will store the div element in to message and it is not created yet
const message = document.createElement('div');
message.classList.add('cookie-message'); // Adding a classes to it

message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';

//adding the button to the header
header.append(message);
// header.before(message);
// header.after(message);

//  Delete element  //TOPIC
//we'll delete the 'Got it' button when it's clicked
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    //another way of removing the element
    // message.parentElement.removeChild(message);
  });

//  Style, Attributes and classes //////SECTION///////////////////////////////////////////////////////////////////
//Styles//  TOPIC
message.style.backgroundColor = '#37383d';
message.style.width = '103%';

//we can only get inline styles, styles from the css file we cannot access on here
console.log(message.style.color); //this is code from the css file which we cannot access here (rgb(55,56,61))
console.log(message.style.backgroundColor); // This we can access as we set it earlier in the code.

//To get the css properties for our elements we use getComputedStyle()
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color); //now we can access the messages colour by usining getComputedStyle()
console.log(getComputedStyle(message).height);

//  Using getComputedStyle to add height to the message cookie  //
//parseFloat() is used to get the number only result: 50 then we add 40
console.log('Number Only👇🏽:');
console.log(Number.parseFloat(getComputedStyle(message).height));

//Now we add the desired height(30) to the height we got(50) and then add px to it to update it in the DOM
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

//  Changing CSS properties  //
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes //  TOPIC
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
//absolute value for src
console.log(logo.src);
//relative value for src
console.log(logo.getAttribute('src'));

//  Data attributes // after data we need to transform it into camlecase data-version-number => dataset.versionNumber
console.log(logo.dataset.versionNumber);

//  Classes //TOPIC
logo.classList.add('_');
logo.classList.remove('_');
logo.classList.toggle('_');
logo.classList.contains('_');

//*/
//#endregion

//#region Types of Events and Event Handlers  /////////SECTION////////////////////////////////////////
/*/

// an event is basically a signal that is generated by a certain dumb node
// and a signal means that something has happened, for example, a click somewhere or the mouse moving.

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('Great! you are reading the heading :D');
};

//adding event listeners
h1.addEventListener('mouseenter', alertH1);

//removing event listeners
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//Old way of eventlisteners
// h1.onmouseenter = e => alert('Great! you are reading the heading :D');

//*/
//#endregion

//#region Event Propagation in Practice   /////////SECTION///////////////////////////////////////////
/*/

//This happends because of bubbling look at theroy-lectrure-vs.pdf OR video(191.Event Propagation in Practice) for better understanding

const randomInt = (max, min) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

//Generating a random color
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//Changing background colors
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('CONTAINER', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  console.log('NAV', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
});

//*/
//#endregion

//#region DOM Traversing    /////////SECTION///////////////////////////////////////////
/*/

const h1 = document.querySelector('h1');

// Going downwards: child   TOPIC
console.log('Going ⬇️ wards');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); //This is every node of every type that exists
console.log(h1.children); // This gives us the elements inside the h1
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents   TOPIC
console.log('Going ⬆️ wards');
console.log(h1.parentNode); // Which is the <div class="header__title"> </div>
console.log(h1.parentElement); // Which is the <div class="header__title"> </div>

//IMPORTANT//⚠️
//Simmilary to querySelector()
//this selects the selected the closest header to our h1 element,
//So the closest parent element that has this class
//and then it's simply applied all style to that element.

h1.closest('.header').style.background = 'var(--gradient-primary)';
h1.closest('h1').style.background = 'var(--gradient-secondary)';
// .closest() finds parent elements while,⚠️
// .querySelector() finds child elements⚠️

// Going sideways: siblings TOPIC

console.log(h1.previousElementSibling); //Theres nothing before the h1
console.log(h1.nextElementSibling); // The next sibling is h4

//Getting all the sibling for h1
console.log(h1.parentElement.children);
//Making the h1 sibling 50% smaller
//we can use spread as the h1 parent childred are HTMLCollections which are iterables NOT arrays
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(.5)';
});

//*/
//#endregion

//#region Lifecycle DOM Events /////////SECTION///////////////////////////////////////////
/*/

// Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

//Before you leave a page a message will popup asking if you sure that you want to leave the page
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

//*/
//#endregion
