<template>
  <div :class="{ 'modal-wrap': true, 'active-modal-wrap': isShow }">
    <div class="hover"></div>
    <div class="modal-frame notif-frame">
        <div class="frame-content">
            <h2 class="notif-title" :style="{ color: textColor }">{{ text }}</h2>
            <button @click="hideModal()">ок</button>
        </div>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'MyNotification',
  props: ['text', 'textColor', 'isShow'],
  methods: {
    hideModal() {
      this.$emit('toggleNotif', false);
    },
  },
};

</script>

<style lang="less">

@import url('../assets/less-templates/base.less');

div.modal-wrap {
    & .notif-title {
        text-align: center;
    }
}

div.active-modal-wrap {
  & .notif-frame {
    top: 40%;
    & .frame-content {
      & h2 {
        font-size: 1.3em;
      }
      & button {
        margin-top: 10px;
      }
    }
  }
}

</style>
