"use server"

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { Box } from '@chakra-ui/react'
import { Show, Button, SimpleGrid } from '@chakra-ui/react'

import Link from "next/link";
import { getMe } from "@/app/lib/data";
import { redirect } from 'next/navigation';
import { getServiceHours } from '@/app/lib/data';
import ServiceHoursTable from '@/app/components/ServiceHoursTable';

export default async function Page() {
  const session = await getServerSession(authOptions)
  const serviceHours = await getServiceHours()

  let user;

  if (session && session.jwt) {
    user = await getMe()

    if (user && user.type == "student" && !user.profile) {
      redirect('/dashboard/profile')
    } else {
      return (
        <>
          {session &&
            <Box p={3}>
              <ServiceHoursTable hours={serviceHours} user={user} />
              <Show below='sm'>
                <SimpleGrid py="4">
                  <Button as={Link} href="/dashboard/new-service-hours">Log Hours</Button>
                </SimpleGrid>
              </Show>
            </Box>

          }
        </>
      )
    }
  }


}