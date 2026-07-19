
<template>
  <div>
    <UserCardList />
    <LogoutLink />
    <router-view />
  </div>
</template>
<script setup>
import LogoutLink from './components/LogoutLink.vue'
import UserCardList from './components/UserCardList.vue'
</script>