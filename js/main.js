function mainFunction() {
  const searchParams = new URLSearchParams(location.search);

  const modal = searchParams.get('modal');
  const form = document.getElementById('form');

  Array.from(form).forEach((el) => {
    el.addEventListener('input', () => {
      el.classList.remove('input-invalid');
    });
  });

  if (modal) {
    Array.from(form).forEach((el) => {
      el.classList.contains(modal)
        ? (el.style.display = 'flex')
        : (el.style.display = 'none');
      el.style.display === 'none' ||
      el.name === 'checkbox' ||
      el.name === 'submit'
        ? el.removeAttribute('required')
        : el.setAttribute('required', 'required');
      el.addEventListener('input', () => {
        el.classList.remove('input-invalid');
      });
    });
    const label = document.querySelector('.label-checkbox');
    if (form.checkbox.style.display === 'none') {
      label.style.display = 'none';
    } else {
      label.style.display = 'flex';
    }

    const links = document.getElementsByClassName('link');
    Array.from(links).forEach((el) => {
      el.classList.contains(modal)
        ? (el.style.display = 'inline-block')
        : (el.style.display = 'none');
    });

    const title = document.getElementById('title');
    if (modal === 'forgot') {
      title.innerHTML = 'Восстановление пароля';
      form.submit.innerHTML = 'Отправить код';
    } else if (modal === 'register') {
      form.submit.innerHTML = 'Зарегистрироваться';
      title.innerHTML = 'Регистрация';
    } else if (modal === 'authorization') {
      form.submit.innerHTML = 'Войти';
      title.innerHTML = 'Авторизация';
    }
  }

  form.submit.addEventListener('click', () => {
    const errors = [];
    if (modal === 'authorization') {
      if (!form.email.value) {
        form.email.classList.add('input-invalid');
        errors.push({
          message: 'Введите Email',
        });
      }
      if (!form.password.value) {
        form.password.classList.add('input-invalid');
        errors.push({
          message: 'Введите пароль',
        });
      }
    } else if (modal === 'register') {
      if (form.password.value !== form.repeat.value) {
        form.password.classList.add('input-invalid');
        errors.push({
          message: 'Пароли не совпадают',
        });
      }
      if (!form.user.value) {
        form.user.classList.add('input-invalid');
        errors.push({
          message: 'Введите имя',
        });
      }
      if (!form.email.value) {
        form.email.classList.add('input-invalid');
        errors.push({
          message: 'Введите Email',
        });
      }

      if (!form.password.value) {
        form.password.classList.add('input-invalid');
        errors.push({
          message: 'Введите пароль',
        });
      }
      if (!form.repeat.value) {
        form.repeat.classList.add('input-invalid');
        errors.push({
          message: 'Повторите пароль',
        });
      }
    } else if (modal === 'forgot') {
      if (!form.email.value) {
        form.email.classList.add('input-invalid');
        errors.push({
          message: 'Введите Email',
        });
      }
    } else if (!modal) {
      if (!form.email.value) {
        form.email.classList.add('input-invalid');
        errors.push({
          message: 'Введите Email',
        });
      }
      if (!form.password.value) {
        form.password.classList.add('input-invalid');
        errors.push({
          message: 'Введите пароль',
        });
      }
    }

    if (errors.length) {
      const container = document.getElementById('errors');
      container.innerHTML = '';
      const ul = document.createElement('ul');
      ul.classList.add('errors-list');
      const err = new Error();
      err.errorMessages = errors;
      for (const errorMessage of err.errorMessages) {
        const li = document.createElement('li');
        li.innerHTML = `${errorMessage.message}`;
        ul.append(li);
      }
      container.append(ul);
      throw err;
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (form.password.value !== form.repeat.value && modal === 'register') {
      return;
    }

    if (!form.checkbox.checked) {
      form.checkbox.value = 'off';
    }
    form.checkbox.addEventListener('change', () => {
      if (form.checkbox.checked) {
      } else {
        form.checkbox.value = 'off';
      }
    });

    Array.from(form).forEach((el) => {
      const { name, value } = el;
      console.log({ name, value });
    });

    const container = document.getElementById('errors');
    container.innerHTML = 'Успешно отправлено!';
    container.style.color = 'blue';
    setTimeout(() => {
      container.innerHTML = '';
    }, 3000);
  });

  nameValidator(form.user);
}

function nameValidator(input) {
  const expectedString =
    'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ -';
  input.addEventListener('keypress', (event) => {
    const newKey = event.key;
    if (!expectedString.includes(newKey)) {
      event.preventDefault();
    }
    if (input.name === 'name' || input.name === 'surname') {
      if (!(input.value === '')) {
        input.classList.remove('modal-input-red');
      }
    }
  });

  input.addEventListener('blur', () => {
    let inputString = input.value;
    inputString = inputString.replace(/^[\s\-]+/g, '');
    inputString = inputString.replace(/[\s\-]+$/g, '');

    inputString = inputString.replace(/\-{2,}/g, '-');
    inputString = inputString.replace(/\s{1,}/g, '');

    inputString =
      inputString[0].toUpperCase() + inputString.slice(1).toLowerCase();

    let inputStringarr = inputString.split('');
    let inputStringWithoutLatin = '';
    inputStringarr.forEach((symb) => {
      if (expectedString.includes(symb)) {
        inputStringWithoutLatin = inputStringWithoutLatin + symb;
      }
    });
    input.value = inputStringWithoutLatin;
  });
}

mainFunction();
