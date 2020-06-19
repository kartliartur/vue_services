<template>
  <div>
    <svg class="spinner" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20"
      fill="none" :stroke-width="width" stroke-miterlimit="10"></circle>
    </svg>
  </div>
</template>

<script>

export default {
  name: 'spinner',
  props: ['width'],
};

</script>

<style lang="less">

.spinner {
  height: 200px;
  width: 200px;
  animation: rotate 2s linear infinite;
  transform-origin: center center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  & .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
    stroke: #fff;
  }
}

</style>
