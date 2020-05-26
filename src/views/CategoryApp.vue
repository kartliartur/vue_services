<template>
  <div class="category-app">
    <div class="category-app-title">
      <img :src="getPath(getAppObject.link.substr(1))" width="36px">
      <h1>{{ getAppObject.name }}</h1>
    </div>
    <div class="category-app-content">
      <h2 v-if="this.$store.state.activeAppData.report.length !== 0">
        {{ this.$store.state.activeAppData.report }}
      </h2>
      <h2 v-else-if="this.$store.state.activeAppData.data.length === 0">
        Список пуст
      </h2>
      <myTable v-else
        :data="this.$store.state.activeAppData.data"
        :category="this.getCategoryName"
        :app="this.getAppName"/>
    </div>
  </div>
</template>

<script type="text/javascript">

import Funcs from '@/assets/js-funcs/default-funcs';
import myTable from '@/components/myTable.vue';

export default {
  name: 'CategoryApp',
  components: {
    myTable,
  },
  methods: {
    getPath: (img) => {
      const images = require.context('../assets/images/', false, /\.svg$/);
      return images(`./${img}.svg`);
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
  },
  mounted() {
    this.$store.dispatch('login', {
      name: this.getAppName,
      category: this.getCategoryName,
      data: {},
    });
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
    font-weight: normal
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
      font-weight: 400;
    }
    & img {
      filter: invert(1);
    }
  }

  & &-content {
    width: 100%;
    height: 100%;
    margin: 10px 0;
  }
}

</style>
