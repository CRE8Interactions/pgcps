"use client"

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { VStack, Box, SimpleGrid, Heading, Container } from '@chakra-ui/react'
import OrgApprovalForm from "../components/forms/OrgApprovalForm"
import { orgApproval } from '../lib/data'

export default function Page() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const [data, setData] = useState(null)

  useEffect(() => {
    if (code) {
      let fetchData = async () => {
        let response = await orgApproval(code)
        if (response.status == 200) setData(response.data)
      }
      fetchData()
    }
  }, [code])

  return (
    <Container centerContent py="7">
      <OrgApprovalForm data={data} />
    </Container>
  )
}