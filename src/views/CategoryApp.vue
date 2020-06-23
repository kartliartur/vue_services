<template>
  <div class="category-app">
    <errorWrap v-if="is_error" :text="error_text"/>
    <div v-else class="category-app-title">
      <img :src="getPath(getAppObject)" width="36px">
      <h1>{{ getAppObject.name }}</h1>
    </div>
    <div v-if="!is_error" class="category-app-content">
      <div class="actions-bar">
        <div class="content-item" v-for="(item, idx) in getAppObject.inputs" :key="idx">
          <input :type="item.type" v-model="item.value" :name="item.label">
        </div>
        <button @click="login(true)" v-show="checkInputs">Сформировать</button>
        <div class="placeholder-updater">
          <button v-show="checkPlaceholder" @click="updatePlaceholder()">
            Определить текущее местоположение
          </button>
          <spinner :width="3" v-show="spinnerShow"/>
        </div>
        <button @click="downloadReq()">Загрузить</button>
      </div>
      <h2 v-if="checkAppReport">
        {{ this.$store.state.activeAppData.report }}
      </h2>
      <h2 v-else-if="checkAppData">
        Список пуст
      </h2>
      <myTable v-else
        :data="this.$store.state.activeAppData.data"
        :category="this.getCategoryName"
        :app="this.getAppName"/>
    </div>
    <MyNotification :text="notification_text" :textColor="notification_color"
      :isShow="notification_show" @toggleNotif="notification_show=false"/>
  </div>
</template>

<script type="text/javascript">

import Funcs from '@/assets/js-funcs/default-funcs';
import myTable from '@/components/myTable.vue';
import spinner from '@/components/spinner.vue';
import MyNotification from '@/components/myNotification.vue';
import errorWrap from '@/components/errorWrap.vue';

