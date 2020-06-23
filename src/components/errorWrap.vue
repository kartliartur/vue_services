<template>
  <div class="error-wrap">
    <h2>{{ text }}</h2>
    <a :href="getMyAddress">Авторизация/Регистрация</a>
  </div>
</template>

<script>

export default {
  name: 'errorWrap',
  props: ['text'],
  computed: {
    getMyAddress: () => `https://passport.kartli.ch/auth/?next=${window.location.href}`,
  },
};

</script>

<style lang="less">

@import url('../assets/less-templates/base.less');

.error-wrap {
  .flex(column, flex-start, center);
  width: 100%;
  & h2 {
    color: #fff;
    font-weight: 300;
    font-size: 1.5em;
    width: 50%;
    min-width: 320px;
    text-align: center;
  }
  & a {
    color: #fff;
    margin: 10px 0;
    font-weight: 300;
    border-bottom: 1px solid #fff;
    transition: all .3s linear;
    &:hover {
      color: #fff;
      font-weight: 400;
    }
  }
}

</style>
