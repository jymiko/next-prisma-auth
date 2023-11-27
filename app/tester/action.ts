"use server"

export async function TestAction(prevState: any ,form: FormData)
{
  return {
    message: form.get("nametxt")?.toString()
  }
}