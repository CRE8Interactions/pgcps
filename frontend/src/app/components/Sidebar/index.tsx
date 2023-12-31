import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'

interface Props {
  onClose: Function
  isOpen: boolean
  variant: 'drawer' | 'sidebar'
}

const SidebarContent = ({ onClick }: { onClick: Function }) => (
  <VStack>
    <Button as={NextLink} href="/api/auth/signout" w="100%">Sign Out</Button>
    <Button as={NextLink} href="/dashboard/home" w="100%">
      Home
    </Button>
    <Button as={NextLink} href="/dashboard/new-service-hours" w="100%">
      Log Service Hours
    </Button>
  </VStack>
)

const Sidebar = ({ isOpen, variant, onClose }: Props) => {

  return variant === 'sidebar' ? (
    <Box
      position="fixed"
      left={0}
      p={5}
      w="200px"
      top={0}
      h="100%"
      bg="#1f388f"
    >
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>SPRY</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default Sidebar