<template>
  <div class="position-absolute-center border raduis-20 p-15">
    <button type='button'
            class='btn btn-primary'
            @click='login'>
      {{ myToken?'登出帳號':'登入 Google 帳號' }}
    </button>

    <div class="mt-10">
      <template v-if="myToken">
        <p>
          <img :src="myUser.photoURL"
               class="rounded-pill"
               alt="用戶頭像"
               width="30">
          {{ myUser.displayName }}
        </p>
        <p>{{ myUser.email }}</p>
        <p class="mt-10">上次登入時間為：{{ new Date(1702973223309).toLocaleString(+myUser.lastLoginAt) }}</p>

        <div class="mt-10">
          <button type='button'
                  class='btn btn-primary'
                  @click='logout'>
            登出
          </button>
        </div>
      </template>
      <template v-else>
        <p class="text-gray text-center">尚未登入</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithCustomToken, signOut } from 'firebase/auth' // eslint-disable-line

// data
const myUser = ref({})
const myToken = ref('')
const auth = ref('')

onMounted(() => {
})

// function getToken() {

// }
function login () {
  auth.value = getAuth()
  const providerGoogle = new GoogleAuthProvider()
  console.log(auth)
  console.log(providerGoogle)

  // 使用彈出視窗登入
  signInWithPopup(auth.value, providerGoogle)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log(`token: ${token}`)
      console.log(`user: ${JSON.stringify(result.user, null, 2)}`)
      myToken.value = token
      myUser.value = user
      console.log(myUser.value)
      setCookie()
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.error(`errorMessage: ${errorMessage}`)
      console.error(`email: ${email}`)
      console.error(`errorCode: ${errorCode}`)
      console.error(`credential: ${credential}`)
    })
}
function logout () {
  signOut(auth.value)
    .then(() => {
      console.log('登出成功，將重新整理一次頁面！')
      myUser.value = {}
      myToken.value = ''
      document.cookie = 'googleLoginToken='
    })
    .catch(e => {
      console.log(JSON.stringify(e))
    })
}
function setCookie () {
  document.cookie = `googleLoginToken=${myToken.value}`
}
</script>

<style lang='scss' scope></style>
