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
      </template>
      <template v-else>
        <p class="text-gray text-center">尚未登入</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// data
const myUser = ref({})
const myToken = ref('')

onMounted(() => {
})

function login () {
  const auth = getAuth()
  const providerGoogle = new GoogleAuthProvider()
  console.log(auth)
  console.log(providerGoogle)

  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log(`token: ${token}`)
      console.log(`user: ${JSON.stringify(result.user, null, 2)}`)
      myToken.value = token
      myUser.value = user
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
</script>

<style lang='scss' scope></style>
