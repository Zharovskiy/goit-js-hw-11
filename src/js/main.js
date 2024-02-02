import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import dangIcon from '../img/dang.svg';
import errorIcon from '../img/err.svg';
import xIcon from '../img/x.svg';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', {captionDelay: 250, captionsData: 'alt'});

const form = document.querySelector(".form");
const imageList = document.querySelector(".gallery");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    imageList.innerHTML = '<span class="loader"></span>';
    fetchImage(event)
    .then((images) => renderImage(images))
    .catch((error) => onRejected(error));
    form.reset();
});

function fetchImage({target: {keyword: {value}}}) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api';
  const PARAMS = new URLSearchParams({
    key: '42096263-920755fbf423cd5814494514c',
    q: value,
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
    const markup = hits.map(createElementGallery);
    imageList.innerHTML = '';
    imageList.append(...markup);
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
    const ul = document.createElement('ul');
    ul.classList.add('card');
  
        const link = document.createElement('a');
        link.classList.add('gallery-link');
        link.setAttribute('href', largeImageURL);
    
            const img = document.createElement('img');
            img.classList.add('gallery-image');
            img.setAttribute('src', webformatURL);
            img.setAttribute('alt', tags);

        const ulElem = document.createElement('ul');
        ulElem.classList.add('item-img');

            const liLikes = document.createElement('li');
            liLikes.classList.add('elem-img');
    
                const pLikes = document.createElement('p');
                pLikes.classList.add('elem-name');
                pLikes.textContent = 'Likes';
                const pLikesValue = document.createElement('p');
                pLikesValue.textContent = likes;

            const liViews = document.createElement('li');
            liViews.classList.add('elem-img');
    
                const pViews = document.createElement('p');
                pViews.classList.add('elem-name');
                pViews.textContent = 'Views';
                const pViewsValue = document.createElement('p');
                pViewsValue.textContent = views;

            const liComments = document.createElement('li');
            liComments.classList.add('elem-img');
    
                const pComments = document.createElement('p');
                pComments.classList.add('elem-name');
                pComments.textContent = 'Comments';
                const pCommentsValue = document.createElement('p');
                pCommentsValue.textContent = comments;  

            const liDownloads = document.createElement('li');
            liDownloads.classList.add('elem-img');
    
                const pDownloads = document.createElement('p');
                pDownloads.classList.add('elem-name');
                pDownloads.textContent = 'Downloads';
                const pDownloadsValue = document.createElement('p');
                pDownloadsValue.textContent = downloads;    


        liDownloads.append(pDownloads, pDownloadsValue);
        liComments.append(pComments, pCommentsValue);
        liViews.append(pViews, pViewsValue);       
        liLikes.append(pLikes, pLikesValue);        
      ulElem.append(liLikes, liViews, liComments, liDownloads);         
      link.append(img);          
    ul.append(link, ulElem);
    return ul
}

