document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('orderForm');
  const submitBtn = document.getElementById('submitBtn');
  const successBlock = document.getElementById('successBlock');

  // 🔤 Текстові поля — тільки букви та пробіли
  form.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^а-яА-ЯёЁa-zA-Z\sіІїЇєЄґҐ]/g, '');
    });
  });

  // 📞 Телефони — тільки цифри та + на початку
  form.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9+]/g, '');
      if (input.value.indexOf('+') > 0) {
        input.value = input.value.replace(/\+/g, '');
      }
    });
  });

  submitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Очистити помилки
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.error-msg').forEach(el => el.remove());

    let valid = true;

    const addError = (input, msg) => {
      input.classList.add('error');
      const label = document.createElement('label');
      label.className = 'error-msg';
      label.textContent = msg;
      input.parentElement.appendChild(label);
    };

    // Валідація текстових, тел., email
    const inputs = form.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]');
    inputs.forEach(input => {
      const val = input.value.trim();
      const type = input.type;

      if (val === '') {
        addError(input, 'Це поле обов’язкове');
        valid = false;
        return;
      }

      if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          addError(input, 'Невірний формат email');
          valid = false;
        }
      }

      if (type === 'tel') {
        const phoneRegex = /^\+380\d{9}$/;
        if (!phoneRegex.test(val)) {
          addError(input, 'Телефон має бути у форматі +380XXXXXXXXX');
          valid = false;
        }
      }
    });

    // Валідація SELECT
    const selects = form.querySelectorAll('select');
    selects.forEach(select => {
      if (!select.value || select.value.trim() === '') {
        addError(select, 'Оберіть значення');
        valid = false;
      }
    });

    // Валідація RADIO
    const radioGroups = ['radio'];
    radioGroups.forEach(name => {
      const radios = form.querySelectorAll(`input[name="${name}"]`);
      const checked = Array.from(radios).some(r => r.checked);
      if (!checked) {
        addError(radios[0].parentElement, 'Оберіть варіант');
        valid = false;
      }
    });

    if (!valid) return;

    // 🔄 Імітація відправки (без fetch)
    setTimeout(() => {
        form.style.display = 'none';
        successBlock.style.display = 'block';

        // Ховаємо заголовок
        const title = document.querySelector('.form .title');
        if (title) title.style.display = 'none';

        // Ховаємо футер
        const footer = document.querySelector('footer');
        if (footer) footer.style.display = 'none';
    }, 1000);
  });
});
