<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th v-for="(td, i) in getApp.table_labels" :key="i"
            :style="{ width: (100/getApp.table_labels.length) + '%' }">
            {{ td.name_display }}
          </th>
        </tr>
      </thead>
      <tr v-for="(item, idx) in this.data" :key="idx"
          @click="requestAction(item)"
          :class="{ title: isLayout(item, 'Bold'), padded: isLayout(item, 'Padding') }">
        <td v-for="(elem, i) in displayedArr" :key="i"
          :style="{ width: (100/getApp.table_labels.length) + '%' }">
          {{ item[elem] }}
        </td>
      </tr>
    </table>
    <div :class="{ 'modal-wrap': true, 'active-modal-wrap': modalShow }">
      <div class="hover"></div>
      <div class="modal-frame">
        <span @click="modalShow=false" class="close">×</span>
        <h2>Документ</h2>
        <span class="subtitle">{{ modalSubtitle }}</span>
        <div class="frame-content">
          <div class="content-item" v-for="(item, idx) in modal_content" :key="idx">
            <span>{{ item.name }}</span>
            <select v-if="item.type === 'select'">
              <option :value="item.value">{{ item.value }}</option>
            </select>
            <span v-else-if="item.type === 'input'" class="like-input">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ 'modal-wrap': true, 'active-modal-wrap': actsModalShow }">
      <div class="hover"></div>
      <div class="modal-frame">
        <span @click="actsModalShow=false" class="close">×</span>
        <h2>Акт сверки</h2>
        <span class="subtitle">{{ actsModalSubtitle }}</span>
        <div class="frame-content">
          <div class="content-item" v-for="(value, key) in actsDates" :key="key">
            <input type="date" :value="value" :name="key">
          </div>
          <button @click="downloadFileReq()">Загрузить</button>
        </div>
      </div>
    </div>
    <MyNotification :text="notification_text" :textColor="notification_color"
      :isShow="notification_show" @toggleNotif="notification_show=false"/>
  </div>
</template>

<script type="text/javascript">

import Funcs from '@/assets/js-funcs/default-funcs';
import MyNotification from '@/components/myNotification.vue';

export default {
  name: 'myTable',
  components: {
    MyNotification,
  },
  props: ['data', 'category', 'app'],
  data: () => ({
    notification_text: '',
    notification_color: '',
    notification_show: false,
    modalShow: false,
    actsModalShow: false,
    actsModalSubtitle: '',
    modalSubtitle: '',
    activeObj: {},
    actsDates: {
      date_first: '',
      date_last: '',
    },
    modal_content: [
      {
        name: 'Номенклатура:',
        variable: 'Рroduct',
        type: 'select',
        value: '',
      },
      {
        name: 'Количество:',
        variable: 'Count',
        type: 'input',
        value: '',
      },
      {
        name: 'Цена:',
        variable: 'Price',
        type: 'input',
        value: '',
      },
      {
        name: 'Сумма:',
        variable: 'Amount',
        type: 'input',
        value: '',
      },
      {
        name: 'НДС:',
        variable: 'VAT',
        type: 'input',
        value: '',
      },
      {
        name: 'Сумма НДС:',
        variable: 'AmountVAT',
        type: 'input',
        value: '',
      },
    ],
  }),
  methods: {
    requestAction(obj) {
      if (this.getApp.actions.length > 0) {
        this.activeObj = obj;
        if (this.getApp.actions[0] === 'open_modal') {
          window.console.log('asd');
          this.openModalFunc();
        } else if (this.getApp.actions[0] === 'download_file') {
          this.actsModalShow = true;
          this.actsModalSubtitle = obj.Name;
          this.actsDates.date_first = `${Funcs.dateToInputs(new Date())[2]}-${Funcs.dateToInputs(new Date())[3]}-${Funcs.dateToInputs(new Date())[0]}`;
          this.actsDates.date_last = `${Funcs.dateToInputs(new Date())[2]}-${Funcs.dateToInputs(new Date())[1]}-${Funcs.dateToInputs(new Date())[0]}`;
        }
      }
    },
    isLayout(item, name) {
      if (item.Layout !== undefined) {
        return item.Layout[name];
      }
      return false;
    },
    openModalFunc() {
      Funcs.doRequest(
        'post',
        this.$store.state.base_url + this.getApp.path_post,
        {
          INN: this.$store.state.inn,
          GUID: this.activeObj.GUID,
        },
        null,
        'json',
        (res) => {
          if (res.data.error) {
            this.showNotificaction(res.data.report, '#c23616');
          } else {
            const keys = Object.keys(res.data.data[0]);
            this.modalSubtitle = this.activeObj.Document;
            for (let i = 0; i < this.modal_content.length; i += 1) {
              const item = this.modal_content[i];
              keys.map((elem) => {
                if (elem === item.variable) {
                  item.value = res.data.data[0][elem];
                }
                return true;
              });
            }
            this.modalShow = true;
          }
        },
        () => {
          this.showNotificaction('Сервер временно недоступен, попробуйте позже', '#c23616');
        },
      );
    },
    downloadFileReq() {
      Funcs.doRequest(
        'post',
        this.$store.state.base_url + this.getApp.path_post,
        {
          INN: this.$store.state.inn,
          Contract_GUID: this.activeObj.GUID,
          DateFirst: this.actsDates.date_first,
          DateLast: this.actsDates.date_last,
          Date: `${Funcs.dateToInputs(new Date())[2]}-${Funcs.dateToInputs(new Date())[1]}-${Funcs.dateToInputs(new Date())[0]}`,
        },
        null,
        'blob',
        (blob) => {
          Funcs.downloadFile(blob.data, 'Акт сверки.pdf', 'application/pdf');
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
    getApp() {
      return Funcs.filterByParams(this.$store.state.categories, this.category, this.app);
    },
    displayedArr() {
      const arr = [];
      this.getApp.table_labels.map((item) => arr.push(item.name_1c));
      return arr;
    },
  },
};
</script>

<style lang="less">

@import url('../assets/less-templates/base.less');

.table-wrap {
  width: 100%;
  height: auto;
  background: #fff;
  border-radius: 5px;
  overflow-x: scroll;
  padding: 10px;

  & table {
    width: 100%;
    height: auto;
    border-collapse: collapse;
    border-bottom: 1px solid #fff;

    & tr {
      cursor: pointer;
      background: #fff;
      border-bottom: 1px solid transparent;
      &:hover {
        border-color: @green-color;
      }

      & td, th {
        padding: 2.5px 10px;
        font-size: .9em;
        text-align: center;
      }
      & th {
        font-weight: bold;
      }
      & td:first-child, th:first-child {
        text-align: left;
      }
    }
    & tr:nth-child(2n) {
      background: #f4f4f4;
    }
    & thead tr {
      border: none;
      cursor: unset;
    }
    & .title {
      & td {
        font-weight: 900;
      }
    }
    & .padded {
      & td:first-child {
        padding-left: 40px;
      }
    }
  }
}

</style>
