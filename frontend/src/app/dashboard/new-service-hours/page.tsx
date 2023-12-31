import { Box, Container, SimpleGrid } from '@chakra-ui/react'
import SSRForm from '@/app/components/forms/SSRForm'

export default function Page() {
  return (
    <Container>
      <SimpleGrid columns={1} py="8">
        <Box bg='white' p={2} className='spry-card'>
          <SSRForm />
        </Box>
      </SimpleGrid>
    </Container>
  )
}