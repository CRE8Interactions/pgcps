import {
  Button,
  Heading,
  SimpleGrid,
  Text,
  Stack,
  StackDivider,
  Card, CardHeader, CardBody, CardFooter,
  Box
} from '@chakra-ui/react'

export default function RequestApprovalForm({ data, submit, setLoading, loading, approved }: any) {

  return (
    <SimpleGrid>
      <Card>
        <CardHeader>
          <Heading size='md'>Access Request</Heading>
        </CardHeader>

        <CardBody>
          {data && !approved &&
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Summary
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {data.requestor.fullName} has requested access to join {data.requestor.school.name}.  To approve click the approve button.
                </Text>
              </Box>

              <Box>
                <Button isLoading={loading} w="100%" bg="#345def" color="#fff" onClick={() => { submit(data.code); setLoading(true) }}>Approve</Button>
              </Box>
            </Stack>
          }

          {approved &&
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Summary
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Approval complete you may exit this screen.
                </Text>
              </Box>
            </Stack>
          }
        </CardBody>
      </Card>
    </SimpleGrid>
  )
}