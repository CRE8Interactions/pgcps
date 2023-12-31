"use client";

import { Button, VStack, Box, SimpleGrid, Heading, Container } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const toStudent = () => {
    router.push('/signup?requesting=student')
  }

  const toCounselor = () => {
    router.push('/signup?requesting=counselor')
  }

  return (
    <Container centerContent>
      <SimpleGrid columns={1} py="10">
        <Heading color="#68D391">SPRY</Heading>
      </SimpleGrid>
      <SimpleGrid columns={1}>
        <Heading size="sm" color="white">Already Registered? Log in <Link href="/login" className="link">here.</Link></Heading>
      </SimpleGrid>
      <SimpleGrid columns={1} py="7">
        <Box>
          <VStack
            spacing={8}
            align='stretch'
          >
            <Box h='40px'>
              <Button
                size='md'
                height='48px'
                width='200px'
                border='1px'
                borderColor='green.500'
                borderRadius="18px"
                bg="#FFD22C"
                onClick={toStudent}
              >
                I am a student
              </Button>
            </Box>
            <Box h='40px'>
              <Button
                size='md'
                height='48px'
                width='200px'
                border='1px'
                borderRadius="18px"
                borderColor='green.500'
                bg="#FFD22C"
                onClick={toCounselor}
              >
                I am a counselor
              </Button>
            </Box>
          </VStack>
        </Box>
      </SimpleGrid>
    </Container>
  )
}