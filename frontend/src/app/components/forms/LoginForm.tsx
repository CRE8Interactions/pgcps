"use client"

import { Field, Form, Formik, useFormik, FormikHelpers } from 'formik';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid, Button, Heading
} from '@chakra-ui/react'
import { useState } from 'react';
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const [hasError, setHasError] = useState(false)

  return (
    <>
      {!status &&
        <SimpleGrid columns={1} spacing={10} py={2}>
          <Heading size='sm' color='black'>New to SPRY? Enroll <Link href="/registrations" className="link">here.</Link></Heading>
        </SimpleGrid>
      }

      {status && status === 'new-student' &&
        <p>Your account has been created, please login to continue.</p>
      }

      {status && status === 'new-counselor' &&
        <p> Your account has been created but needs to be approved. Once approved you will receive an email with further instructions.</p>
      }
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={async (values) => {
          const response = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password
          })

          console.log('response ', response)

          if (response?.ok) {
            // Good Request
            router.push("/dashboard");
            router.refresh();
          } else if (response?.status == 401) {
            // Bad request
            setHasError(true)
          }
        }}
      >
        <Form>
          {hasError &&
            <Alert status='error'>
              <AlertIcon />
              <AlertDescription>Email or password is incorrect.</AlertDescription>
            </Alert>
          }
          <SimpleGrid columns={1} spacing={1} py={2}>
            <label htmlFor="email" className="form-label">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
              className="form-field"
            />
          </SimpleGrid>
          <SimpleGrid columns={1} spacing={1} py={2}>
            <label htmlFor="password" className="form-label">Password</label>
            <Field id="password" name="password" type="password" className="form-field" />
          </SimpleGrid>
          <SimpleGrid columns={1} spacing={10} py={5}>
            <Button type="submit" bg="#345def" color="#fff">Submit</Button>
          </SimpleGrid>
        </Form>
      </Formik>
    </>
  )
}