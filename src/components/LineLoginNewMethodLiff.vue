<template>
  <div class="border raduis-20 p-15">
    <h2 class="text-30 fw-bold-7 mb-10">Line 登入(新)</h2>

    <p class="pb-5">
      <small>使用 Liff 應用程式讓用戶登入, <br />
             並取得用戶資料
      </small>
    </p>

    <!-- 登入狀態 -->
    <div class="text-18 fw-bold-7 mb-5">
      <p :class="isLoggedIn?'text-success':'text-gray'">
        {{ isLoggedIn?'登入中':'未登入' }}
      </p>

      <!-- 用戶資訊 -->
      <template v-if='userInfo.userId'>
        <div class="mt-10">
          <img :src="userInfo.pictureUrl"
               class="rounded-pill"
               alt="用戶頭貼" width="50">
          <p>{{ userInfo.displayName }}</p>
          <p>{{ userInfo.statusMessage }}</p>
        </div>
      </template>
    </div>

    <template v-if="!isLoggedIn">
      <!-- 登入按鈕 -->
      <div class="btn line-logo mx-auto"
            @click='liffLogin'>
      </div>
    </template>
    <template v-else>
      <button type='button'
              class='btn btn-secondary'
              @click='liffLogout'>
        Liff 登出
      </button>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import liff from '@line/liff'

// 登入狀態
const isLoggedIn = ref(false)
const userInfo = ref({})

onMounted(() => {
  liffInit()
})

//! Youtube: " #30 LIFF 更新啦 不用LINE也能開？ - v2 版本改動整理 " 解說 LIFF
function liffInit () {
  liff.init({
    liffId: '2002368530-LZo2Dbwd'
  }).then(async () => {
    console.log('開始使用 liff 的 api, liff: ', liff)
    // 開始使用 liff 的 api
    isLoggedIn.value = liff.isLoggedIn()

    // 若是登入狀態才取得用戶資遜
    if (liff.isLoggedIn()) {
      console.log(await liff.getProfile())
      userInfo.value = await liff.getProfile()
    }
  }).catch((err) => {
    // liff 初始化失敗
    console.log('liff 初始化失敗', err)
  })
}
function liffLogin () {
  const redirectUri = `
  ${
    import.meta.env.VITE_APP_MODE === 'development'
    ? 'https://localhost:5174/thirdPartyLogin/' // 這裡必須使用 https 的 localhost 才行
    : 'https://mizuyang.github.io/thirdPartyLogin/'
  }
`

  liff.login({
    redirect_uri: redirectUri
  })
}
function liffLogout () {
  liff.logout()
  isLoggedIn.value = false
  userInfo.value = {}
}
</script>

<style lang='scss' scope></style>
