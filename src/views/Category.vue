<template>
  <div class="home category">
    <div class="category-title">
      <img :src="getPath(getCategoryArray[0].img)" width="36px">
      <h1>{{ getCategoryArray[0].name }}</h1>
    </div>
    <div class="home-item" v-for="(item, i) in getCategoryArray[0].links"
                               :key="i"
                               @click="goTo(`/${getCategoryName}${item.link}`)">
      <img :src="getPath(item.link.substr(1))" width="40px">
      <div class="home-item-content">
        <h2 class="home-item-content-title">{{ item.name }}</h2>
        <span v-show="item.description != undefined && item.description.length > 0">
          {{ item.description }}
        </span>
      </div>
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
      window.console.log(this.$store.state.categories);
      return this.$store.state.categories
        .filter((item) => item.img === this.getCategoryName);
    },
  },
  mounted() {
    this.$store.dispatch('login');
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
    padding: 10px 0;
    & h1 {
      color: #fff;
      font-size: 2em;
      margin: 0 10px;
      letter-spacing: 1.5px;
      font-weight: 300;
    }
    // & img {
    //   filter: grayscale(1);
    // }
  }

  & &-item {
    .flex(column, space-around, center);
    flex-basis: 320px;
    min-height: 150px;
    padding: 20px 10px;
    background: #fff;
    border-radius: 5px;
    margin: 15px auto 15px 0;
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
      font-weight: 300;
      font-size: 16px;
      text-align: center;
      width: 80%;
    }
  }
}

@media screen and (max-width: 850px) {
  .category {
    justify-content: space-around;

    & &-title {
      justify-content: center;
    }
  }
}

</style>
