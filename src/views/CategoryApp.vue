<template>
  <div class="category-app">
    <div class="category-app-title">
      <img :src="getPath(getAppObject.link.substr(1))" width="36px">
      <h1>{{ getAppObject.name }}</h1>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'CategoryApp',
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
      return this.$store.state.categorys
        .filter((item) => item.img === this.getCategoryName)[0].links
        .filter((item) => item.link === this.getAppName)[0];
    },
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

  & &-title {
    .flex(row, flex-start, flex-end);
    width: 100%;
    padding: 10px 5px;
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

  & &-item {
    .flex(column, space-around, center);
    flex-basis: 320px;
    min-height: 150px;
    padding: 20px 10px;
    background: #fff;
    border-radius: 5px;
    margin: 15px auto;
    box-shadow: 6px 6px 10px rgba(34, 34, 34, 0.38);
    cursor: pointer;
    transition: transform .3s linear;
    &:hover {
      transform: scale(1.1);
      & img {
        filter: grayscale(0);
      }
    }

    & h2 {
      font-weight: 900;
      font-size: 16px;
      text-align: center;
      width: 80%;
    }
  }
}

</style>
