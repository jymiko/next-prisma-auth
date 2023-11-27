"use client"
import React, { useEffect } from 'react'
import { signOut } from 'next-auth/react'


export default function page(){
  
  
const DeleteCookies = () => {
  useEffect(() => {
    signOut({
      callbackUrl:'/',
      redirect: true
    })
  }, [])
  

  return null
}
  return (
    <>
      <DeleteCookies/>
    </>
  )
}