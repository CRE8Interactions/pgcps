'use client'

import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import "./globals.css";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient ? <ChakraProvider theme={theme}>{children}</ChakraProvider> : null
}