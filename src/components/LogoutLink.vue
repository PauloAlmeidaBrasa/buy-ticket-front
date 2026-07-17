<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="logout-link" v-if="userStore.isAuthenticated">
    <a href="#" @click.prevent="logout">Logout</a>
  </div>
</template>
