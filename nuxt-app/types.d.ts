export interface User {
  id: string
  firstname: string
  lastname: string
  nickname: string
  email: string
  password: string
  created_at: string
  avatar: string
}

export interface Celebration {
  id: string
  name: string
  description: string
  address: string
  date: string
  hour: string
  author: number
  celebration_type: number
  created_at: string
}