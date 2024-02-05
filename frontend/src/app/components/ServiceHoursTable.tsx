"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  SimpleGrid,
  Heading,
  Center,
  Show,
  Text,
} from '@chakra-ui/react'
import ServiceHoursChart from "./ServiceHoursChart"
import ConfirmationAlert from "./alerts/ConfirmationAlert"
import { Link } from "@chakra-ui/react"

export default function ServiceHoursTable({ hours, user, confirmation }: any) {
  const calculateSum = (arr: any) => {
    return arr.reduce((total: number, current: any) => {
      return total + current?.hoursOfService;
    }, 0);
  }

  let totalHours = 100;
  let myHours = hours?.filter((d: any) => d.status !== "rejected")
  myHours = calculateSum(myHours)

  let hoursNeeded = (totalHours - myHours)

  const [isOpen, setIsOpen] = useState(false)
  const [onClose, setOnClose] = useState(false)
  const [selectedHour, setSelectedHour] = useState()

  const confirmApproval = (hour: any) => {
    setSelectedHour(hour)
    setIsOpen(true)
  }

  const submitApproval = async () => {
    confirmation(selectedHour)
  }

  useEffect(() => {
    if (onClose) {
      submitApproval()
      setIsOpen(false)
      setOnClose(false)
    }
  }, [onClose])

  return (
    <Box>
      <ConfirmationAlert isOpen={isOpen} setOnClose={setOnClose} setIsOpen={setIsOpen} selectedHour={selectedHour} />
      {hours && hours.length > 0 &&
        <>
          <SimpleGrid>
            <Center>
              <Heading color="#68D391" className='drop-shadow' size="lg">Service Hours</Heading>
            </Center>
          </SimpleGrid>
          <SimpleGrid py="4">
            <Show above='sm'>
              <TableContainer bg="white" className="spry-card" p={2}>
                <Table variant='striped' colorScheme='facebook' size='sm' bg="white">
                  <Thead>
                    <Tr>
                      {user && user.type == "counselor" &&
                        <>
                          <Th>Student</Th>
                          <Th>Grade</Th>
                        </>
                      }
                      <Th>Date of Service</Th>
                      <Th>Organization</Th>
                      <Th>Org Contact</Th>
                      <Th isNumeric>Hours</Th>
                      <Th>Organization Approved</Th>
                      <Th>Status</Th>
                      {user && user.type == "counselor" &&
                        <Th></Th>
                      }
                    </Tr>
                  </Thead>
                  <Tbody>
                    {hours && hours.map((hour: any, index: number) =>
                      <Tr key={index}>
                        {user && user.type == "counselor" &&
                          <>
                            <Td>{hour.student.fullName}</Td>
                            <Td>{hour.student?.profile.grade}</Td>
                          </>
                        }
                        <Td>{hour.dateOfService}</Td>
                        <Td>{hour.serviceOrganization}</Td>
                        <Td>
                          <Link href={`mailto:${hour.organizationContact}`} color='teal.500'>
                            {hour.organizationContact}
                          </Link>
                        </Td>
                        <Td isNumeric>{hour.hoursOfService}</Td>
                        <Td>{hour.organization_approval.approved == null ? 'waiting confirmation' : hour.organization_approval.approved}</Td>
                        <Td>{hour.status}</Td>
                        {user && user.type == "counselor" &&
                          <Td>
                            <Button size="xs" colorScheme="green" isDisabled={hour.status == "approved"} onClick={() => confirmApproval(hour)}>Approve</Button>
                          </Td>
                        }
                      </Tr>
                    )
                    }
                  </Tbody>
                  {user && user.type === "student" &&
                    <Tfoot>
                      <Tr>
                        <Th colSpan={3}>Total Hours</Th>
                        <Th isNumeric>{myHours}</Th>
                      </Tr>
                      <Tr>
                        <Th colSpan={3}>Hours Needed</Th>
                        <Th isNumeric color="red">{hoursNeeded}</Th>
                      </Tr>
                    </Tfoot>
                  }
                </Table>
              </TableContainer>
            </Show>
            <Show below='sm'>
              <ServiceHoursChart data={hours} />
            </Show>
          </SimpleGrid>
        </>
      }

      {hours && hours.length === 0 &&
        <SimpleGrid>
          <Center>
            <Heading color="#E53E3E" className='drop-shadow' size="md" py="40">No Service Hours logged.</Heading>
          </Center>
        </SimpleGrid>
      }
    </Box>

  )
}