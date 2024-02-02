import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import dangIcon from './img/dang.svg';
import errorIcon from './img/err.svg';
import xIcon from './img/x.svg';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', {captionDelay: 250, captionsData: 'alt'});

const form = document.querySelector(".form");
const imageList = document.querySelector(".gallery");

form.addEventListener("submit", onSearch);

function onSearch (event) {
  event.preventDefault();
  const keyWord = event.target.keyword.value.trim();
  if (keyWord) {
    imageList.innerHTML = '<span class="loader"></span>';
    fetchImage(keyWord)
    .then((images) => renderImage(images))
    .catch((error) => onRejected(error));
    form.reset();
  }
}

function fetchImage(keyWord) {
  const BASE_URL = 'https://pixabay.com/';
  const END_POINT = 'api/';
  const PARAMS = new URLSearchParams({
    key: '42096263-920755fbf423cd5814494514c',
    q: keyWord,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true
  });
  const URL = `${BASE_URL}${END_POINT}?${PARAMS}`;

  return fetch(URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  );
}

function renderImage({totalHits, hits}) {
  if (parseInt(totalHits) > 0) {
    const markup = hits.map(createElementGallery).join('');
    imageList.innerHTML = markup;
    lightbox.refresh();
  }else{
    imageList.innerHTML = '';
    onWarning();
  }    
}

function onWarning() {
  iziToast.warning({
    title: 'Sorry,',
    titleColor: '#FFFFFF',
    message: 'there are no images matching your search query. Please try again!',
    messageColor: '#FFFFFF',
    messageSize: '16px',
    backgroundColor: '#FFA000',
    iconUrl: dangIcon,
    position: 'center',
    close: false,
    buttons: [
      [
        `<button type="button" style="
          background-color: #FFA000; 
          width: 20px; 
          height: 20px; 
          padding: 5px">
            <img style="
              width: 10px; 
              height: 10px" 
              src=${xIcon}>
        </button>`,
        function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast);
        },
      ],
    ]
  });
}

function onRejected(error) {
  iziToast.show({
    title: 'Error',
    titleColor: '#FFFFFF',
    message: `${error}`,
    messageColor: '#FFFFFF',
    messageSize: '16px',
    backgroundColor: '#EF4040',
    iconUrl: errorIcon,
    position: 'topRight',
    close: false,
    buttons: [
      [
        `<button type="button" style="
          background-color: #EF4040; 
          width: 20px; 
          height: 20px; 
          padding: 5px">
            <img style="
              width: 10px; 
              height: 10px" 
                src=${xIcon}>
        </button>`,
        function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast);
        },
      ],
    ]
  });
};


function createElementGallery({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
  return `
<ul class="card">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}">
  </a>
  <ul class="item-img">
    <li class="elem-img">
      <p class="elem-name">Likes</p>
      <p>${likes}</p>
    </li>
    <li class="elem-img">
      <p class="elem-name">Views</p>
      <p>${views}</p>
    </li>
    <li class="elem-img">
      <p class="elem-name">Comments</p>
      <p>${comments}</p>
    </li>
    <li class="elem-img">
      <p class="elem-name">Downloads</p>
      <p>${downloads}</p>
    </li>
  </ul>
</ul>
`}

