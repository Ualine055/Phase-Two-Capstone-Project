'use client'

import { createContext } from 'react'
import type { User } from './types'

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
})

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
})
