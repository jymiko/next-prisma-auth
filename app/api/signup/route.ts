import prisma from "@/app/lib/prisma"
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server"

export async function POST(request:Request){
  const { email, password } = await request.json()
  try{
    const user =  await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if(user){
      return new NextResponse('User with that email is already exist', { status: 400 })
    }

    const passwordHash = bcrypt.hashSync(password, 10)

    await prisma.user.create({
      data: {
        email,
        passwordHash
      }
    })
    await prisma.$disconnect()
    return new NextResponse('Successfully created new user', { status: 200 })
  }catch(e){
    console.log(e)
    return new NextResponse('Internal Server Error', { status: 400 })
  }
}