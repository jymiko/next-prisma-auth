'use server'
import prisma from "@/app/lib/prisma"
import bcrypt from 'bcryptjs'
import { z } from "zod"
import { UserSchema } from "../../schema/users"

export async function CreateUser(prevState:any, formData:z.infer<typeof UserSchema>){
  const email = formData.email
  const password = formData.passwordHash
  // console.log(email, password)
  if(email&& password){
    try{
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

      if(user){
        return {
          message: 'User is already existed',
          code: 409
        }
      }

      const passwordHash = bcrypt.hashSync(password, 10)
      await prisma.user.create({
        data: {
          email: email,
          passwordHash: passwordHash
        }
      })

      await prisma.$disconnect()
      return {
        message: 'User Created Successfully',
        code: 200
      }
    }catch(e:any){
      return {
        message:  'Failed to create',
        code: 503
      }
    }
  }
}