const menus_li = document.querySelectorAll('.menu');
menus_li.forEach(menu => menu.addEventListener('click', () => {
  menu.querySelector('.dropdown').classList.toggle('visible');
}))

const slideBtns_button = document.querySelectorAll('[data-slideButton]');
slideBtns_button.forEach(button => {
  button.addEventListener('click', () => {
    const offset = button.dataset.slidebutton === 'next' ? 1 : -1;
    // by getting the slides like this you ensure that no matter how many slideshows you have on your page, you will always get the right one
    const slides = button.closest('[data-slideshow]').querySelector('[data-slides]');
    const activeSlide = slides.querySelector('[data-active]');
    // convert to array and get index of active slide
    // add offset to get new index (next or previous slide)
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    // make it a loop
    // if you are at last image, go back to the beginning and the other way round
    if (newIndex < 0 ) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    // add active data-attribute to current slide
    // remove active data-attribute from last slide
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
    
    changeBullet(button, newIndex);
  })
})

const navBullets = document.querySelectorAll('[data-nav-bullet]');
navBullets.forEach(bullet => {
  bullet.addEventListener('click', () => {
    let newIndex = bullet.dataset.navBullet;
    const slides = bullet.closest('[data-slideshow]').querySelector('[data-slides]');
    const activeSlide = slides.querySelector('[data-active]');

    // if the user chooses the already active slide
    if (activeSlide === slides.children[newIndex]) return;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    changeBullet(bullet, newIndex);
  })
})

function changeBullet(element, index) {
  const navigation = element.closest('[data-slideshow]').querySelector('[data-navigation]');
  [...navigation.children].forEach(bullet => {
    bullet.classList.remove('active');
  })
  const activeBullet = navigation.children[index];
  activeBullet.classList.add('active');
}