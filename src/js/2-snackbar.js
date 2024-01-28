import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import okIcon from '../img/ok.svg';
import errorIcon from '../img/err.svg';

const formSnackbar = document.querySelector('.form');
formSnackbar.addEventListener('submit', createNotification);

function createNotification(event) {
    event.preventDefault();
    const form = event.target;
    const delay = form.elements.delay.value;
    const state = form.elements.state.value;
    const promise = makePromise({delay, state});
    promise.then(onFullFiled).catch(onRejected);
};

const makePromise = ({delay, state}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state === 'fulfilled') {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay);
    });
};

function onFullFiled(delay) {
    iziToast.show({
        title: 'OK',
        titleColor: '#FFFFFF',
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        messageSize: '16px',
        backgroundColor: '#59A10D',
        iconUrl: okIcon,
        position: 'topRight'
    });
};

function onRejected(delay) {
    iziToast.show({
        title: 'Error',
        titleColor: '#FFFFFF',
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        iconUrl: errorIcon,
        position: 'topRight'
    });
};


