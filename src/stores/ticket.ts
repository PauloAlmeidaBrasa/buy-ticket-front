import { defineStore } from 'pinia'
import { ticketService } from '../service/ticket'
import type { Ticket, TicketList } from '../types/ticket'

export const useTicketStore = defineStore('ticket', {

  state: () => ({
    tickets: [] as TicketList[],
    loading: false
  }),

  actions: {

    async fetchTickets() {
      this.loading = true

      try {
        this.tickets = await ticketService.getAll()
      } finally {
        this.loading = false
      }
    },

    // async createTask(title: string, description: string) {

    //   const ticket = await ticketService.create({
    //     title,
    //     description
    //   })

    //   this.tasks.push(ticket)
    // }
  }
})