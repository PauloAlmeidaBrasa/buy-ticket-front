import { defineStore } from 'pinia'
import { ticketService } from '../service/ticket'
import type {  TicketList } from '../types/ticket'

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
    async buyTicket(ticketId: number) {
      this.loading = true

      const userId = localStorage.getItem('userId')
      const email = localStorage.getItem('userEmail')

      try {
        console.log("userId "+userId+" email "+email+" ticketId "+ticketId)
        await ticketService.buy({
          userId: Number(userId),
          ticketId,
          userEmail: email || ''
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