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
          @click="requestAction(item)">
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
  </div>
</template>

<script type="text/javascript">

import Funcs from '@/assets/js-funcs/default-funcs';

export default {
  name: 'myTable',
  props: ['data', 'category', 'app'],
  data: () => ({
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
    openModalFunc() {
      Funcs.doRequest(
        'post',
        this.$store.state.base_url + this.getApp.path_post,
        {
          INN: this.$store.state.inn,
          GUID: this.activeObj.GUID,
        },
        null,
        (res) => {
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
        },
        () => { window.console.log('ERROR'); },
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
        'json',
        (blob) => {
          Funcs.downloadFile(blob, 'Акт сверки.pdf', 'application/pdf');
        },
        () => { window.console.log('ERROR'); },
      );
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
        padding: 10px;
        font-size: .9em;
        text-align: center;
      }
      & th {
        font-weight: bold;
      }
    }
    & tr:nth-child(2n) {
      background: #f4f4f4;
    }
    & thead tr {
      border: none;
      cursor: unset;
    }
  }
}

</style>
