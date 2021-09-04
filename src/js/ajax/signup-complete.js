import 'regenerator-runtime/runtime';
import axios from 'axios';

import handleError from '../utils/handleError';

import {
  addFlashMessage,
  clearFlashMessages,
} from '../component-functions/flash-messages';

const form = document.getElementById('signup-complete-form');
const btn = document.getElementById('signup-complete-form-btn');

if (form) {
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      passwordConfirm: formData.get('passwordConfirm'),
    };

    if (btn) {
      btn.setAttribute('disabled', 'disabled');
    }

    try {
      if (data.password !== data.passwordConfirm) {
        handleError('Password and confirm password are not same');

        if (btn) {
          btn.removeAttribute('disabled');
        }

        return;
      }

      const res = await axios({
        method: 'POST',
        url: `/api/v1/users/signup`,
        data,
      });

      clearFlashMessages();
      addFlashMessage('success', 'Signup sucessful. Redirecting...');

      setTimeout(() => {
        window.location = '/';
      }, 1000);
    } catch (err) {
      handleError(err);
      if (btn) {
        btn.removeAttribute('disabled');
      }
    }
  });
}
