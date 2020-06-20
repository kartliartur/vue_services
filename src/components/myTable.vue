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
        <h2>{{ modalTitle }}</h2>
        <span class="subtitle">{{ modalSubtitle }}</span>
        <div class="frame-content">
          <div class="content-item" v-for="(item, idx) in modal_content" :key="idx">
            <span>{{ item.name }}</span>
            <select v-if="item.type === 'select'" v-model="modal_index">
              <option v-for="(val, ind) in item.value" :key="ind" :value="ind">{{ val }}</option>
            </select>
            <span v-else-if="item.type === 'text'" class="like-input">
              {{ item.value[modal_index] }}
            </span>
            <div v-else-if="item.type === 'link'" class="like-link"
              @click="downloadFileReq(false,
              `${$store.state.base_url}/erp_base/hs/files/download/sale-attachment`,
              item.file_name, `application/${item.file_extension}`,
              'Данный файл не найден, обратитесь к администратору', item.guid)">
              {{ `${item.file_name}.${item.file_extension}` }}
            </div>
            <input v-else-if="item.type === 'input'"
              :type="item.type" v-model="item.value">
            <input v-else-if="item.type === 'submit'"
              :type="item.type" :value="item.value"
              @click="callFunc($event)">
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
            <input type="date" v-model="actsDates[key]" :name="key">
          </div>
          <button
            @click="downloadFileReq(true,
            $store.state.base_url + getApp.path_post,
            'Акт Сверки.pdf', 'application/pdf',
            'Данные за указанный период, не найдены')">
            Загрузить
          </button>
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
    modalTitle: '',
    modal_index: 0,
    activeObj: {},
    actsDates: {
      date_first: '',
      date_last: '',
    },
    modal_content: [],
    orders_content: [
      {
        name: 'Марка:',
        variable: 'Product_Name',
        type: 'select',
        value: [],
      },
      {
        name: 'Количество',
        variable: 'Count',
        type: 'text',
        value: [],
      },
      {
        name: 'Комментарий:',
        variable: 'Comment',
        type: 'input',
        value: '',
      },
      {
        name: '',
        variable: null,
        type: 'submit',
        value: 'Отправить заявку',
      },
    ],
    payments_content: [
      {
        name: 'Номенклатура:',
        variable: 'Рroduct',
        type: 'select',
        value: [],
      },
      {
        name: 'Количество:',
        variable: 'Count',
        type: 'text',
        value: [],
      },
      {
        name: 'Цена:',
        variable: 'Price',
        type: 'text',
        value: [],
      },
      {
        name: 'Сумма:',
        variable: 'Amount',
        type: 'text',
        value: [],
      },
      {
        name: 'НДС:',
        variable: 'VAT',
        type: 'text',
        value: [],
      },
      {
        name: 'Сумма НДС:',
        variable: 'AmountVAT',
        type: 'text',
        value: [],
      },
    ],
  }),
  methods: {
    requestAction(obj) {
      if (this.getApp.actions.length > 0) {
        this.activeObj = obj;
        if (this.getApp.actions[0] === 'open_modal') {
          this.openModalFunc(obj);
        } else if (this.getApp.actions[0] === 'download_file') {
          this.actsModalShow = true;
          this.actsModalSubtitle = obj.Name;
          this.actsDates.date_first = `${Funcs.dateToInputs(new Date())[2]}-${Funcs.dateToInputs(new Date())[3]}-${Funcs.dateToInputs(new Date())[0]}`;
          this.actsDates.date_last = `${Funcs.dateToInputs(new Date())[2]}-${Funcs.dateToInputs(new Date())[1]}-${Funcs.dateToInputs(new Date())[0]}`;
        } else if (this.getApp.actions[0] === 'open_link') {
          this.goToAnothersite();
        }
      }
    },
    goToAnothersite() {
      if (this.activeObj.MapUrl !== undefined) {
        window.open(this.activeObj.MapUrl, '_blank');
      }
    },
    isLayout(item, name) {
      if (item.Layout !== undefined) {
        return item.Layout[name];
      }
      return false;
    },
    changeModalContent(subtitle, title, content) {
      this.modalSubtitle = subtitle;
      this.modalTitle = title;
      this.modal_content = content;
    },
    openModalFunc() {
      if (this.getApp.link === '/purchases' && !this.activeObj.Is_modal_trigger) {
        Funcs.doRequest(
          'post',
          `${this.$store.state.base_url}/erp_base/hs/contractors/get/purchase-attachments`,
          {
            Document_GUID: this.activeObj.Document_GUID,
          },
          null,
          'json',
          (res) => {
            const arr = [];
            res.data.data.map((item) => {
              arr.push({
                guid: item.File_GUID,
                file_name: item.File_Name,
                type: 'link',
                file_extension: item.File_Extension,
              });
              return true;
            });
            this.changeModalContent(this.activeObj.Document_Name, 'Список вложений', arr);
          },
          () => { window.console.log('ERROR'); },
        );
        this.changeModalContent(this.activeObj.Document_Name, 'Список вложений');
      } else {
        const keys = Object.keys(this.activeObj.Modal_array[0]);
        if (this.getApp.link === '/purchases') {
          this.changeModalContent(this.activeObj.Document_Name, 'Повторить поставку', this.orders_content);
        } else if (this.getApp.link === '/paysschedule') {
          this.changeModalContent(this.activeObj.Document_Name, 'Документ', this.payments_content);
        }
        for (let i = 0; i < this.modal_content.length; i += 1) {
          const item = this.modal_content[i];
          keys.map((elem) => {
            this.activeObj.Modal_array.map((val) => {
              if (elem === item.variable) {
                item.value.push(val[elem]);
              }
              return true;
            });
            return true;
          });
        }
      }
      this.modalShow = true;
    },
    downloadFileReq(flag, path, fileName, fileType, message, guid) {
      if ((new Date(this.actsDates.date_first) > new Date(this.actsDates.date_last) && flag)) {
        this.showNotificaction('Дата начала должна быть раньше, чем дата конца', '#c23616');
      } else {
        Funcs.doRequest(
          'post',
          path,
          {
            INN: this.$store.state.inn,
            Contract_GUID: this.activeObj.GUID,
            GUID: guid,
            DateFirst: this.actsDates.date_first,
            DateLast: this.actsDates.date_last,
            Date: `${Funcs.dateToInputs(new Date())[2]}-${Funcs.dateToInputs(new Date())[1]}-${Funcs.dateToInputs(new Date())[0]}`,
          },
          null,
          'blob',
          (res) => {
            Funcs.downloadFile(res.data, fileName, fileType)
              .then((resolve) => {
                if (!resolve) {
                  this.showNotificaction(message, '#c23616');
                }
              });
          },
          () => {
            this.showNotificaction('Сервер временно недоступен, попробуйте позже', '#c23616');
          },
        );
      }
    },
    callFunc(e) {
      e.preventDefault();
      Funcs.repeatRequest(this.$store.state.inn, this.modal_content[2].value,
        this.activeObj.Document_GUID, this.$store.state.base_url + this.getApp.path_post)
        .then((resolve) => {
          if (!resolve.data.error) {
            this.showNotificaction('Запрос успешно отправлен!', '#66ab55');
          } else {
            this.showNotificaction(resolve.data.report, '#c23616');
          }
        });
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
  border-radius: 5px;
  overflow-x: scroll;

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
