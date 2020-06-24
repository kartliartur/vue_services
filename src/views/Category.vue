<template>
  <div class="home category">
    <errorWrap v-if="is_error" :text="error_text"/>
    <div v-else class="category-content">
      <div class="category-title">
        <img :src="getPath(getCategoryArray[0])" width="36px">
        <h1>{{ getCategoryArray[0].name }}</h1>
      </div>
      <div v-for="(item, i) in getCategoryArray[0].links"
           :key="i"
           @click="goTo(item)"
           :class="{ 'home-item': true, disabled: item.status === 'В разработке' }">
        <h2 class="dev-title" v-show="item.status === 'В разработке'">В разработке</h2>
        <img :src="getPath(item)" width="40px">
        <div class="home-item-content">
          <h2 class="home-item-content-title">{{ item.name }}</h2>
          <span v-show="item.description != undefined && item.description.length > 0">
            {{ item.description }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import errorWrap from '@/components/errorWrap.vue';

export default {
  name: 'Category',
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
        this.$router.push({
          path: `/${this.getCategoryName}${item.link}`,
        });
      }
    },
  },
  computed: {
    getCategoryName: () => window.location.pathname.substr(1),
    getCategoryArray() {
      if (this.$store.state.categories.length > 0) {
        return this.$store.state.categories
          .filter((item) => item.link.substr(1) === this.getCategoryName);
      }
      return [{ name: 'asd' }];
    },
  },
  mounted() {
    this.$store.dispatch('login')
      .then((resolve) => {
        if (resolve !== true) {
          this.is_error = true;
          this.error_text = resolve;
        }
      });
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

  & .category-content {
    .flex(row, flex-start, center);
    flex-wrap: wrap;
    width: 100%;
    height: auto;
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
