import axios from 'axios';
import Vue from 'vue';

Vue.use(axios);

export default {
  dateToInputs: (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    let monthBefore = date.getMonth() - 2;
    if (month < 10) month = `0${month}`;
    if (monthBefore < 10) monthBefore = `0${monthBefore}`;
    if (day < 10) day = `0${day}`;
    return [day, month, year, monthBefore];
  },
  downloadFile(blob, fileName, contentType) {
    // if (content_type != 'aplication/pdf') {
    //   var newBlob = new Blob([s2ab(btoa(blob))], {type: content_type});
    // } else {
    //   var newBlob = new Blob([blob], {type: content_type});
    // }
    const newBlob = new Blob([blob], { type: contentType });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }
    const data = window.URL.createObjectURL(newBlob);
    const link = document.createElement('a');
    link.href = data;
    link.download = fileName;
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
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
        Session: '881pij7libmh3br91b27n5hk1eur28s7',
      },
    })
      .then((res) => {
        success(res);
        setTimeout(() => {
          preloadScreen.removeAttribute('style');
        }, 1000);
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
  filterByParams(arr, category, name) {
    return arr
      .filter((item) => item.img === category)[0].links
      .filter((item) => item.link === name)[0];
  },
  getAppData(context, app) {
    if (app !== undefined) {
      const appObj = this.filterByParams(context.state.categories, app.category, app.name);
      window.console.log(appObj);
      const { data } = app;
      data.INN = context.state.inn;
      if (appObj.date_start !== undefined) {
        data.DateFirst = appObj.date_start;
        data.DateLast = appObj.date_end;
      }
      this.doRequest(
        'post',
        context.state.base_url + appObj.path_get,
        data,
        null,
        (res) => {
          context.commit('setActiveAppDate', res.data);
        },
        () => {
          window.console.log('ERRROR');
          context.commit('setActiveAppDate', { report: 'Что-то пошло не так, сообщите нам об ошибке!' });
        },
      );
    }
  },
};
