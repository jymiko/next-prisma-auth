"use client"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"

import { CreateUser} from '@/app/(auth)/signup/action'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { UserSchema } from "@/app/schema/users"
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import SignInForm from "@/app/components/SignInForm"




const initState = {
  message: "",
  code: 0
}

export default function SignIn(){
  const router = useRouter();
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const { status } = useSession();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      passwordHash: ""
    },
  })

  const handleSubmitLogin = async (formData:z.infer<typeof UserSchema>) => {
    console.log(formData)
    try {
        const signInResponse = await signIn('credentials', {
            email:formData.email,
            password:formData.passwordHash,
            redirect: false,
        })

        console.log(signInResponse)
        if(!signInResponse || signInResponse.ok !== true) {
            console.log("Invalid credentials");
        } else {
            router.refresh();
        }

    } catch(err) {
        console.log(err);
    }
};

  useEffect(() => {
    if (status === 'authenticated') {
        if(callbackUrl !== null){
            router.push(callbackUrl, { shallow: true })
            router.refresh();
        }else{
            router.push('/')
            router.refresh()
        }
    }
}, [status]);

  return(
    <>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center space-y-2">
          <h1 className="text-3xl">Welcome Back</h1>
          <h4 className="text-sm text-gray-400">Welcome back, please enter your details</h4>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitLogin)} className="space-y-6 mt-16">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                  control={form.control}
                  name="passwordHash"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <Button type="submit" className="w-full rounded-lg">Submit</Button>
            </form>
          </Form>
        </div>
        {/* <SignInForm/> */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Doesn`t have an account ? <Link href={'/signup'} className="text-blue-500 hover:text-blue-600 font-semibold">Sign Up</Link>
        </p>
      </div>
    </>
  )
}