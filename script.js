// عناصر الصفحة
const loginSection = document.getElementById('login-section');
const appSection = document.getElementById('app-section');
const loginForm = document.getElementById('loginForm');
const userArea = document.getElementById('userArea');
const form = document.getElementById('priceForm');
const tableBody = document.getElementById('pricesBody');
const themeToggle = document.getElementById('themeToggle');

// ---------- المستخدم ----------
function getUser() {
  return localStorage.getItem('username');
}

function setUser(name) {
  localStorage.setItem('username', name);
}

function logout() {
  localStorage.removeItem('username');
  location.reload();
}

function renderUserArea() {
  const user = getUser();
  if (user) {
    userArea.innerHTML =
      '<div class="user-badge">مرحبا ' + user + ' <button id="logoutBtn">خروج</button></div>';
    document.getElementById('logoutBtn').addEventListener('click', logout);
  } else {
    userArea.innerHTML = '';
  }
}

function checkLogin() {
  const user = getUser();
  if (user) {
    loginSection.classList.add('hidden');
    appSection.classList.remove('hidden');
  } else {
    loginSection.classList.remove('hidden');
    appSection.classList.add('hidden');
  }
  renderUserArea();
}

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('loginName').value.trim();
  if (!name) return;
  setUser(name);
  checkLogin();
});

// ---------- الدارك مود ----------
function applyTheme() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', function() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', isDark);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// ---------- الأسعار ----------
function loadPrices() {
  const saved = localStorage.getItem('prices');
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

function savePrices(prices) {
  localStorage.setItem('prices', JSON.stringify(prices));
}

function renderPrices() {
  const prices = loadPrices();
  tableBody.innerHTML = '';
  prices.slice().reverse().forEach(function(item) {
    const row = document.createElement('tr');
    row.innerHTML =
      '<td>' + item.name + '</td>' +
      '<td>' + item.price + ' ج.م</td>' +
      '<td>' + item.place + '</td>' +
      '<td>' + item.date + '</td>' +
      '<td>' + (item.user || '—') + '</td>';
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('itemName').value.trim();
  const price = document.getElementById('itemPrice').value.trim();
  const place = document.getElementById('itemPlace').value.trim();
  const user = getUser() || 'زائر';

  if (!name || !price || !place) {
    return;
  }

  const today = new Date();
  const dateStr = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const prices = loadPrices();
  prices.push({ name: name, price: price, place: place, date: dateStr, user: user });
  savePrices(prices);

  form.reset();
  renderPrices();
});

// ---------- بدء التشغيل ----------
applyTheme();
checkLogin();
renderPrices();