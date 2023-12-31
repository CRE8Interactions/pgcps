"use client"

import { Providers } from '@/app/providers'
import AuthProvider from '@/app/auth/Provider'
import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import { useState } from 'react'
import { Box, useBreakpointValue } from '@chakra-ui/react'

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {

  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant })

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  return (
    <html lang='en'>
      <body>
        <>
          <Sidebar
            variant={variants?.navigation}
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
          />
          <Box ml={!variants?.navigationButton && 200}>
            <Header
              showSidebarButton={variants?.navigationButton}
              onShowSidebar={toggleSidebar}
            />
            <AuthProvider>
              <Providers>
                {children}
              </Providers>
            </AuthProvider>
          </Box>
        </>
      </body>
    </html>
  )
}