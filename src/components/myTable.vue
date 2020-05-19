<template>
  <div class="table-wrap">
    <table>
      <tr v-for="(item, idx) in this.data" :key="idx">
        <td v-for="(elem, i) in item" :key="i">
          {{ elem }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'myTable',
  props: ['data'],
};
</script>

<style lang="less">

@import url('../assets/less-templates/base.less');

.table-wrap {
  width: 100%;
  height: auto;

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
      background: @green-color;
      & td {
        color: #fff;
      }
    }
  }
}

</style>
