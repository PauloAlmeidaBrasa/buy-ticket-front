<script setup lang="ts">
import type { TicketList } from '../../types/ticket'
import { formatDate } from '../../util/generalUtil'


defineProps<{
  ticket: TicketList
}>()



function buyTicket(ticket: TicketList) {
//   selectedTicket.value = ticket
}


const emit = defineEmits<{
  close: []
  confirm: [ticketId: number]
}>()
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/50"
      @click="emit('close')"
    />

    <!-- Modal -->
    <div class="relative bg-white rounded-lg shadow-lg w-full max-w-sm mx-4 p-6">
      <button
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        @click="emit('close')"
      >
        ✕
      </button>

      <h2 style="color: black;" class="text-lg font-semibold mb-1">{{ ticket.eventName }}</h2>
      <p class="text-sm text-gray-500 mb-6">{{ "Data:  " + formatDate(ticket.eventDate) }}</p>

      <div class="flex justify-center">
        <button
          class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          @click="emit('confirm', ticket.id)"
        >
          Buy
        </button>
      </div>
    </div>
  </div>
</template>