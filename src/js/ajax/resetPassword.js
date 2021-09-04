import 'regenerator-runtime/runtime';
import axios from 'axios';

import handleError from '../utils/handleError';

import {
  addFlashMessage,
  clearFlashMessages,
} from '../component-functions/flash-messages';

const form = document.getElementById('reset-password-form');
const btn = document.getElementById('reset-password-form-btn');

if (form) {
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    const data = {
      password: formData.get('password'),
      passwordConfirm: formData.get('passwordConfirm'),
    };

    const token = formData.get('token');

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
        method: 'PATCH',
        url: `/api/v1/users/resetpassword/${token}`,
        data,
      });

      clearFlashMessages();
      addFlashMessage(
        'success',
        'Password sucessfully reseted. Redirecting...'
      );

      setTimeout(() => {
        window.location = '/home';
      }, 1000);
    } catch (err) {
      handleError(err);
      if (btn) {
        btn.removeAttribute('disabled');
      }
    }
  });
}