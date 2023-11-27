'use server'
import prisma from "@/app/lib/prisma"
import bcrypt from 'bcryptjs'

export async function CreateUser(prevState:any, formData:FormData){
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
      console.log(e);
      return {
        message: 'Failed to create',
        code: 503
      }
    }
  }
}