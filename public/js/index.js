const menu = document.getElementById('menu');
const hamburger = document.getElementById('hamburger');
const mainTitle = document.querySelector('.main-title');
const homeImage = document.getElementById('home-image');
const aboutContent = document.getElementById('about-content');
const contactContent = document.getElementById('contact-content');
const activeLinks = document.querySelectorAll('.active-link');

const toggleMenu = () => {
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
};

const isInViewport = function (elem) {
  if (!elem) {
    return;
  }
  const distance = elem.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.left >= 0 &&
    distance.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  );
};

const toggleClassList = (el, class1) => {
  el.classList.add(class1);
};

if (window.location.href.includes('index.html')) {
  if (isInViewport(homeImage)) {
    toggleClassList(mainTitle, 'animate-growtext');
  }
}

const showContent = (content) => {
  if (isInViewport(content)) {
    content.classList.add('show-content');
    content.classList.remove('translate-y-64');
  }
};

const checkCurrentPage = (event, className) => {
  const body = event.target.body;
  if (body.classList.contains(className)) {
    return true;
  }
};

const setActiveLink = (links) => {
  links.forEach((link) => {
    if (link.classList.contains('scale-y-150')) {
      link.classList.remove('scale-y-150');
    } else {
      link.classList.add('scale-y-150');
    }
  });
};

window.addEventListener('DOMContentLoaded', (e) => {
  if (checkCurrentPage(e, 'contact')) {
    showContent(contactContent);
  } else if (checkCurrentPage(e, 'about')) {
    showContent(aboutContent);
  }
});

window.addEventListener('load', () => {
  setActiveLink(activeLinks);
});

hamburger.addEventListener('click', toggleMenu);
