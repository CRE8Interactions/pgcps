"use client"

import NextLink from 'next/link'
import { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createServiceHours } from '@/app/lib/data';

import {
  Center,
  SimpleGrid,
  Box,
  Button,
  Heading,
  Text
} from '@chakra-ui/react'

const steps = [
  { title: 'First', description: 'Service Hour Log' },
  { title: 'Second', description: 'Student Assesment' },
  { title: 'Final', description: 'Confirmation' },
]

interface Values {
  dateOfService: any;
  serviceOrganization: string;
  organizationContact: string;
  hoursOfService: number;
  SSLpreparation: string;
  SSLactivity: string;
  SSLreflection: string;
}

export default function SSRForm() {
  const [startDate, setStartDate] = useState(new Date());
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [step, setStep] = useState(0)

  return (
    <>
      <Box>
        <Formik
          initialValues={{
            dateOfService: new Date(),
            serviceOrganization: '',
            organizationContact: '',
            hoursOfService: 0,
            SSLpreparation: '',
            SSLactivity: '',
            SSLreflection: '',
          }}
          onSubmit={async (
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            let response = await createServiceHours(values);

            if (response.status === 200) {
              setSubmitting(false);
              setStep((currentStep) => currentStep + 1)
            }

          }}
        >
          <Form>
            {step === 0 &&
              <>
                <SimpleGrid columns={1}>
                  <Center>
                    <Heading size='lg' color="#68D391" className='drop-shadow' >Service Hour Log</Heading>
                  </Center>
                </SimpleGrid>
                <SimpleGrid columns={1} py="3">
                  <label htmlFor="dateOfService" className="form-label">Date Of Service</label>
                  <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} className="form-field" />
                </SimpleGrid>
                <SimpleGrid columns={1} py="2">
                  <label htmlFor="serviceOrganization" className="form-label">Organization Name</label>
                  <Field id="serviceOrganization" name="serviceOrganization" className="form-field" placeholder="Name of place you volunteered" />
                </SimpleGrid>
                <SimpleGrid columns={1} py="2">
                  <label htmlFor="organizationContact" className="form-label">Organization Contact</label>
                  <Field id="organizationContact" name="organizationContact" type="email" className="form-field" placeholder="Enter email address" />
                </SimpleGrid>
                <SimpleGrid columns={1} py="2">
                  <label htmlFor="hoursOfService" className="form-label">Hours Of Service</label>
                  <Field id="hoursOfService" name="hoursOfService" as="select" className="form-field">
                    {
                      hours.map((hour: number) => <option key={hour} value={hour}>{hour}</option>)
                    }
                  </Field>
                </SimpleGrid>
                <SimpleGrid columns={1} py={3}>
                  <Button onClick={() => setStep((currentStep) => currentStep + 1)} w="100%">Send Verification</Button>
                </SimpleGrid>
              </>
            }
            {step === 1 &&
              <>
                <SimpleGrid columns={1} py="2">
                  <Center>
                    <Heading size='lg' color="#68D391" className='drop-shadow' >Service Hour Log</Heading>
                  </Center>
                  <Text fontSize='sm' py="2">In a well-written paragraph, respond to the following prompts:</Text>
                </SimpleGrid>
                <SimpleGrid columns={1} py="1">
                  <label htmlFor="SSLpreparation" className="form-label">I. Discuss your preparation for the service-learning activity/activities.</label>
                  <Field id="SSLpreparation" name="SSLpreparation" as="textarea" placeholder="Enter Response" className="form-field text-area" />
                </SimpleGrid>
                <SimpleGrid columns={1} py="2">
                  <label htmlFor="SSLactivity" className="form-label">II. Describe the service-learning activity/activities that you completed.</label>
                  <Field id="SSLactivity" name="SSLactivity" as="textarea" placeholder="Enter Response" className="form-field text-area" />
                </SimpleGrid>
                <SimpleGrid columns={1} py="2">
                  <label htmlFor="SSLreflection" className="form-label">III. Upon reflection, what did you learn about yourself and others?</label>
                  <Field id="SSLreflection" name="SSLreflection" as="textarea" placeholder="Enter Response" className="form-field text-area" />
                </SimpleGrid>
                <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={2} spacingY='10px'>
                  <Box>
                    <Button onClick={() => setStep((currentStep) => currentStep - 1)} w="100%">Previous</Button>
                  </Box>
                  <Box>
                    <Button type="submit" w="100%" bg="#345def" color="#fff">Submit</Button>
                  </Box>
                </SimpleGrid>
              </>
            }
            {step === 2 &&
              <>
                <SimpleGrid columns={1}>
                  <Center>
                    <Heading size='lg' color="#68D391" className='drop-shadow'>Service Hours Submitted!</Heading>
                  </Center>
                  <Text fontSize='md' py="3">Congratulations! Your service hours have been successfully submitted and uploaded to your timesheet. Notifications have been sent to your counselor and verification has been sent to the organization.</Text>
                </SimpleGrid>
                <SimpleGrid columns={1} py="3">
                  <Button as={NextLink} href="/dashboard/home" w="100%" bg="#345def" color="#fff">
                    View Hours
                  </Button>
                </SimpleGrid>
              </>
            }
          </Form>
        </Formik>
      </Box>
    </>
  )
}