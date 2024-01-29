import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import okIcon from '../img/ok.svg';
import errorIcon from '../img/err.svg';

const fetchImageBtn = document.querySelector(".btn");
const imageList = document.querySelector(".image-list");

fetchImageBtn.addEventListener("submit", (event) => {
    event.preventDefault();
    // const form = event.target;
//     const delay = form.elements.delay.value;
//     const state = form.elements.state.value;
    fetchImage(event)
    .then((data) => {
        console.log(data);
        return data
    })
    .catch((error) => onRejected(error));
});

// renderImage

function fetchImage(event) {
  return fetch('https://pixabay.com/api/?key=42096263-920755fbf423cd5814494514c&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error`);
      }
      return response.json();
    }
  );
}

// const searchParams = new URLSearchParams({
//     key: '42096263-920755fbf423cd5814494514c',
//     q: 'cat',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true
// });
// console.log(searchParams)

// function renderImage(images) {
//   const markup = images
//     .map((image) => {
//       return `<li>
//           <p><b>Name</b>: ${image.name}</p>
//           <p><b>Email</b>: ${image.email}</p>
//           <p><b>Company</b>: ${image.company.name}</p>
//         </li>`;
//     })
//     .join("");
//     imageList.insertAdjacentHTML("beforeend", markup);
// }

function onRejected(error) {
    iziToast.show({
        title: 'Error',
        titleColor: '#FFFFFF',
        message: `Rejected promise`,
        messageColor: '#FFFFFF',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        iconUrl: errorIcon,
        position: 'topRight'
    });
};
