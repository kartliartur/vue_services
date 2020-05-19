<template>
  <div class="nav-bar">
    <img src="../assets/images/back.svg" @click="$router.go(-1)" width="25px" title="Назад">
    <div class="nav-item services-wrap" @click="changeActiveMenu('services')">
      <img src="../assets/images/main-menu.png" width="25px" class="menu-icon active">
      <img src="../assets/images/menu-black.png" width="25px" class="menu-icon hidden">
      <div class="nav-item-list" v-show="this.activeMenu === 'services'">
          <div class="nav-item-list-item">
              <img src="../assets/images/kartli-icon.png" class="gray-image">
              <a href="https://kartli.ch/ru/" target="_blank">Сайт компании</a>
          </div>
          <div class="nav-item-list-item">
              <img src="../assets/images/gray-auction.png" class="gray-image">
              <a href="https://bidding.kartli.ch/" target="_blank">Торги</a>
          </div>
          <div class="nav-item-list-item">
              <img src="../assets/images/passport.png" class="gray-image">
              <a href="https://passport.kartli.ch/" target="_blank">Паспорт</a>
          </div>
          <div class="nav-item-list-item">
              <img src="../assets/images/directory.png" class="gray-image">
              <a href="https://reference.kartli.ch/" target="_blank">Справочник продукции</a>
          </div>
          <div class="nav-item-list-item" v-if="isAuth">
              <img src="" alt="">
              <a href="https://passport.kartli.ch/account/">Вход</a>
          </div>
      </div>
    </div>
    <div class="nav-item profile-wrap" @click="changeActiveMenu('profile')" v-if="!isAuth">
      <img src="../assets/images/main-man.png" width="25px" class="menu-icon active">
      <img src="../assets/images/man.png" width="25px" class="menu-icon hidden">
      <div class="nav-item-list profile-list" v-show="this.activeMenu === 'profile'">
          <div class="nav-item-list-item name-row">
              <span>{{ getUserName }}</span>
          </div>
          <div class="nav-item-list-item">
              <a href="https://passport.kartli.ch/auth/logout">Выход</a>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

// import Funcs from '@/assets/js-funcs/default-funcs';

export default {
  name: 'NavigationBar',
  data: () => ({
    activeMenu: null,
  }),
  methods: {
    changeActiveMenu(name) {
      this.activeMenu = name === this.activeMenu ? null : name;
    },
  },
  computed: {
    isAuth() {
      return this.$store.state.user === null && this.$store.state.user === undefined;
    },
    getUserName() {
      if (this.$store.state.user != null) {
        return this.$store.state.user.name;
      }
      return '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../assets/less-templates/base.less');
.nav-bar {
  position: absolute;
  .flex(row, flex-end, center);
  top: 20px;
  right: 30px;
  height: 42px;
  width: 100%;
  z-index: 100;

  & img { cursor: pointer; }

  & .nav-item {
    .flex(column, flex-start, center);
    position: relative;
    margin-left: 25px;

    &-list {
      .flex(column, flex-start, flex-start);
      position: absolute;
      top: 180%;
      left: -236px;
      min-width: 270px;
      height: auto;
      background: #fff;
      padding: 15px 0;
      border-radius: 3px;
      box-shadow: 2px 2px 20px 0 rgba(0,0,0,0.2);
      &:after {
        display: block;
        content: "";
        position: absolute;
        top: -10px;
        right: 12.5px;
        width: 18px;
        height: 18px;
        border-top: 1px #ddd solid;
        border-left: 1px #ddd solid;
        background: #fff;
        transform: rotate(45deg);
      }

      &-item {
        .flex(row, flex-start, center);
        width: 100%;
        padding: 0 10%;
        cursor: pointer;
        & img {
          width: 16px;
          margin-right: 5px;
        }
        & a, span {
          color: #6a7287;
          text-align: left;
          padding: 8px 0;
          font-size: 16px;
          line-height: 1.5;
          font-weight: 300;
        }
        &:hover { background: #f7f8f9; }
      }

      & .name-row {
        font-weight: bold;
        border-bottom: 1px solid #eee;
      }
    }

    & .profile-list {
      left: -235px;
    }
  }

  & .menu-icon {
    cursor: pointer;
  }

  & .active {
    display: initial;
  }

  & .hidden {
    display: none;
  }
}


@media screen and (max-width: 850px) {
  .nav-bar {
    & .active {
      display: none;
    }

    & .hidden {
      display: initial;
    }
  }
}

</style>
