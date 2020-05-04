import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categorys: [
      {
        name: 'Заказы',
        img: 'orders',
        link: '/orders',
        links: [
          {
            name: 'Список покупок',
            link: '/shoppinglist',
          },
          {
            name: 'Быстрый доступ к документам',
            link: '/docsaccess',
          },
          {
            name: 'Оформление новых заказов в 2 клика',
            link: '/simpleorder',
          },
        ],
      },
      {
        name: 'Доставка',
        img: 'delivery',
        link: '/delivery',
        links: [
          {
            name: 'Контроль поступления товара',
            link: '/productcontrol',
          },
          {
            name: 'Данные о машинах и водителях',
            link: '/aboutcars',
          },
          {
            name: 'Отслеживание местоположения на карте',
            link: '/placeholder',
          },
        ],
      },
      {
        name: 'Отчеты',
        img: 'reports',
        link: '/reports',
        links: [
          {
            name: 'График закупок',
            link: '/purchaseschedule',
          },
          {
            name: 'Анализ цен',
            link: '/priceanalys',
          },
          {
            name: 'Анализ продаж',
            link: '/salesanalys',
          },
        ],
      },
      {
        name: 'Документы',
        img: 'docs',
        link: '/docs',
        links: [
          {
            name: 'Загрузка документов компании',
            link: '/docsloader',
          },
        ],
      },
      {
        name: 'Взаимодействие',
        img: 'interaction',
        link: '/interaction',
        links: [
          {
            name: 'Текущие авансы',
            link: '/debts',
          },
          {
            name: 'Формирование актов сверки',
            link: '/acts',
          },
          {
            name: 'Контроль лимитов',
            link: '/limits',
          },
          {
            name: 'График платежей',
            link: '/paysschedule',
          },
        ],
      },
      {
        name: 'Справка',
        img: 'instructions',
        link: '/instructions',
        links: [
          {
            name: 'Инструкция по работе в личном кабинете',
            link: '/instruction',
          },
        ],
      },
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
