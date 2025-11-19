'use client'

import { createContext } from 'react'
import type { User } from './types'

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login?: (user: User) => void
  logout?: () => void
}

export interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: undefined,
  logout: undefined,
})

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
})
