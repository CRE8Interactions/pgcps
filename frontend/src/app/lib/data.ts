"use server"

import axios from 'axios';
import { authOptions } from '../auth/auth';
import { getServerSession } from 'next-auth';

const apiUrl = process.env.API_HOST;

axios.interceptors.request.use(async function(config) {
    // Adds JWT to request if present
  const session = await getServerSession(authOptions)

  if (session && session.jwt) {
    config.headers['Authorization'] = `Bearer ${session.jwt}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export async function getSchools() {
  // const res = await fetch(`${apiUrl}/schools`)
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch school data')
  // }
  // return res.json()
  const res = await axios.get(`${apiUrl}/schools`)
  return res.data;
}

export async function signIn({ email, password }: any) {
  const res = await axios.post(`${apiUrl}/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}

export async function signUp({ email, password, type, school, fullName }: any) {
  try {
    const res = await axios.post(`${apiUrl}/auth/local/register`, {
      username: email,
      email: email,
      password,
      type,
      school,
      fullName
    });
    return res.data;
  } catch (e: any) {
    return e.response.data.error
  }  
}

export async function getMe() {
  const res = await axios.get(`${apiUrl}/users/me?populate=*`)
  return res.data;
}

export async function createEditProfile({ address, grade, studentNumber, uuid, phoneNumber }: any) {
   const res = await axios.post(`${apiUrl}/profile/create-edit-profile`, {
    address, grade, studentNumber, uuid, phoneNumber
  });
  return res.data;
}

export async function createServiceHours(values: any) {
  const res = await axios.post(`${apiUrl}/service-hour-logs`, values);
  return res.data;
}

export async function getServiceHours() {
  const res = await axios.get(`${apiUrl}/service-hour-logs`);
  return res.data;
}

export async function getAccessRequest(code: string) {
  const res = await axios.get(`${apiUrl}/organizations/access-request?code=${code}`);
  return res.data;
}

export async function approveAccessRequest(code: string) {
  const res = await axios.post(`${apiUrl}/organizations/approve-request`, {code});
  return res.data;
}

export async function approveHour(hourId: string) {
  const res = await axios.post(`${apiUrl}/organizations/approve-hour`, {hourId});
  return res.data;
}