"use client"
import { useFormState } from "react-dom"
import { CreateUser} from '@/app/signup-form-mutation/action'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { useEffect, useState } from "react"

const initState = {
  message: "",
  code: 0
}

export default function SignUp(){
  const [state, action] = useFormState(CreateUser, initState)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(state?.message !== null){
      setOpen(true)
    }
  }, [state])
  
  return(
    <>
      <form action={action}>
        <input type='text' id="email" name="email" placeholder="email address"/>
        <input type='password' id="password" name="password" placeholder="password"/>
        <button type="submit">Register</button>
      </form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>
              {state?.code == 200 ? state.message : (state?.message + ' with error code ' + state?.code)}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}