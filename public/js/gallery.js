const overlay = document.getElementById('overlay');
const showcasePhoto = document.querySelector('.showcase-photo');
const closeModalBtn = document.getElementById('close-modal-btn');
const photosContainer = document.getElementById('photos-container');
const showCaseContainer = document.querySelector('.showcase-container');

let isModalOpen = false;
let photoID;
let timerID;

const handleLoadShowcasePhoto = () => {
  showcasePhoto.classList.add('animate-loadshowcasephoto');
  timerID = setTimeout(() => {
    showcasePhoto.classList.remove('animate-loadshowcasephoto');
  }, 1000);
};

const handleCloseModalBtn = () => {
  if (isModalOpen) {
    showCaseContainer.classList.add('hidden');
    isModalOpen = false;
    photoID = 0;
  }
};

const handleCloseModal = (e) => {
  if (e.target.classList.contains('overlay')) {
    showCaseContainer.classList.add('hidden');
    isModalOpen = false;
    photoID = 0;
  }
};

const handlePhotoClick = (e) => {
  console.log(e);
  const source = e.target.getAttribute('src');
  photoID = e.target.getAttribute('data-id');
  showcasePhoto.setAttribute('src', source);
  if (!isModalOpen && window.location.href.includes('gallery')) {
    showCaseContainer.classList.remove('hidden');
    isModalOpen = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    return;
  }
};

overlay.addEventListener('click', handleCloseModal);
closeModalBtn.addEventListener('click', handleCloseModalBtn);
showcasePhoto.addEventListener('load', handleLoadShowcasePhoto);
showcasePhoto.addEventListener('unload', () => {
  clearTimeout(timerID);
});

//== PAGINATION ==//

(function () {
  function Pagination() {
    const objJson = photoData;

    const prevButton = document.getElementById('button_prev');
    const nextButton = document.getElementById('button_next');
    const clickPageNumber = document.querySelectorAll('.clickPageNumber');
    const galleryImages = document.querySelectorAll('.gallery-image');

    let current_page = 1;
    let records_per_page = 13;

    this.init = function () {
      changePage(1);
      pageNumbers();
      selectedPage();
      clickPage();
      addEventListeners();
    };

    let addEventListeners = function () {
      prevButton.addEventListener('click', prevPage);
      nextButton.addEventListener('click', nextPage);
    };

    let selectedPage = function () {
      let page_number = document
        .getElementById('page_number')
        .getElementsByClassName('clickPageNumber');
      for (let i = 0; i < page_number.length; i++) {
        if (i == current_page - 1) {
          page_number[i].style.opacity = '1.0';
        } else {
          page_number[i].style.opacity = '0.5';
        }
      }
    };

    let checkButtonOpacity = function () {
      current_page == 1
        ? prevButton.classList.add('opacity')
        : prevButton.classList.remove('opacity');
      current_page == numPages()
        ? nextButton.classList.add('opacity')
        : nextButton.classList.remove('opacity');
    };

    let changePage = function (page) {
      const listingTable = document.getElementById('listingTable');

      if (page < 1) {
        page = 1;
      }
      if (page > numPages() - 1) {
        page = numPages();
      }

      listingTable.innerHTML = '';

      for (
        var i = (page - 1) * records_per_page;
        i < page * records_per_page && i < objJson.length;
        i++
      ) {
        listingTable.innerHTML += `
          <div class="md:w-full h-full">
            <img class="gallery-image hover:opacity-75 w-1/2  m-auto md:w-full h-full" src="${objJson[i].image}" />
          </div>
        `;
        const galleryImages = document.querySelectorAll('.gallery-image');
        galleryImages.forEach((galleryImage) => {
          galleryImage.addEventListener('click', handlePhotoClick);
        });
      }
      checkButtonOpacity();
      selectedPage();
    };

    let prevPage = function () {
      if (current_page > 1) {
        current_page--;
        changePage(current_page);
      }
    };

    let nextPage = function () {
      if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
      }
    };

    let clickPage = function () {
      document.addEventListener('click', function (e) {
        if (
          e.target.nodeName == 'SPAN' &&
          e.target.classList.contains('clickPageNumber')
        ) {
          current_page = e.target.textContent;
          changePage(current_page);
        }
      });
    };

    let pageNumbers = function () {
      let pageNumber = document.getElementById('page_number');
      pageNumber.innerHTML = '';

      for (let i = 1; i < numPages() + 1; i++) {
        pageNumber.innerHTML +=
          "<span class='clickPageNumber m-1'>" + i + '</span>';
      }
    };

    let numPages = function () {
      return Math.ceil(objJson.length / records_per_page);
    };
  }
  let pagination = new Pagination();
  pagination.init();
})();
