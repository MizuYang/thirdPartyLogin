<template>
  <div class="position-absolute-center border raduis-20"
       style="transform:translate(150px,-120px);
              padding:50px 40px;">
    <h2 class="text-30 text-center fw-bold-7 mb-15">Line 登入</h2>
    <!-- 按鈕 -->
    <div class="btn line-logo"
         @click='lineLogin'>
    </div>
    <div class="text-center">
      <button type='button'
              class='btn btn-primary'
              @click='accessApp'>
        授權應用程式權限
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue' // eslint-disable-line
import axios from 'axios' // eslint-disable-line
import { useRoute } from 'vue-router'

const route = useRoute()
// yourClient_id 請設置為實際Channel ID 值
const channelId = import.meta.env.VITE_APP_CHANNEL_ID

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
  console.log(route)

  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('code')
  console.log(token)
})

function lineLogin () {
  const link = `
  https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${redirectUri}&state=login&scope=profile%20openid&nonce=09876xyz
  `

  window.location.href = link

  // userProfile()
}
function accessApp () {
  const link = `
   https://access.line.me/dialog/oauth/weblogin?response_type=code&client_id=${channelId}&redirect_uri=${redirectUri}&state=123abc
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

  &:hover {
  background-image: url('@/assets/images/btn_login_hover.png');
  }
  &:active {
    background-image: url('@/assets/images/btn_login_press.png');
  }
}
</style>
