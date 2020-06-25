<template>
  <div class="nav-bar">
    <img src="../assets/images/back.svg" @click="back()" width="25px" title="Назад"
      class="active">
    <img src="../assets/images/back2.svg" @click="back()" width="25px" title="Назад"
      class="hidden back">
    <InnBar @click.native="changeActiveMenu('inn', $event)"
      :modalShow="this.activeMenu === 'inn'"
      :currentInn="getInn"
      v-if="isAdmin"/>
    <div class="nav-item services-wrap">
      <img src="../assets/images/main-menu.png" width="25px" class="menu-icon active"
        @click="changeActiveMenu('services')">
      <img src="../assets/images/menu-black.png" width="25px" class="menu-icon hidden"
        @click="changeActiveMenu('services')">
      <div class="nav-item-list" v-show="this.activeMenu === 'services'">
          <span class="close" @click="changeActiveMenu('services')">×</span>
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
              <a :href='getMyAddress'>Вход</a>
          </div>
      </div>
    </div>
    <div class="nav-item profile-wrap" v-if="!isAuth">
      <img src="../assets/images/main-man.png" width="25px" class="menu-icon active"
        @click="changeActiveMenu('profile')">
      <img src="../assets/images/man.png" width="25px" class="menu-icon hidden"
        @click="changeActiveMenu('profile')">
      <div class="nav-item-list profile-list" v-show="this.activeMenu === 'profile'">
          <span class="close" @click="changeActiveMenu('profile')">×</span>
          <div class="nav-item-list-item name-row">
              <span>{{ getUserName }}</span>
          </div>
          <div class="nav-item-list-item" v-if="!isAuth">
              <a href="https://passport.kartli.ch/auth/logout">Выход</a>
          </div>
      </div>
    </div>
    <div class="nav-item sber-wrap" v-if="!isAuth">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 50 50" width="25px"
        height="25px" class="menu-icon active"
        @click="changeActiveMenu('sber')">
        <path d="M 33.539062 2.6503906 L 16 12.679688
        L 8.2597656 8.25 C 7.7797656 8.74 7.3396875
        9.2590625 6.9296875 9.7890625 L 16 14.990234
        L 35.759766 3.6796875 C 35.039766 3.2896875
        34.299062 2.9503906 33.539062 2.6503906 z M
        38.830078 5.6191406 L 16 18.679688 L 5.1191406
        12.449219 C 4.7791406 13.019219 4.4694531
        13.610938 4.1894531 14.210938 L 16 20.990234
        L 40.470703 6.9902344 C 39.950703 6.5102344
        39.400078 6.0591406 38.830078 5.6191406 z M 42.75
        9.3808594 L 16 24.679688 L 3.0195312
        17.240234 C 2.8095313 17.890234 2.64
        18.560234 2.5 19.240234
        L 16 26.990234 L 43.960938 10.990234
        C 43.580938 10.440234 43.18 9.9008594 42.75 9.3808594 z M
        45.716797 14 L 16 31 L 2.046875 23 C
        2.030875 23.333 2 23.663 2 24 C 2 36.703 12.297 47 25 47
        C 37.703 47 48 36.703 48 24 C 48
        20.416 47.179797 17.024 45.716797 14 z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 50 50"
      width="25px" height="25px" style="background: #0EB757; border-radius: 100px; padding: 5px;"
      class="menu-icon hidden" @click="changeActiveMenu('sber')">
        <path d="M 33.539062 2.6503906 L 16 12.679688 L 8.2597656 8.25 C 7.7797656 8.74 7.3396875
        9.2590625 6.9296875 9.7890625 L 16 14.990234 L 35.759766 3.6796875 C 35.039766 3.2896875
        34.299062 2.9503906 33.539062 2.6503906 z M 38.830078 5.6191406 L 16 18.679688 L 5.1191406
        12.449219 C 4.7791406 13.019219 4.4694531 13.610938 4.1894531 14.210938 L 16 20.990234
        L 40.470703 6.9902344 C 39.950703 6.5102344 39.400078 6.0591406
        38.830078 5.6191406 z M 42.75
        9.3808594 L 16 24.679688 L 3.0195312 17.240234 C 2.8095313
        17.890234 2.64 18.560234 2.5 19.240234
        L 16 26.990234 L 43.960938 10.990234 C 43.580938
        10.440234 43.18 9.9008594 42.75 9.3808594 z M
        45.716797 14 L 16 31 L 2.046875 23 C 2.030875
        23.333 2 23.663 2 24 C 2 36.703 12.297 47 25 47
        C 37.703 47 48 36.703 48 24 C 48 20.416 47.179797 17.024 45.716797 14 z"></path>
      </svg>
      <div class="nav-item-list profile-list" v-show="this.activeMenu === 'sber'">
          <span class="close" @click="changeActiveMenu('profile')">×</span>
          <div class="nav-item-list-item name-row">
              <span>Аккаунт сбербанк бизнес онлайн не привязан к системе!</span>
          </div>
          <div class="nav-item-list-item" v-if="!isAuth">
              <button class="sberbank-button" @click="sberAuth()">Войти c СберБизнес ID</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

