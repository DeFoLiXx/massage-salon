const tabButtons = document.querySelectorAll('.banquet-tabs .tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Сбрасываем активность у всех кнопок и панелей
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    // Делаем активной текущую кнопку и соответствующую панель
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});
async function loadMenu() {

  const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTOfP5Fv8FyvKUWJbIk9_dgWRRa8IYRd6WrSwxLuSXuBBrzfurj4zLzAF0Fp8G5rvsp8hQwZ0abfehE/pub?output=csv';

  const response = await fetch(csvUrl);
  const csvText = await response.text();

  // Преобразуем CSV в массив объектов
  const rows = csvText.trim().split('\n');
  const headers = rows[0].split(',');

  const data = rows.slice(1).map(row => {
    const values = row.split(',');
    const obj = {};

    headers.forEach((h, i) => {
      obj[h.trim()] = values[i] ? values[i].trim() : '';
    });

    return obj;
  });

  // Подставляем данные в HTML
  data.forEach(item => {

    const el = document.querySelector(`[data-id="${item.id}"]`);
    if (!el) return;

    const nameEl = el.querySelector('h4');
    const compEl = el.querySelector('.composition');
    const weightEl = el.querySelector('.weight');
    const priceEl = el.querySelector('.price');
    const imgEl = el.querySelector('img');

    if (nameEl) nameEl.textContent = item.name || '';

    if (compEl) compEl.textContent = item.composition || '';

    if (weightEl) {
      if (item.weight && item.weight.trim() !== '') {
        weightEl.textContent = item.weight + (item.unit ? ` ${item.unit}` : '');
      } else {
        weightEl.textContent = '';
      }
    }

    if (priceEl) {
      if (item.price && item.price.trim() !== '') {
        priceEl.textContent = item.price + ' ₴';
      } else {
        priceEl.textContent = '';
      }
    }

    if (imgEl && item.image) {
      imgEl.src = item.image;
      imgEl.alt = item.name || '';
    }

  });
}

// Загружаем меню после загрузки страницы
window.addEventListener('DOMContentLoaded', loadMenu);
async function loadComplexLunch() {

  const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTGy1VetOnUrXx1I4TvZ7E-q1yf3QE9TdCKdq0MiOEe4tlt2VxrwA_DwBaNkOI3h7AzNRrmgaq3Xzzx/pub?output=csv';

  const response = await fetch(csvUrl);
  const csvText = await response.text();

  const rows = csvText.trim().split('\n');
  const headers = rows[0].split(',');

  const data = rows.slice(1).map(row => {
    const values = row.split(',');
    const obj = {};

    headers.forEach((h, i) => {
      obj[h.trim()] = values[i] ? values[i].trim() : '';
    });

    return obj;
  });

  data.forEach(item => {

    const el = document.querySelector(`[data-id="${item.id}"]`);
    if (!el) return;

    const titleEl = el.querySelector('h2');
    const compEl = el.querySelector('.composition');
    const priceEl = el.querySelector('.price');

    if (titleEl) titleEl.textContent = item.name || '';
    if (compEl) compEl.textContent = item.composition || '';

    if (priceEl) {
      if (item.price && item.price.trim() !== '') {
        priceEl.textContent = item.price + ' грн';
      } else {
        priceEl.textContent = '';
      }
    }

  });
}
window.addEventListener('DOMContentLoaded', () => {
  loadMenu();
  loadComplexLunch();
});
async function loadNewItems() {

  const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0skexkX_6UAWqnCQdK-47rla8vPXhbr_Gn86e7O5dTzJaH6k2BlpBzQbf7xDoT3adsfLvJDuHHwTa/pub?output=csv';

  const response = await fetch(csvUrl);
  const csvText = await response.text();

  const rows = csvText.trim().split('\n');
  const headers = rows[0].split(',');

  const data = rows.slice(1).map(row => {
    const values = row.split(',');
    const obj = {};

    headers.forEach((h, i) => {
      obj[h.trim()] = values[i] ? values[i].trim() : '';
    });

    return obj;
  });

  const container = document.querySelector('.new-items-list');

  data.forEach(item => {
    const el = document.createElement('div');
    el.classList.add('new-item');

    el.innerHTML = `
      <div class="left">
        <span class="name">${item.name}</span>
      </div>

      <div class="center">
        ${item.weight ? item.weight + ' ' + (item.unit || '') : ''}
      </div>

      <div class="right">
        ${item.price ? item.price + ' грн' : ''}
      </div>
    `;

    container.appendChild(el);
  });
}

window.addEventListener('DOMContentLoaded', loadNewItems);

const btn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});

btn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
