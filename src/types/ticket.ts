export interface Ticket {
  id: number
  status: string
  description: string
}

export interface TicketList {
  id: number
  status: string
  eventName: string,
  eventAddress: string,
  eventDate: string

}

export interface BuyTicketMessage {
  userId: number
  ticketId: number,
  userEmail: string
}