// import Funcs from '@/assets/js-funcs/default-funcs';
import InnBar from '@/components/innBar.vue';

export default {
  name: 'NavigationBar',
  components: {
    InnBar,
  },
  data: () => ({
    activeMenu: null,
  }),
  methods: {
    changeActiveMenu(name, e) {
      if (e !== undefined) {
        if (e.target.title !== 'Админ панель') {
          this.activeMenu = 'inn';
        } else {
          this.activeMenu = name === this.activeMenu ? null : name;
        }
      } else {
        this.activeMenu = name === this.activeMenu ? null : name;
      }
      window.console.log(this.activeMenu);
    },
    back() {
      let link = window.location.href.replace('https://', '').replace('http://', '');
      let index = link.lastIndexOf('/');
      link = link.replace(link.substring(index), '');
      index = link.lastIndexOf('/');
      window.console.log(link);
      if (index !== -1) {
        this.$router.push({ path: link.substring(index) });
      } else {
        this.$router.push({ path: '/' });
      }
    },
    sberAuth() {
      window.location.href = `${this.$store.state.host_url}/bank_account/link`;
    },
  },
  computed: {
    isAuth() {
      return this.$store.state.user === null;
    },
    isAdmin() {
      if (this.$store.state.user !== null) {
        return this.$store.state.user.user.is_superuser;
      }
      return false;
    },
    getUserName() {
      if (this.$store.state.user != null) {
        window.console.log(this.$store.state.user);
        return `${this.$store.state.user.user.first_name} ${this.$store.state.user.user.last_name}`;
      }
      return '';
    },
    getInn: () => localStorage.getItem('admin_inn'),
    getMyAddress: () => `https://passport.kartli.ch/auth/?next=${window.location.href}`,
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

      & .close {
        display: none;
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
        & .sberbank-button {
          display: flex;
          align-items: center;
          border: 1px solid #0EB757;
          border-radius: 5px;
          background-color: #0EB757;
          color: #fff;
          padding: 8px 16px;
          text-align: center;
          font-size: 1em;
          cursor: pointer;
          transition-property: box-shadow,color,background-color,border,transform;
          transition-duration: .5s;
          transition-timing-function: linear;
          font-size: 1.2em;
          font-weight: 400;
          width: auto;
          border: none;
          margin: 10px auto;
          &:hover {
            background: #10cf62;
            color: #fff;
          }
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
    right: 5px;
    & .nav-item {
      position: static;
      margin-left: 10px;
      & .nav-item-list {
        position: fixed;
        justify-content: center;
        width: 100%;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 100;

        &:after {
          display: none;
        }

        & .close {
          display: flex;
          position: absolute;
          top: 25px;
          right: 25px;
          font-size: 2em;
          cursor: pointer;
          color: #424242;
          font-weight: 300;
        }
      }
    }
    & .active {
      display: none;
    }

    & .hidden {
      display: initial;
    }
  }
}

// @media screen and (max-width: 410px) {
//   .nav-bar {
//     & .back {
//       display: none;
//     }
//   }
// }

</style>
