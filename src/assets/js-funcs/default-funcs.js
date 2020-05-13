import axios from 'axios';
import Vue from 'vue';

Vue.use(axios);

export default {
  doRequest(type, url, data, params, success, error) {
    const preloadScreen = document.getElementById('preload');
    preloadScreen.setAttribute('style', 'display: flex;');
    axios({
      method: type,
      url,
      data,
      params,
      headers:
      {
        Session: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        success(res);
        setTimeout(() => {
          preloadScreen.removeAttribute('style');
        });
      })
      .catch((res) => {
        if (res === 'Error: Request failed with status code 401') {
          window.console.log('401');
        } else { error(); }
        setTimeout(() => {
          preloadScreen.removeAttribute('style');
        });
      });
  },
};
