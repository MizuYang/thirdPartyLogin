<template>
  <div class="position-absolute-center w-100 text-center px-15">
    <div class="row row-cols-3">
      <GoogleLogin />
      <LineLoginNewMethodLiff />
      <LineLoginOldMethod />
    </div>
  </div>
</template>

<script setup>
import GoogleLogin from '@/components/GoogleLogin.vue'
import LineLoginNewMethodLiff from '@/components/LineLoginNewMethodLiff.vue'
import LineLoginOldMethod from '@/components/LineLoginOldMethod.vue'
</script>

<style lang='scss' scope>
.line-logo {
  background-image: url('@/assets/images/btn_login_base.png');
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  width: 166px;
  height: 61px;

  &:hover {
  background-image: url('@/assets/images/btn_login_hover.png');
  }
  &:active {
    background-image: url('@/assets/images/btn_login_press.png');
  }
}
</style>
