<template>
  <div class="inn-wrap" v-show="isAdmin">
    <img src="../assets/images/settings.svg" width="15px" title="Админ панель" class="active">
    <img src="../assets/images/settings2.svg" width="15px" title="Админ панель" class="hidden">
    <div class="inn-bar" v-show="modalShow">
      <h2>Панель администратора</h2>
      <input type="text" placeholder="Введите ИНН компании"
        v-model="currentInn"
        :class="{ errorClass }">
      <button @click="innUpdate()">Обновить</button>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'InnBar',
  data: () => ({
    errorClass: false,
  }),
  props: ['modalShow', 'currentInn'],
  methods: {
    innUpdate() {
      if (this.currentInn.length >= 10 && this.currentInn.length <= 12
          && !Number.isNaN(+this.currentInn)) {
        localStorage.setItem('admin_inn', this.currentInn);
        window.location.reload();
        this.errorClass = false;
      } else {
        this.errorClass = true;
      }
    },
  },
  computed: {
    isAdmin() {
      let result = false;
      if (this.$store.state.user !== null && this.$store.state.user !== undefined) {
        result = this.$store.state.user.user.is_superuser;
      }
      return result;
    },
  },
};

</script>

<style lang="less">

@import url('../assets/less-templates/base.less');

#app .inn-wrap {
  .flex(row, center, center);
  position: relative;
  width: 25px;
  height: 25px;
  margin-left: 25px;
  border: 1px solid #fff;
  border-radius: 100px;
  padding: 2.5px;
  cursor: pointer;

  & .active {
    display: initial;
  }

  & .hidden {
    display: none;
  }
}

#app .inn-wrap .inn-bar {
  .flex(column, flex-start, center);
  position: absolute;
  left: -236px;
  top: 45px;
  flex-wrap: wrap;
  min-width: 270px;
  margin: 0 auto;
  border: 1px solid #fff;
  background: #fff;
  border-radius: 5px;
  padding: 10px;

  &:after {
    display: block;
    content: "";
    position: absolute;
    top: -11px;
    right: 12.5px;
    width: 18px;
    height: 18px;
    border-top: 1px #ddd solid;
    border-left: 1px #ddd solid;
    background: #fff;
    transform: rotate(45deg);
  }

  & h2 {
    width: 100%;
    color: #000;
    font-size: 1.4em;
    text-align: center;
    padding: 10px 0;
    font-weight: 300;
  }

  & input {
    .input();
    min-width: 180px;
    font-size: .8em;
    margin-bottom: 10px;
  }

  & .errorClass {
    border: 1px solid @alert-color;
    &:hover, &:focus {
      border-color: @alert-color;
    }
  }

  & button {
    .button(5px, @green-color, #fff, 1);
  }
}

@media screen and (max-width: 850px) {
  #app .inn-wrap {
    position: static;
    border: 1px solid #424242;
    margin-left: 10px;
    & .active {
      display: none;
    }

    & .hidden {
      display: initial;
    }
  }

  #app .inn-wrap .inn-bar {
    right: 0;
    left: unset;
    box-shadow: 2px 2px 14px 2px rgba(0,0,0,.5);
    &:after {
      display: none;
    }
  }
}

</style>
