"use client"

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RequestApprovalForm from '../components/forms/RequestApprovalForm';
import { Box, Container } from "@chakra-ui/react"
import { getAccessRequest, approveAccessRequest } from '../lib/data';

export default function Page() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (code) {
      let fetchData = async () => {
        let response = await getAccessRequest(code)
        if (response.status == 200) setData(response.data)
      }
      fetchData()
    }
  }, [code])

  const submit = async (code: string) => {
    let request = await approveAccessRequest(code)
    if (request.status == 200) {
      setApproved(true)
    }
  }

  return (
    <Container centerContent maxW='450px'>
      <Box bg="white" w="100%" style={{ marginTop: '120px', borderRadius: '15px', padding: '20px' }} className='card-5'>
        <RequestApprovalForm data={data} submit={submit} setLoading={setLoading} loading={loading} approved={approved} />
      </Box>
    </Container>
  )
}