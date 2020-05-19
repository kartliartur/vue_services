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
      const { data } = app;
      data.INN = context.state.inn;
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
