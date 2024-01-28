import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from '../img/err.svg';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function processingTime(event) {
  if(userSelectedDate > Date.now()) {
    const remainingTime = userSelectedDate - Date.now();
    const {days, hours, minutes, seconds} = convertMs(remainingTime);
    
    daysElem.textContent = addLeadingZero(days);
    hoursElem.textContent = addLeadingZero(hours);
    minutesElem.textContent = addLeadingZero(minutes);
    secondsElem.textContent = addLeadingZero(seconds);
  } else {
    clearInterval(intervalID);
    inputID.removeAttribute('disabled');
  }
};

function addLeadingZero(num) {
  return num.toString().padStart(2, '0');
};

let userSelectedDate;
let intervalID = null;
const inputID = document.querySelector('#datetime-picker');
let daysElem = document.querySelector('[data-days]');
let hoursElem = document.querySelector('[data-hours]');
let minutesElem = document.querySelector('[data-minutes]');
let secondsElem = document.querySelector('[data-seconds]');

const btnStart = document.querySelector('[data-start]');
btnStart.setAttribute('disabled', true);
btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', true);
  inputID.setAttribute('disabled', true);
  intervalID = setInterval(processingTime, 1000);
});

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0];
      btnStart.removeAttribute('disabled');
    } else {
      btnStart.setAttribute('disabled', true);
      iziToast.show({
        title: 'Error',
        titleColor: '#FFFFFF',
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        iconUrl: errorIcon,
        position: 'topRight'
      });
    }
  },
});



  