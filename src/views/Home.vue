<template>
  <div class="home">
    <errorWrap v-if="is_error" :text="error_text"/>
    <div v-else
         v-for="(item, i) in this.$store.state.categories"
         :key="i"
         @click="goTo(item)"
         :class="{ 'home-item': true, disabled: item.status === 'В разработке' }">
      <h2 class="dev-title" v-show="item.status === 'В разработке'">В разработке</h2>
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
import errorWrap from '@/components/errorWrap.vue';

export default {
  name: 'Home',
  components: {
    errorWrap,
  },
  data: () => ({
    is_error: false,
    error_text: '',
  }),
  methods: {
    getPath(item) {
      if (item !== undefined) {
        return this.$store.state.host_url + item.icon_path;
      }
      return '';
    },
    goTo(item) {
      if (item.status !== 'В разработке') {
        this.$router.push({ path: item.link });
      }
    },
  },
  mounted() {
    this.$store.dispatch('login')
      .then((resolve) => {
        if (resolve.error === true) {
          this.is_error = true;
          this.error_text = resolve.text;
        }
      });
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
        white-space: pre-line;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #828282;
        height: 40px;
      }
    }
  }

  & .disabled {
    position: relative;
    cursor: unset;
    &:hover {
      transform: scale(1);
      & img {
        filter: grayscale(1);
      }
    }
    & .dev-title {
      position: absolute;
      .flex(row, center, center);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.8);
      text-align: center;
      z-index: 10;
      color: #fff;
      font-weight: 300;
      font-size: 1.5em;
      border-radius: 5px;
      letter-spacing: 1px;
    }
  }
}

@media screen and (max-width: 850px) {
  .home {
    justify-content: space-around;
  }
}
</style>
