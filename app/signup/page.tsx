'use client'

import SignUpForm from "../components/SignUpForm"

const SignupPage = () => {
  return (
    <div className="flex flex-col gap-4 min-h-screen container mx-auto">
      <h1 className="text-3xl">Signup</h1>
      <SignUpForm/>
    </div>
  )
}

export default SignupPage