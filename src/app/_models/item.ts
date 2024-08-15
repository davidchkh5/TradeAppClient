import { Offer } from "./offer"

export interface Item {
    id: number
    name: string
    itemPhotos: any
    mainPhotoUrl: string
    ownerId: number
    ownerUsername: any
    description: string
    tradeFor: string
    offers: Offer[]
    
  }
  