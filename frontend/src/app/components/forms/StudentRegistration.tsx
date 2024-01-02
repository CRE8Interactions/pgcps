"use client"

import { Field, Form, Formik, useFormik, FormikHelpers } from 'formik';
import { Text } from '@chakra-ui/react'
import {
  Button,
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  SimpleGrid,
  Grid,
  GridItem,
  Input,
  FormLabel,
  Select
} from '@chakra-ui/react'
import { useState } from 'react';
import { createEditProfile } from '@/app/lib/data';
import { useRouter } from 'next/navigation'

interface Values {
  // firstName: string;
  // lastName: string;
  // email: string;
  // dob: string;
  uuid: string;
  studentNumber: string;
  grade: string;
  phoneNumber: string;
  school: string;
  address: {
    address1: string;
    city: string;
    state: string;
    zipcode: string;
  };
}


export default function StudentRegistration() {
  const grades = [9, 10, 11, 12]
  const [grade, setGrade] = useState('')
  const router = useRouter()

  return (
    <Box bg='#fff' w='100%' p={4} color='black' my="8" className="spry-card">
      <Formik
        initialValues={{
          // firstName: '',
          // lastName: '',
          // email: '',
          uuid: '',
          phoneNumber: '',
          grade: '',
          studentNumber: '',
          school: '',
          address: {
            address1: '',
            city: '',
            state: '',
            zipcode: '',
          }
        }}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          values['grade'] = grade;
          let response = await createEditProfile(values);
          console.log('Res ', response)
          if (response.uuid) {
            setSubmitting(false);
            router.push('/dashboard/home');
          }
        }}
      >
        <Form>
          <SimpleGrid columns={1}>
            <Text fontSize='xs'>Your account is almost ready</Text>
            <Text fontSize='lg' color='green'>Additional Information </Text>
          </SimpleGrid>
          {/* <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ sm: 3, md: 10 }}>
            <Box>
              <Field name='firstName'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.firstName && form.touched.firstName} isRequired>
                    <FormLabel>First name</FormLabel>
                    <Input {...field} placeholder='Enter your first name' />
                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box>
              <Field name='lastName'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.lastName && form.touched.lastName} isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input {...field} placeholder='Enter your last name' />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
          </SimpleGrid> */}

          <SimpleGrid columns={1} py="2">
            <Box>
              <Field name='phoneNumber'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.phoneNumber && form.touched.phoneNumber} isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <Input {...field} placeholder='Enter your phone number' />
                    <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
          </SimpleGrid>

          <SimpleGrid columns={1}>
            <Box>
              <Field name='studentNumber' py="2">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.studentNumber && form.touched.studentNumber} isRequired>
                    <FormLabel>Student Number</FormLabel>
                    <Input {...field} placeholder='Enter your student number' />
                    <FormErrorMessage>{form.errors.studentNumber}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
          </SimpleGrid>

          <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={5} py="2">
            <Box>
              <Field name='grade'>
                {({ field, form }: any) => (
                  <FormControl isRequired>
                    <FormLabel>Choose your Grade</FormLabel>
                    <Select placeholder='Select your grade' onChange={(e) => setGrade(e.target.value)}>
                      {grades && grades.map((grade: number, index: number) => <option key={index} value={grade}>{grade}</option>)}
                    </Select>
                  </FormControl>
                )}
              </Field>
            </Box>
          </SimpleGrid>

          <SimpleGrid columns={1} spacing={5} py="2">
            <Box>
              <Field name='address.address1'>
                {({ field, form }: any) => (
                  <FormControl isRequired>
                    <FormLabel>Mailing Address</FormLabel>
                    <Input {...field} placeholder='Enter your street address' />
                    <FormErrorMessage>{form.errors.studentNumber}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
          </SimpleGrid>

          <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={5} py="2">
            <Box>
              <Field name='address.city'>
                {({ field, form }: any) => (
                  <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input {...field} placeholder='Enter your city' />
                    <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box>
              <Field name='address.state'>
                {({ field, form }: any) => (
                  <FormControl isRequired>
                    <FormLabel>State</FormLabel>
                    <Input {...field} placeholder='Enter your state' />
                    <FormErrorMessage>{form.errors.state}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box>
              <Field name='address.zipcode'>
                {({ field, form }: any) => (
                  <FormControl isRequired>
                    <FormLabel>Zip</FormLabel>
                    <Input {...field} placeholder='Enter your zip' />
                    <FormErrorMessage>{form.errors.zipcode}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
          </SimpleGrid>

          <SimpleGrid columns={{ sm: 1, md: 1 }} py="4">
            <Button
              type="submit"
              w="100%"
              border='1px'
              borderRadius="18px"
              borderColor='green.500'
              bg="#FFD22C"
            >Submit</Button>
          </SimpleGrid>
        </Form>
      </Formik >
    </Box >
  )
}