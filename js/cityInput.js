const cities = [
    "Київ", "Харків", "Чернігів", "Одеса", "Дніпро", "Львів", "Запоріжжя", "Кривий Ріг", "Миколаїв", "Маріуполь", "Вінниця"
];

const input = document.getElementById('cityInput');
const suggestionsBox = document.getElementById('suggestions');

input.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  suggestionsBox.innerHTML = '';

  if (query.length === 0) {
    suggestionsBox.style.display = 'none';
    return;
  }

  const filteredCities = cities.filter(city => city.toLowerCase().startsWith(query));

  if (filteredCities.length === 0) {
    suggestionsBox.style.display = 'none';
    return;
  }

  filteredCities.forEach(city => {
    const div = document.createElement('div');
    div.classList.add('suggestion-item');
    div.textContent = city;
    div.addEventListener('click', function() {
      input.value = city;
      suggestionsBox.innerHTML = '';
      suggestionsBox.style.display = 'none';
    });
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = 'block';
});
