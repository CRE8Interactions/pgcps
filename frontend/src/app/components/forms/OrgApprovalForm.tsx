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

export default function OrgApprovalForm({ data }: any) {
  return (
    <SimpleGrid>
      <Card>
        <CardHeader>
          <Heading size='md'>Confirm Hours</Heading>
          {data &&
            <Stack divider={<StackDivider />} spacing='4'>
              <Text pt='2' fontSize='sm'>
                {data.student.fullName} needs your approval for {data.service_hour_log.hoursOfService} hour(s).  To approve click the approve or deny click buttons below.
              </Text>
              <Box>
                <Button w="100%" bg="#345def" color="#fff" onClick={() => { console.log('Approved') }}>Approve</Button>
                <Button mt="2" w="100%" bg="red" color="#fff" onClick={() => { console.log('Deny') }}>Deny</Button>
              </Box>
            </Stack>
          }
        </CardHeader>
      </Card>
    </SimpleGrid>
  )
}