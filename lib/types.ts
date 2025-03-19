import type { DefaultSession } from "next-auth"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  model: string
  imageUrl: string
  featured?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  isAdmin: boolean
}

// Extend next-auth types
declare module "next-auth" {
  interface User {
    isAdmin: boolean
  }

  interface Session {
    user: {
      id: string
      isAdmin: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: boolean
  }
}

