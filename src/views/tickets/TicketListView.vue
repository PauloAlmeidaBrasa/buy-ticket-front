<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTicketStore } from '../../stores/ticket'
import { formatDate } from '../../util/generalUtil'
import type { TicketList } from '../../types/ticket'
import BuyTicketModal from './BuyTicketModal.vue'


const ticketStore = useTicketStore()
const selectedTicket = ref<TicketList | null>(null)
const buyError = ref<string | null>(null)

function openBuyModal(ticket: TicketList) {
  buyError.value = null
  selectedTicket.value = ticket
}

function closeBuyModal() {
  selectedTicket.value = null
  buyError.value = null
}

function validateBuyFields(ticketId: number, userId: number, userEmail: string): string | null {
  if (!ticketId || Number.isNaN(ticketId) || ticketId <= 0) {
    return 'Invalid ticket. Please try again.'
  }
  if (!userId || Number.isNaN(userId) || userId <= 0) {
    return 'You must be logged in to buy a ticket.'
  }
  if (!userEmail || userEmail.trim() === '') {
    return 'A valid email is required to buy a ticket.'
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(userEmail)) {
    return 'The email on file is invalid.'
  }
  return null
}

async function confirmBuy(ticketId: number) {
  const userId = Number(localStorage.getItem('userId'))
  const userEmail = localStorage.getItem('userEmail') || ''

  const validationError = validateBuyFields(ticketId, userId, userEmail)
  if (validationError) {
    buyError.value = validationError
    return
  }

  buyError.value = null

  try {
    await ticketStore.buyTicket({
      userId,
      ticketId,
      userEmail,
      userWhatsapp: localStorage.getItem('userWhatsapp') || null
    })
    closeBuyModal()
    await ticketStore.fetchTickets() // refresh list to reflect new status
  } catch (err) {
    buyError.value = 'Failed to buy ticket. Please try again.'
  }
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