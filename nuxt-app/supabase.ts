import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface User {
  id: number
  firstname: string
  lastname: string
  nickname: string
  email: string
  password: string
  created_at: string
  avatar: number
}

export interface Celebration {
  id: number
  name: string
  description: string
  address: string
  date: string
  hour: string
  author: number
  celebration_type: number
  created_at: string
}

const saltRounds = 10

export const getUsers = async () => {
  const { data } = await supabase
    .from('user')
    .select('*')
  return data
}

export const getUserById = async (id: number): Promise<User> => {
  const { data } = await supabase
    .from('user')
    .select('*')
    .eq('user_id', id)
  return data ? data[0] : null
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const { data } = await supabase
    .from('user')
    .select('*')
    .eq('email', email) 
  return data && data.length > 0 ? data[0] : null
}

const formatName = (name: string) => {
  if (!name) return ''
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

export const getCelebrations = async () => {
  const { data } = await supabase
    .from('celebration')
    .select('*')
    return data
}

export const getCelebrationById = async (id: number): Promise<Celebration> => {
  const { data } = await supabase
    .from('celebration')
    .select('*')
    .eq('celebration_id', id)
    return data ? data[0] : null
}