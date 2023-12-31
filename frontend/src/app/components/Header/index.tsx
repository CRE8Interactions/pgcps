import { Box, Center, IconButton, Heading, Flex } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

interface Props {
  onShowSidebar: Function
  showSidebarButton?: boolean
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
  return (
    <Flex bg="#F7FAFC" p={4} color="white" justifyContent="center">
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            icon={<ChevronRightIcon w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Center flex="1" h="40px">
        <Heading size="xl" color="#68D391" className='drop-shadow'>SPRY</Heading>
      </Center>
      <Box flex="1" />
    </Flex>
  )
}

export default Header