import Vue from 'vue';
import Vuex from 'vuex';
import Funcs from '../assets/js-funcs/default-funcs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    company_name: 'Без компании',
    user: null,
    categories: [],
    base_url: 'https://personal.back.kartli.ch/api/v1',
    host_url: 'https://personal.back.kartli.ch',
    inn: '',
    activeAppData: {},
  },
  mutations: {
    categoriesMutation(state, value) { state.categories = value; },
    setUser(state, value) { state.user = value; },
    serCompanyName(state, value) { state.company_name = value; },
    setINN(state, value) { state.inn = value; },
    setActiveAppDate(state, value) { state.activeAppData = value; },
  },
  actions: {
    async login(context, app) {
      let cooks = document.cookie;
      cooks = cooks.substring(cooks.indexOf('passport_session_id='));
      cooks = cooks.replace('passport_session_id=', '');
      const promise = new Promise((resolve) => {
        if (context.state.user === null) {
          Funcs.doRequest(
            'post',
            `${context.state.base_url}/auth/data`,
            {
              session: cooks,
            },
            null,
            'json',
            (res) => {
              if (res.data.error) {
                resolve({
                  text: 'У вас нет прав на получение данных, авторизируйтесь или зарегистрируйтесь в системе',
                  error: true,
                });
              } else {
                context.commit('categoriesMutation', res.data.data.categories);
                context.commit('serCompanyName', res.data.data.user.company.short_name);
                context.commit('setUser', res.data.data.user);
                if (localStorage.getItem('admin_inn') === undefined && context.state.user.user.is_superuser === false) {
                  context.commit('setINN', res.data.data.user.company.inn);
                } else {
                  context.commit('setINN', localStorage.getItem('admin_inn'));
                }
                Funcs.getAppData(context, app)
                  .then((response) => resolve({
                    result: response,
                    error: false,
                  }));
              }
            },
            () => { window.console.log('ERROR'); },
          );
        } else {
          Funcs.getAppData(context, app)
            .then((response) => resolve({
              result: response,
              error: false,
            }));
        }
      });
      const result = await promise;
      return result;
    },
  },
  modules: {
  },
});
