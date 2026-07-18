import { defineStore } from 'pinia'
import { ticketService } from '../service/ticket'
import type {  TicketList } from '../types/ticket'
import type { BuyTicketMessage } from '../types/ticket'

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
    async buyTicket(message: BuyTicketMessage) {
      this.loading = true

      try {
        // console.log("userId "+userId+" email "+email+" ticketId "+message.ticketId)
        await ticketService.buy({
          userId: message.userId,
          ticketId: message.ticketId,
          userEmail: message.userEmail,
          userWhatsapp: message.userWhatsapp || null
        })
        // this.tickets = await ticketService.getAll()
      } finally {
        this.loading = false
      }
    }

    // async createTask(title: string, description: string) {

    //   const ticket = await ticketService.create({
    //     title,
    //     description
    //   })

    //   this.tasks.push(ticket)
    // }
  }
})