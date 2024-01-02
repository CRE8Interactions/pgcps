
import { Button, VStack, Box, SimpleGrid, Heading, Container, Center } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik';
import LoginForm from '../components/forms/LoginForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard/home')
  }

  return (
    <Container centerContent maxW='450px'>
      <Box bg="white" w="100%" style={{ marginTop: '120px', borderRadius: '15px', padding: '20px' }} className='card-5'>
        <SimpleGrid columns={1} spacing={1}>
          <Center>
            <Heading color="#68D391">SPRY</Heading>
          </Center>
        </SimpleGrid>
        <LoginForm />
      </Box>
    </Container>
  );
}