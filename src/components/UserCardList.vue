<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTicketStore } from '../stores/ticket'
import { formatDate } from '../util/generalUtil'

const ticketStore = useTicketStore()
const isOpen = ref(false)
const requestError = ref<string | null>(null)

const userId = computed(() => Number(localStorage.getItem('userId')))
const username = computed(() => localStorage.getItem('username') || 'User')

const initials = computed(() => {
  const parts = username.value.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return 'U'
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase()
  }

  return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`.toUpperCase()
})

async function toggleUserTickets() {
  if (!isOpen.value) {
    if (!userId.value || Number.isNaN(userId.value) || userId.value <= 0) {
      requestError.value = 'User not found. Please login again.'
      isOpen.value = true
      return
    }

    requestError.value = null

    try {
      await ticketStore.fetchUserTickets(userId.value)
    } catch (error) {
      requestError.value = 'Failed to load your tickets. Please try again.'
    }
  }

  isOpen.value = !isOpen.value
}
</script>

<template>
  <div v-if="ticketStore" class="user-card-list">
    <button
      class="avatar-button"
      type="button"
      :aria-expanded="isOpen"
      aria-controls="user-ticket-list"
      @click="toggleUserTickets"
    >
      <span class="avatar-initials">{{ initials }}</span>
    </button>

    <div
      v-if="isOpen"
      id="user-ticket-list"
      class="ticket-panel"
    >
      <h3 class="panel-title">My Tickets</h3>

      <p v-if="ticketStore.userTicketsLoading" class="panel-message">Loading tickets...</p>
      <p v-else-if="requestError" class="panel-message error">{{ requestError }}</p>
      <p v-else-if="ticketStore.userTickets.length === 0" class="panel-message">No tickets found.</p>

      <ul v-else class="ticket-list">
        <li
          v-for="ticket in ticketStore.userTickets"
          :key="ticket.id"
          class="ticket-item"
        >
          <span class="ticket-event">{{ ticket.eventName }}</span>
          <span class="ticket-meta">{{ formatDate(ticket.eventDate) }} - {{ ticket.status }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.user-card-list {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 1000;
}

.avatar-button {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  border: 1px solid #d4d4d8;
  background: #ffffff;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);
  cursor: pointer;
}

.avatar-initials {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1f2937;
}

.ticket-panel {
  margin-top: 0.75rem;
  width: min(86vw, 320px);
  max-height: 360px;
  overflow-y: auto;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.16);
  padding: 0.75rem;
  text-align: left;
}

.panel-title {
  margin: 0 0 0.6rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
}

.panel-message {
  margin: 0;
  font-size: 0.88rem;
  color: #4b5563;
}

.panel-message.error {
  color: #b91c1c;
}

.ticket-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ticket-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.6rem;
  padding: 0.5rem 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.ticket-event {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
}

.ticket-meta {
  font-size: 0.8rem;
  color: #6b7280;
}
</style>
