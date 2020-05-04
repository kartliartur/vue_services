import axios from 'axios';
import Vue from 'vue';

Vue.use(axios);

export default {
  dateToInputs: (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    let month_after = date.getMonth() + 2;
    let month_before = date.getMonth();
    if (month < 10) month = `0${month}`;
    if (month_after < 10) month_after = `0${month_after}`;
    if (month_before < 10) month_before = `0${month_before}`;
    if (day < 10) day = `0${day}`;
    return [day, month, year, month_after, month_before];
  },
  dateToDef: (date) => {
    const year = date.substr(0, 4);
    const month = +date.substr(5, 2);
    const day = +date.substr(8, 2);
    return [year, month - 1, day];
  },
  getTodayDateToInput() {
    const today = new Date();
    return this.dateToInputs(today);
  },
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
			  Authorization: `Token ${localStorage.getItem('token')}`,
			},
    })
      .then((res) => {
        success(res);
        setTimeout(() => {
          preloadScreen.removeAttribute('style');
        });
      })
      .catch((res) => {
        if (res == 'Error: Request failed with status code 401') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('role');
          window.location.reload();
        } else { error(); }
        setTimeout(() => {
          preloadScreen.removeAttribute('style');
        });
      });
  },
};
