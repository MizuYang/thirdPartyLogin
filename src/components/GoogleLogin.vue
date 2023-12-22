<template>
  <div class="border raduis-20 p-15">
    <h2 class="text-30 text-center fw-bold-7 mb-15">Google 登入</h2>
    <div class="text-center">
      <button type='button'
              class='btn btn-primary'
              @click='myUser.uid?logout():login()'>
        {{ myUser.uid?'登出帳號':'登入 Google 帳號' }}
      </button>
    </div>

    <div class="mt-10">
      <template v-if="myUser.uid">
        <p>
          <img :src="myUser.photoURL"
               class="rounded-pill"
               alt="用戶頭像"
               width="30">
          {{ myUser.displayName }}
        </p>
        <p>{{ myUser.email }}</p>
        <p class="mt-10">上次登入時間為：{{ new Date(+myUser.lastLoginAt).toLocaleString() }}</p>
      </template>
      <template v-else>
        <p class="text-gray text-center">尚未登入</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

// data
const myUser = ref({})
const myToken = ref('')
const auth = ref('')

onMounted(async () => {
  await checkUserLoginStatus()
})

function login () {
  auth.value = getAuth()
  const providerGoogle = new GoogleAuthProvider()
  console.log(auth)
  console.log(providerGoogle)

  // 使用彈出視窗登入
  signInWithPopup(auth.value, providerGoogle)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      myToken.value = credential.accessToken
      myUser.value = JSON.parse(JSON.stringify(result.user))
      console.log(`token: ${myToken.value}`)
      console.log(`user: ${JSON.stringify(result.user, null, 2)}`)
      console.log(myUser.value)
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
      console.log('登出成功！')
      myUser.value = {}
      myToken.value = ''
      auth.value = ''
    })
    .catch(e => {
      console.log(JSON.stringify(e))
    })
}
function checkUserLoginStatus () {
  return new Promise((resolve, reject) => {
    let checkCount = 20
    auth.value = getAuth()
    check()

    function check () {
      setTimeout(async () => {
        const { currentUser } = JSON.parse(JSON.stringify(auth.value))

        if (currentUser) {
          // 用戶有登入紀錄
          myUser.value = currentUser
          console.log(JSON.stringify(currentUser, null, 2))
          resolve()
        } else {
          checkCount--
          // 若檢查登入狀態的次數用完後, 就不再呼叫 check()
          if (checkCount > 0) check()
        }
      }, 100)
    }
  })
}
</script>

<style lang='scss' scope></style>
