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
          @click="requestAction(item.GUID)">
        <td v-for="(elem, i) in isFieldDisplayed(item)" :key="i"
          :style="{ width: (100/getApp.table_labels.length) + '%' }">
          {{ item[elem] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script type="text/javascript">

import Funcs from '@/assets/js-funcs/default-funcs';

export default {
  name: 'myTable',
  props: ['data', 'category', 'app'],
  methods: {
    requestAction(guid) {
      Funcs.doRequest(
        'post',
        this.$store.state.base_url + this.getApp.path_post,
        {
          INN: this.$store.state.inn,
          GUID: guid,
        },
        null,
        (res) => {
          window.console.log(res);
        },
        () => { window.console.log('ERROR'); },
      );
    },
    isFieldDisplayed(obj) {
      return Object.keys(obj)
        .filter((item) => this.getApp.table_labels
          .some((elem) => elem.name_1c === item));
    },
  },
  computed: {
    getApp() {
      return Funcs.filterByParams(this.$store.state.categories, this.category, this.app);
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
      background: #fff;
      & td, th {
        padding: 10px;
        text-align: center;
      }
      & th {
        font-weight: bold;
      }
    }
    & tr:nth-child(2n) {
      background: #f4f4f4;
      & td {
      }
    }
  }
}

</style>
