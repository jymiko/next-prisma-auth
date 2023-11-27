/* eslint-disable react-hooks/rules-of-hooks */
import prisma from "@/app/lib/prisma"
import bcrypt from 'bcryptjs'
import { revalidatePath, revalidateTag } from "next/cache";
import { useOptimistic } from "react";
var message: JSX.Element[] = [];
type Message = {
  message: string
}

// const [optimisticMessages, addOptimisticMessage] = useOptimistic(
//   (state:any, newMessage:string) => [
//     ...state,
//     {
//       text: newMessage,
//       sending: true
//     }
//   ]
// );

async function create(formData:FormData){
  'use server'

  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  

  if(email&& password){
    try{
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

      if(user){
        console.log('User with that email is already exist')
      }

      const passwordHash = bcrypt.hashSync(password, 10)
      await prisma.user.create({
        data: {
          email: email,
          passwordHash: passwordHash
        }
      })

      await prisma.$disconnect()
      // return { message: 'Successfully created' }
    }catch(e:any){
      // let ee: Error = (e as any);
      // addOptimisticMessage(e.message)
      // console.log(e);
      // message.splice(0, message.length);
      // message.push(<div className="bg-red-400 text-white">
      //   {ee.message}
      // </div>)
      console.log(message);
      // return { message: 'Failed to create' }
    }
  }
  revalidatePath("/signup-form-mutation");
  console.log("Masuk");
  // revalidateTag("SignUp");
  // return optimisticMessages
}

export default function SignUp(){
  
  console.log("Data" + message);
  return(
    <>
      <form action={create}>
        <input type='text' id="email" name="email" placeholder="email address"/>
        <input type='password' id="password" name="password" placeholder="password"/>
        <button type="submit">Register</button>
      </form>
      {/* <div>{opt</div> */}
    </>
  )
}