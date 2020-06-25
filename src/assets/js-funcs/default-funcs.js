import axios from 'axios';
import Vue from 'vue';

Vue.use(axios);

export default {
  async repeatRequest(INN, Comment, guid, path) {
    const promise = new Promise((resolve) => {
      this.doRequest(
        'post',
        path,
        {
          INN,
          Comment,
          Document_GUID: guid,
        },
        null,
        'json',
        (res) => {
          resolve(res);
        },
        () => { resolve('ERROR'); },
      );
    });
    const response = await promise;
    return response;
  },
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
  async downloadFile(blob, fileName, contentType) {
    // if (content_type != 'aplication/pdf') {
    //   var newBlob = new Blob([s2ab(btoa(blob))], {type: content_type});
    // } else {
    //   var newBlob = new Blob([blob], {type: content_type});
    // }
    const newBlob = new Blob([blob], { type: contentType });
    const reader = new FileReader();
    const promise = new Promise((resolve) => {
      let text = '';
      let result = true;
      let flag = false;
      window.console.log(fileName);
      reader.addEventListener('loadend', (e) => {
        text = e.srcElement.result;
        flag = text.includes('{"error": true, "report":');
        if (flag) {
          result = false;
        } else {
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return true;
          }
          const data = window.URL.createObjectURL(newBlob);
          const link = document.createElement('a');
          link.href = data;
          link.download = fileName;
          link.click();
        }
        resolve(result);
        return true;
      });
    });

    reader.readAsText(newBlob);
    const res = await promise;

    return res;
  },
  doRequest(type, url, data, params, rT, success, error) {
    const preloadScreen = document.getElementById('preload');
    preloadScreen.setAttribute('style', 'display: flex;');
    let cooks = document.cookie;
    cooks = cooks.substring(cooks.indexOf('passport_session_id='));
    cooks = cooks.replace('passport_session_id=', '');
    axios({
      url,
      method: type,
      responseType: rT,
      data,
      params,
      headers:
      {
        Session: cooks,
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
        }, 1000);
      });
  },
  filterByParams(arr, category, name) {
    if (arr.length > 0) {
      return arr
        .filter((item) => item.link.substr(1) === category)[0].links
        .filter((item) => item.link === name)[0];
    }
    return false;
  },
  async getAppData(context, app) {
    if (app !== undefined) {
      const promise = new Promise((resolve) => {
        const appObj = this.filterByParams(context.state.categories, app.category, app.name);
        const { data } = app;
        data.INN = context.state.inn;
        if (appObj.inputs.filter((item) => item.label === 'date_start')[0] !== undefined) {
          data.DateFirst = appObj.inputs.filter((item) => item.label === 'date_start')[0].value;
        }
        if (appObj.inputs.filter((item) => item.label === 'date_end')[0]) {
          data.DateLast = appObj.inputs.filter((item) => item.label === 'date_end')[0].value;
        }
        this.doRequest(
          'post',
          context.state.base_url + appObj.path_get,
          data,
          null,
          'json',
          (res) => {
            if (res.data.data.data !== undefined) {
              window.console.log(res.data.data);
              context.commit('setActiveAppDate', res.data.data);
            } else {
              context.commit('setActiveAppDate', res.data);
            }
            window.console.log(context.state);
            resolve(res.data);
          },
          () => {
            window.console.log('ERRROR');
            context.commit('setActiveAppDate', { report: 'Что-то пошло не так, сообщите нам об ошибке!' });
          },
        );
      });
      const res = await promise;
      return res;
    }
    return null;
  },
  addElementToArray(arr, index, val) {
    const result = arr;
    while (result.length <= index) {
      result.push(null);
    }
    result[index] = val;
    return result;
  },
};
