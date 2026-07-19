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

<style scoped>
.logout-link {
  position: fixed;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 1000;
}

.logout-link a {
  display: inline-block;
  padding: 0.35rem 0.6rem;
  text-decoration: none;
}
</style>
