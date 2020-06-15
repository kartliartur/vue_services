import Vue from 'vue';
import Vuex from 'vuex';
import Funcs from '../assets/js-funcs/default-funcs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    company_name: 'Без компании',
    user: null,
    categories: [],
    base_url: 'https://personal.back.unlogic.ru/api/v1',
    host_url: 'https://personal.back.unlogic.ru',
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
    login: (context, app) => {
      if (context.state.user === null) {
        Funcs.doRequest(
          'post',
          'https://personal.back.unlogic.ru/api/v1/auth/data',
          {
            session: '881pij7libmh3br91b27n5hk1eur28s7',
          },
          null,
          'json',
          (res) => {
            context.commit('categoriesMutation', res.data.data.categories);
            context.commit('serCompanyName', res.data.data.user.company.short_name);
            context.commit('setUser', res.data.data.user);
            if (localStorage.getItem('admin_inn') === undefined && context.state.user.user.is_superuser === false) {
              context.commit('setINN', res.data.data.user.company.inn);
            } else {
              context.commit('setINN', localStorage.getItem('admin_inn'));
            }
            Funcs.getAppData(context, app);
          },
          () => { window.console.log('ERROR'); },
        );
      } else {
        Funcs.getAppData(context, app);
      }
    },
  },
  modules: {
  },
});
