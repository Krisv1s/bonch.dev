import { dataFromMars } from './data.js';

async function postData(data) {
  document.getElementById('main_data').textContent = 'Отправлен запрос на добавление данных';
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        dataFromMars.push(data);
        resolve(true);
      } catch (err) {
        reject(false);
      }
    }, 1500);
  });
}

function printData() {
  const { date, ...otherData } = data[this.value];
  console.log({ date, otherData });
}

function createData(dataFromMars, id) {
  document.getElementById('data_block').innerHTML += `<div style="border-style: solid;width: 200px;margin: 10px">
  <li>${dataFromMars.date}</li>
  <li>${dataFromMars.temperature}</li>
  <li>${dataFromMars.windspeed}</li>
  <li>${dataFromMars.pressure}</li>
  <li><button name='butt' value="${id}">Отправить</button></li></div>`;
  console.log(`${dataFromMars.date}, ${dataFromMars.temperature}, ${dataFromMars.windspeed}, ${dataFromMars.pressure}`);
}

const data = [];

function getData() {
  setTimeout(() => {
    try {
      document.getElementById('main_data').textContent = 'Данные получены!';
      let id = 0;
      dataFromMars.forEach((dataFromMars) => {
        data.push(dataFromMars);
        createData(dataFromMars, id);
        id += 1;
      });
      [].forEach.call(document.getElementsByName('butt'), function (el) {
        el.addEventListener('click', printData);
      });
    } catch (err) {
      document.getElementById('main_data').textContent = 'Ошибка в получение данных';
    }
  }, 1000);
}
setTimeout(async () => {
  const res = await postData({
    date: '3 июля 2020 г.',
    temperature: '-70,7 ° F',
    windspeed: '11,5 миль/ч',
    pressure: '766,9  ПА',
  });
  if (res) {
    document.getElementById('main_data').textContent = 'Данные добавленны успешно!';
    getData();
  } else document.getElementById('main_data').textContent = 'Ошибка в добавление данных';
}, 1500);
