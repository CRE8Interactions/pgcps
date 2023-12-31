"use client"

import { useEffect } from "react"
import {
  Box,
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
  Text
} from '@chakra-ui/react'
import Head from "next/head"
import ServiceHoursChart from "./ServiceHoursChart"

export default function ServiceHoursTable({ hours, user }) {

  const calculateSum = (arr: any) => {
    return arr.reduce((total: number, current: any) => {
      return total + current?.hoursOfService;
    }, 0);
  }

  let totalHours = 100;
  let myHours = hours?.filter((d: any) => d.status !== "rejected")
  myHours = calculateSum(myHours)

  let hoursNeeded = (totalHours - myHours)

  return (
    <Box>
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
                      <Th>Date of Service</Th>
                      <Th>Organization</Th>
                      <Th>Org Contact</Th>
                      <Th isNumeric>Hours</Th>
                      <Th>Submission Date</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {hours && hours.map((hour: any, index: number) =>
                      <Tr key={index}>
                        <Td>{hour.dateOfService}</Td>
                        <Td>{hour.serviceOrganization}</Td>
                        <Td>{hour.organizationContact}</Td>
                        <Td isNumeric>{hour.hoursOfService}</Td>
                        <Td>{hour.submissionDate}</Td>
                        <Td>{hour.status}</Td>
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