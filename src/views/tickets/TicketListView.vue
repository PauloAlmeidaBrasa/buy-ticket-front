<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTicketStore } from '../../stores/ticket'
import { formatDate } from '../../util/generalUtil'
import type { TicketList } from '../../types/ticket'
import BuyTicketModal from './BuyTicketModal.vue'


const ticketStore = useTicketStore()
const selectedTicket = ref<TicketList | null>(null)

function openBuyModal(ticket: TicketList) {
  selectedTicket.value = ticket
}

function closeBuyModal() {
  selectedTicket.value = null
}

async function confirmBuy(ticketId: number) {
  // wire this to your buy API call, e.g. via ticketStore
  console.log('Buying ticket', ticketId)
  closeBuyModal()
}

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

        <table v-else class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-gray-200 text-sm text-gray-500">
            <th class="py-2 pr-4">ID</th>
            <th class="py-2 pr-4">Event</th>
            <th class="py-2 pr-4">Address</th>
            <th class="py-2 pr-4">Date</th>
            <th class="py-2 pr-4">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ticket in ticketStore.tickets"
            :key="ticket.id"
            class="border-b border-gray-100 hover:bg-gray-50"
          >
            <td class="py-2 pr-4">{{ ticket.id }}</td>
            <td class="py-2 pr-4">{{ ticket.eventName }}</td>
            <td class="py-2 pr-4">{{ ticket.eventAddress }}</td>
            <td class="py-2 pr-4">{{ formatDate(ticket.eventDate) }}</td>
            <td class="py-2 pr-4">{{ ticket.status }}</td>
             <td class="py-2 pr-4">
            <button
              class="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
              @click="openBuyModal(ticket)"
            >
              Buy
            </button>
          </td>
          </tr>
        </tbody>
      </table>
       <BuyTicketModal
      v-if="selectedTicket"
      :ticket="selectedTicket"
      @close="closeBuyModal"
      @confirm="confirmBuy"
    />
  </div>
</template>