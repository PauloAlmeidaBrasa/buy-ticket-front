<script setup lang="ts">

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '../stores/user'

const router = useRouter()
const authStore = useUserStore()

const email = ref('')
const password = ref('')
const error = ref('')

const submit = async () => {

    try {

        await authStore.login(
            email.value,
            password.value
        )

        router.push('/')

    } catch {

        error.value =
            'Invalid credentials'
    }
}
</script>

<template>

    <h1>Login</h1>

    <div v-if="error">
        {{ error }}
    </div>

    <input
        v-model="email"
        placeholder="Email"
    />

    <br><br>

    <input
        v-model="password"
        type="password"
        placeholder="Password"
    />

    <br><br>

    <button @click="submit">
        Login
    </button>

</template>