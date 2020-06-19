<template>
  <div class="home">
    <div class="home-item" v-for="(item, i) in this.$store.state.categories"
                           :key="i"
                           @click="goTo(item.link)">
      <img :src="getPath(item)" alt="">
      <div class="home-item-content">
        <h2 class="home-item-content-title">{{ item.name }}</h2>
        <span>
          {{ item.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    getPath(item) {
      if (item !== undefined) {
        return this.$store.state.host_url + item.icon_path;
      }
      return '';
    },
    goTo(link) {
      this.$router.push({ path: link });
    },
  },
  mounted() {
    this.$store.dispatch('login');
  },
};

</script>

<style lang="less">

@import url('../assets/less-templates/base.less');
.home {
  .flex(row, flex-start, center);
  flex-wrap: wrap;
  flex-grow: 1;
  width: 100%;
  height: auto;

  & &-item {
    .flex(row, space-between, center);
    flex-basis: 320px;
    min-width: 270px;
    height: 120px;
    padding: 20px 10px;
    background: #fff;
    border-radius: 5px;
    margin: 15px 20px 15px 0;
    box-shadow: 6px 6px 10px rgba(34, 34, 34, 0.38);
    cursor: pointer;
    transition: transform .3s linear;
    &:hover {
      transform: scale(1.1);
      & img {
        filter: grayscale(0);
      }
    }

    & img {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      filter: grayscale(1);
    }
    & .home-item-content {
      .flex(column, flex-start, flex-start);
      width: calc(100% - 80px);
      min-height: 60px;
      &-title {
        color: #2c2c2c;
        font-weight: 400;
        font-size: 18px;
        line-height: 23px;
        margin-bottom: 5px;
      }
      & span {
        word-break: break-word;
        white-space: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #828282;
        height: 40px;
      }
    }
  }
}

@media screen and (max-width: 850px) {
  .home {
    justify-content: space-around;
  }
}
</style>
