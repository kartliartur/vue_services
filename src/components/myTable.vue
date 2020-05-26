<template>
  <div class="table-wrap">
    <table>
      <tr v-for="(item, idx) in this.data" :key="idx"
          @click="requestAction()">
        <td v-for="(elem, i) in item" :key="i">
          {{ elem }}
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
    requestAction() {
      const obj = Funcs.filterByParams(this.$store.state.categories, this.category, this.app);
      window.console.log(this.category);
      window.console.log(this.app);
      window.console.log(obj);
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
      & td {
        padding: 10px;
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
