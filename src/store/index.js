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
            description: '',
          },
          {
            name: 'Быстрый доступ к документам',
            link: '/docsaccess',
            description: '',
          },
          {
            name: 'Оформление новых заказов в 2 клика',
            link: '/simpleorder',
            description: '',
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
            description: 'Оперативная информация о количестве оформленного к отгрузке',
          },
          {
            name: 'Данные о машинах и водителях',
            link: '/aboutcars',
            description: 'Полная информация о доставке с возможностью отслеживания местоположения на карте',
          },
          {
            name: 'Отслеживание местоположения на карте',
            link: '/placeholder',
            description: '',
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
            description: 'График закупок по месяцам',
          },
          {
            name: 'Анализ цен',
            link: '/priceanalys',
            description: 'Диаграмма цен по месяцам',
          },
          {
            name: 'Анализ продаж',
            link: '/salesanalys',
            description: '',
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
            description: '',
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
            description: '',
          },
          {
            name: 'Формирование актов сверки',
            link: '/acts',
            description: 'Online формирование акта-сверки',
          },
          {
            name: 'Контроль лимитов',
            link: '/limits',
            description: 'Информация о состоянии кредитных лимитов',
          },
          {
            name: 'График платежей',
            link: '/paysschedule',
            description: '',
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
            description: '',
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
