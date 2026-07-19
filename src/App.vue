
<template>
  <div>
    <UserCardList v-if="userStore.isAuthenticated" />
    <LogoutLink />
    <router-view />
  </div>
</template>
<script setup>
import LogoutLink from './components/LogoutLink.vue'
import UserCardList from './components/UserCardList.vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()
</script>