<template>
  <div id="app">
    <!-- START PRELOAD SCREEN -->
    <div class="preload-wrap" id="preload">
      <img src="../src/assets/images/preload.png" width="100px" alt="">
      <spinner :width="1"/>
    </div>
    <!-- END PRELOAD SCREEN -->

    <!-- START LEFT COLUMN -->
    <div class="left-column">
      <img src="../src/assets/images/logotype.png" class="logotype">
      <!-- FEATURES COLUMN START -->
      <div class="features-column">
        <div class="features-item">
          <img src="../src/assets/images/secure.png" width="32px">
          <h3>Безопасность</h3>
          <span>Мы гарантируем полную конфиденциальность данных</span>
        </div>
        <div class="features-item">
          <img src="../src/assets/images/speed.png" alt="" width="32px">
          <h3>Скорость</h3>
          <span>Моментальное получение информации прямо из 1С ERP</span>
        </div>
        <div class="features-item">
          <img src="../src/assets/images/usability.png" alt="" width="32px">
          <h3>Удобство</h3>
          <span>Всё делается за несколько кликов, не нужно связываться с менеджером</span>
        </div>
        <div class="features-item">
          <img src="../src/assets/images/sup.png" alt="" width="32px">
          <h3>Поддержка</h3>
          <span>Постоянное обновление функциональности и своевременное устранение ошибок</span>
        </div>
      </div>
      <!-- FEATURES COLUMN END -->
    </div>
    <!-- END LEFT COLUMN -->

    <!-- NAVIGATION BAR START -->
    <NavigationBar/>
    <!-- NAVIGATION BAR END -->

    <!-- MAIN WRAP START -->
    <div class="main-wrap">
      <h1>Личный кабинет</h1>
      <h2>{{ this.$store.state.company_name }}</h2>
      <!-- PAGES CONTENT INSERT AFTER IT -->
      <div class="content-wrap">
        <router-view/>
      </div>
      <!-- PAGES CONTENT INSERT BEFORE IT -->
    </div>
    <!-- MAIN WRAP END -->
  </div>
</template>

<script type="text/javascript">

import NavigationBar from '@/components/NavigationBar.vue';
import spinner from '@/components/spinner.vue';

export default {
  name: 'App',
  components: {
    NavigationBar,
    spinner,
  },
};

</script>

<style scoped lang="less">

@import url('assets/less-templates/base.less');

#app {
  .flex(row, flex-start, flex-start);
  height: 100vh;
  width: 100%;
  background: @green-color;

  & .left-column {
    .flex(column, flex-end, flex-start);
    position: relative;
    width: 250px;
    height: 100%;
    background: #fff;
    box-shadow: 2px 2px 14px 2px rgba(0,0,0,0.3);

    & .logotype {
      position: absolute;
      top: -150px;
      left: -65px;
      width: 350px;
    }

    & .features-column {
      .flex(column, flex-start, center);
      overflow-y: scroll;
      width: 100%;
      height: calc(100% - 250px);
      & .features-item {
        .flex(column, flex-start, center);
        width: 70%;
        min-height: 100px;
        margin: 25px 0;

        & h3 {
          font-weight: 400;
          font-size: 1.25em;
          padding: 5px 0;
        }

        & span {
          text-align: center;
          color: #aeabab;
          font-size: .8em;
        }
      }
    }
  }

  & .main-wrap {
    .flex(column, flex-start, center);
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-right: 30px;

    & h1, h2 {
      color: #fff;
      font-weight: 300;
      font-size: 28px;
      margin-top: 100px;
    }

    & h2 {
      margin-top: 25px;
      opacity: .7;
      font-size: 18px;
      letter-spacing: 2.5px;
    }

    & .content-wrap {
      position: relative;
      overflow-y: scroll;
      overflow-x: visible;
      width: 100%;
      padding: 20px 10% 40px 10%;
      height: 75%;
      margin-top: 30px;
    }
  }
}

.preload-wrap {
  .flex(column, center, center);
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: @green-color;
  z-index: 10000000;
}

@media screen and (max-width: 850px) {
  #app {
    flex-direction: column;
    height: auto;
    min-height: 100vh;

    & .left-column {
      width: 100%;
      height: 225px;
      & .logotype {
        width: 250px;
        top: -84px;
        left: -70px;
      }
      & .features-column { display: none; }
    }

    & .main-wrap {
      overflow: visible;
      padding: 0;
      height: auto;
      & .content-wrap {
        overflow-y: unset;
        padding: 50px 10px;
        margin-left: 0;
        width: 100%;
        height: auto;
      }
    }
  }
}

</style>