export default {
  name: 'CategoryApp',
  components: {
    myTable,
    MyNotification,
    spinner,
    errorWrap,
  },
  data: () => ({
    showModal: false,
    notification_text: '',
    notification_color: '',
    notification_show: false,
    spinnerShow: false,
    error_text: '',
    is_error: false,
  }),
  methods: {
    updatePlaceholder() {
      Funcs.doRequest(
        'post',
        this.$store.state.base_url + this.getAppObject.path_post,
        {
          INN: this.$store.state.inn,
        },
        null,
        'json',
        (res) => {
          if (!res.data.data.error) {
            this.showNotificaction(res.data.data.data, '#66ab55');
            this.spinnerShow = true;
            setTimeout(() => {
              this.spinnerShow = false;
              window.location.reload();
            }, 60000);
          } else {
            this.showNotificaction(res.data.data.data, '#c23616');
          }
        },
        () => {
          this.showNotificaction('Сервер временно недоступен, попробуйте позже', '#c23616');
        },
      );
    },
    getPath(item) {
      if (item !== undefined) {
        return this.$store.state.host_url + item.icon_path;
      }
      return '';
    },
    login(flag) {
      let isValid = true;
      if (flag) {
        isValid = this.inputsValidate();
      }
      if (isValid) {
        this.$store.dispatch('login', {
          name: this.getAppName,
          category: this.getCategoryName,
          data: {},
        })
          .then((resolve) => {
            if (resolve !== true) {
              this.is_error = true;
              this.error_text = resolve;
            }
          });
      }
    },
    inputsValidate() {
      const { inputs } = this.getAppObject;
      if (inputs.length > 1) {
        if (new Date(inputs[0].value) > new Date(inputs[1].value)) {
          this.showNotificaction('Дата начала должна быть раньше, чем дата конца', '#c23616');
          return false;
        }
      } else if (inputs.length === 1) {
        if (new Date(inputs[0].value) < new Date()) {
          this.showNotificaction('Дата должна быть не раньше текущей', '#c23616');
          return false;
        }
      }
      return true;
    },
    downloadReq() {
      const data = {};
      if (this.getAppObject.inputs.filter((item) => item.label === 'date_start')[0] !== undefined) {
        data.DateFirst = this.getAppObject.inputs.filter((item) => item.label === 'date_start')[0].value;
      }
      if (this.getAppObject.inputs.filter((item) => item.label === 'date_end')[0]) {
        data.DateLast = this.getAppObject.inputs.filter((item) => item.label === 'date_end')[0].value;
      }
      data.INN = this.$store.state.inn;
      Funcs.doRequest(
        'post',
        this.$store.state.base_url + this.getAppObject.path_download_excel,
        data || null,
        null,
        'blob',
        (res) => {
          Funcs.downloadFile(res.data, `${this.getAppObject.name}.xlsx`, 'arraybuffer')
            .then((resolve) => {
              if (!resolve) {
                this.showNotificaction('Данные за указанный период, не найдены', '#c23616');
              }
            });
        },
        () => {
          this.showNotificaction('Сервер временно недоступен, попробуйте позже', '#c23616');
        },
      );
    },
    showNotificaction(text, color) {
      this.notification_text = text;
      this.notification_color = color;
      this.notification_show = true;
    },
  },
  computed: {
    getCategoryName: () => window.location.pathname.substr(1, window.location.pathname.indexOf('/', 2) - 1),
    getAppName: () => window.location.pathname.substr(window.location.pathname.indexOf('/', 2)),
    getAppObject() {
      if (this.$store.state.categories.length > 0) {
        return Funcs
          .filterByParams(this.$store.state.categories, this.getCategoryName, this.getAppName);
      }
      return '';
    },
    checkAppData() {
      if (this.$store.state.activeAppData.data !== undefined) {
        if (this.$store.state.activeAppData.data.length === 0) {
          return true;
        }
      }
      return false;
    },
    checkAppReport() {
      if (this.$store.state.activeAppData.report !== undefined) {
        if (this.$store.state.activeAppData.report.length !== 0) {
          return true;
        }
      }
      return false;
    },
    checkInputs() {
      if (this.getAppObject.inputs !== undefined) {
        if (this.getAppObject.inputs.length > 0) {
          return true;
        }
      }
      return false;
    },
    checkPlaceholder() {
      if (this.getAppObject.link !== undefined) {
        if (this.getAppObject.link === '/aboutcars') {
          return true;
        }
      }
      return false;
    },
  },
  mounted() {
    this.login(false);
  },
};

</script>

<style lang="less">

@import url('../assets/less-templates/base.less');

.category-app {
  .flex(row, flex-start, center);
  flex-wrap: wrap;
  width: 100%;
  height: auto;

  & h2 {
    color: #fff;
    font-size: 1.5em;
    font-weight: 300;
  }

  & &-title {
    .flex(row, flex-start, flex-end);
    width: 100%;
    padding: 10px 0;
    & h1 {
      color: #fff;
      font-size: 2em;
      margin: 0 10px;
      letter-spacing: 1.5px;
      font-weight: 300;
    }
    & button {
      display: block;
      margin-left: auto;
      .button(5px, #fff, @green-color, 1);
    }
  }

  & &-content {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;

    & .actions-bar {
      .flex(row, flex-start, center);
      flex-wrap: wrap;
      width: 100%;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;

      & input {
        .input();
        margin: 10px 10px 10px 0;
      }

      & button {
        .button(5px, @green-color, #fff, 1);
        margin: 10px 10px 10px 0;
      }

      & button:last-child {
        display: block;
        margin-left: auto;
        margin-right: 0px;
      }

      & .placeholder-updater {
        .flex(row, flex-start, center);

        & .spinner {
          position: static;
          height: 30px;
          width: 30px;

          & .path {
            stroke: @green-color;
          }
        }
      }
    }

    & h2 {
      color: @black-color;
      padding: 10px;
      font-size: 1.3em;
    }
  }
}

@media screen and (max-width: 461px) {
  .category-app {
    & .category-app-content {
      & .actions-bar {
        button:last-child {
          margin-left: 0;
        }
      }
    }
  }
}

</style>
