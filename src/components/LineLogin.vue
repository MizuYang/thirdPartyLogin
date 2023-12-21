<template>
  <div class="position-absolute-center border raduis-20"
       style="transform:translate(150px,-120px);
              padding:50px 40px;">
    <h2 class="text-30 text-center fw-bold-7 mb-15">Line 登入</h2>
    <div class="btn line-logo"
         @click='lineLogin'>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue' // eslint-disable-line

// yourClient_id 請設置為實際Channel ID 值
const clientId = import.meta.env.VITE_APP_CHANNEL_ID

console.log(`import.meta.env.VITE_APP_MODE: ${import.meta.env.VITE_APP_MODE}`)

// yourURI 請設置為實際Line developer 設定的重新導向網址
// 依照本地開發環境或是線上環境來決定 url 導向位置
const redirectUri = `
  ${
    import.meta.env.VITE_APP_MODE === 'development'
    ? 'http://localhost:5174/thirdPartyLogin/'
    : 'https://mizuyang.github.io/thirdPartyLogin/'
  }
`

onMounted(() => {
})

function lineLogin () {
  const link = `
  https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=login&scope=profile%20openid&nonce=09876xyz
  `

  window.location.href = link
}
</script>

<style lang="scss" scoped>
.line-logo {
  background-image: url('@/assets/images/btn_login_base.png');
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  width: 166px;
  height: 61px;

}
</style>
