import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { Box } from '@chakra-ui/react'
import { Show, Button, SimpleGrid, Input } from '@chakra-ui/react'
import { revalidatePath } from "next/cache";

import Link from "next/link";
import { getMe } from "@/app/lib/data";
import { redirect } from 'next/navigation';
import { getServiceHours, approveHour } from '@/app/lib/data';
import ServiceHoursTable from '@/app/components/ServiceHoursTable';

export default async function Page() {
  const session = await getServerSession(authOptions)
  let serviceHours = await getServiceHours()

  let user;

  const confirmation = async (hour: any) => {
    "use server";
    let response = await approveHour(hour.id)
    if (response.status == 200) revalidatePath('/dashboard/home')
    return response.status
  }

  if (session && session.jwt) {
    user = await getMe()

    if (user && user.type == "student" && !user.profile) {
      redirect('/dashboard/profile')
    } else {
      return (
        <>
          {session &&
            <Box p={3}>
              {/* <Input placeholder='Search by student name' /> */}
              <ServiceHoursTable hours={serviceHours} user={user} confirmation={confirmation} />
              <Show below='sm'>
                {user && user.type == "student" &&
                  <SimpleGrid py="4">
                    <Button as={Link} href="/dashboard/new-service-hours">Log Hours</Button>
                  </SimpleGrid>
                }
              </Show>
            </Box>

          }
        </>
      )
    }
  }


}