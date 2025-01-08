'use client' 

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import SignInForm from './sign-in-form'

export default function SignInPage() {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    router.push('/dashboard')
    return null 
  }

  return (
    <main className="flex pt-32 items-center justify-center  p-4">
      <SignInForm />
    </main>
  )
}
