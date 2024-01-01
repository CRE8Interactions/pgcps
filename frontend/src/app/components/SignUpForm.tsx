"use client"

import { Field, Form, Formik } from 'formik';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  SimpleGrid,
  Text,
  Select
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { signUp } from '../lib/data';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getSchools } from '../lib/data';

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const request = searchParams.get('requesting')
  const { data: session, update: sessionUpdate } = useSession();
  const [schools, setSchools] = useState([])
  const [school, setSchool] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const emailPlaceholder = request && request === "counselor" ? "Enter @pgcps.org email" : "Enter email address"

  const fetchSchools = async () => {
    let schools = await getSchools()
    setSchools(schools)
  }

  useEffect(() => {
    fetchSchools()
  }, [])

  return (

    <Formik
      initialValues={{
        email: '',
        password: '',
        type: '',
        fullName: '',
        school: ''
      }}
      onSubmit={async (values) => {
        values['school'] = school

        const response = await signUp({
          email: values.email,
          password: values.password,
          type: request,
          fullName: values.fullName,
          school: values.school
        })

        if (response?.jwt) {
          // Good Request
          if (request === "student") router.push("/login?status=new-student");
          if (request === "counselor") router.push("/login?status=new-counselor");
          router.refresh();
        } else if (response.status === 400) {
          setAlertMsg(response.message)
        }
      }}
    >
      <Form>
        {alertMsg &&
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{alertMsg}</AlertTitle>
          </Alert>
        }
        <SimpleGrid columns={1} py={3}>
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <Field
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            type="text"
            required
            className="form-field"
          />
        </SimpleGrid>

        <SimpleGrid columns={1} py="2">
          <label htmlFor="email" className="form-label">Email</label>
          <Field
            id="email"
            name="email"
            placeholder={emailPlaceholder}
            type="email"
            required
            className="form-field"
          />
          {request && request === "counselor" &&
            <Text as="b" fontSize="sm" color="#E53E3E">You must use a @pgcps.org email.</Text>
          }
        </SimpleGrid>

        <SimpleGrid columns={1} py="2">
          <label htmlFor="password" className="form-label">Password</label>
          <Field id="password" name="password" type="password" required className="form-field" />
        </SimpleGrid>

        <SimpleGrid columns={1} py="2">
          <label htmlFor="school" className="form-label">School</label>
          <Select placeholder='Select school' onChange={(e) => setSchool(e.target?.value)} required>
            {schools && schools.map((school: any) => <option value={school.id} key={school.id}>{school?.name}</option>)}
          </Select>
        </SimpleGrid>

        <SimpleGrid columns={1} py="4">
          <Button type="submit">Submit</Button>
        </SimpleGrid>
      </Form>
    </Formik>

  )
}