import SignUpForm from "../components/SignUpForm"
import { Box, Container } from "@chakra-ui/react"

export default function Page() {
  return (
    <Container centerContent maxW='450px'>
      <Box bg="white" w="100%" style={{ marginTop: '120px', borderRadius: '15px', padding: '20px' }} className='card-5'>
        <SignUpForm />
      </Box>
    </Container>
  )
}