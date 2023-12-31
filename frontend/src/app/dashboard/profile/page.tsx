import StudentRegistration from "@/app/components/forms/StudentRegistration"
import { ContainerProps } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"

export default function Page() {
  return (
    <Container centerContent>
      <StudentRegistration />
    </Container>
  )
}