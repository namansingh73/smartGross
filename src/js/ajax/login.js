import 'regenerator-runtime/runtime';
import axios from 'axios';

import handleError from '../utils/handleError';

import {
  addFlashMessage,
  clearFlashMessages,
} from '../component-functions/flash-messages';

const form = document.getElementById('login-form');
const btn = document.getElementById('login-form-btn');

if (form) {
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    if (btn) {
      btn.setAttribute('disabled', 'disabled');
    }

    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/login',
        data,
      });

      clearFlashMessages();
      addFlashMessage('success', 'Login sucessful. Redirecting...');

      let location = new URLSearchParams(window.location.search).get(
        'redirect'
      );

      if (location) {
        location = decodeURIComponent(location);
      } else {
        location = '/';
      }

      setTimeout(() => {
        window.location = location;
      }, 1000);
    } catch (err) {
      handleError(err);
      if (btn) {
        btn.removeAttribute('disabled');
      }
    }
  });
}
