const form = document.getElementById('priceForm');
const tableBody = document.getElementById('pricesBody');

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
      '<td>' + item.date + '</td>';
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('itemName').value.trim();
  const price = document.getElementById('itemPrice').value.trim();
  const place = document.getElementById('itemPlace').value.trim();

  if (!name || !price || !place) {
    return;
  }

  const today = new Date();
  const dateStr = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const prices = loadPrices();
  prices.push({ name: name, price: price, place: place, date: dateStr });
  savePrices(prices);

  form.reset();
  renderPrices();
});

renderPrices();