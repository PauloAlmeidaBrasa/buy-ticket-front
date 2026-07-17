<script setup lang="ts">
import { onMounted } from 'vue'
import { useTicketStore } from '../stores/ticket'

const ticketStore = useTicketStore()

onMounted(() => {
  ticketStore.fetchTickets()
})
</script>

<template>
  <div>
    <h1>Tasks</h1>

    <div v-if="ticketStore.loading">
      Loading...
    </div>

    <ul v-else>
      <li
        v-for="ticket in ticketStore.tickets"
        :key="ticket.id"
      >
        {{ ticket.id }}
        {{ ticket.status }}
        {{ ticket.eventName }}
        {{ ticket.eventAddress }}
        {{ ticket.eventDate }}  
        
      </li>
    </ul>
  </div>
</template>