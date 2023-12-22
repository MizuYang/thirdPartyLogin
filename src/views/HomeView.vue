<template>
  <div class="position-absolute-center w-100 text-center px-15">
    <div class="row row-cols-3">
      <GoogleLogin />
      <LineLoginOldMethod />
    </div>
  </div>
</template>

<script setup>
import GoogleLogin from '@/components/GoogleLogin.vue'
import LineLoginOldMethod from '@/components/LineLoginOldMethod.vue'
</script>

<style lang='scss' scope></style>
