'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignInForm from './sign-in-form';

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  // Render the page while waiting for session data
  if (session) {
    return null; // Or show a loading spinner
  }

  return (
    <main className="flex pt-32 items-center justify-center p-4">
      <SignInForm />
    </main>
  );
}
