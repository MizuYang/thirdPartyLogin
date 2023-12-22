<template>
  <!-- 舊的登入方法 -->
  <div class="border raduis-20 p-15">
    <h2 class="text-30 fw-bold-7 mb-10">Line 登入(舊)</h2>
    <p class="pb-5">
      <small>此方法只能取得用戶 Token, <br />
        無法取抓用戶資訊</small>
    </p>
    <!-- 按鈕 -->
    <div class="btn line-logo mx-auto"
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
import { onMounted } from 'vue'

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
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('code')
  if (token) console.log('token: ', token)
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

<style lang="scss" scoped></style>
