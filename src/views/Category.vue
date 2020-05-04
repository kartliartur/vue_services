<template>
  <div class="category">
    <div class="category-title">
      <img :src="getPath(getCategoryArray[0].img)" width="36px">
      <h1>{{ getCategoryArray[0].name }}</h1>
    </div>
    <div class="category-item" v-for="(item, i) in getCategoryArray[0].links"
                               :key="i"
                               @click="goTo(`/${getCategoryName}${item.link}`)">
      <img :src="getPath(item.link.substr(1))" width="50px">
      <h2>{{ item.name }}</h2>
      <span class="hidden"></span>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'Category',
  methods: {
    getPath: (img) => {
      const images = require.context('../assets/images/', false, /\.svg$/);
      return images(`./${img}.svg`);
    },
    goTo(link) {
      this.$router.push({
        path: link,
      });
    },
  },
  computed: {
    getCategoryName: () => window.location.pathname.substr(1),
    getCategoryArray() {
      return this.$store.state.categorys
        .filter((item) => item.img === this.getCategoryName);
    },
  },
};

</script>

<style lang="less">

@import url('../assets/less-templates/base.less');

.category {
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
      filter: grayscale(1);
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
