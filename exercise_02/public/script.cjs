const provinceSelect = document.getElementById('province-select');
const result = document.getElementById('result');


provinceSelect.addEventListener('change', async () => {
  const city = provinceSelect.value;

  if (city) {
    const response = await fetch(`/api/plates/${city}`);
    const data = await response.json();
    result.textContent = `Biển số xe: ${data.plate}`;
  } else {
    result.textContent = '';
  }
});


async function loadProvinces() {
  const response = await fetch('/api/provinces');
  const provinces = await response.json();

  provinces.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    provinceSelect.appendChild(option);
  });
}


loadProvinces();
