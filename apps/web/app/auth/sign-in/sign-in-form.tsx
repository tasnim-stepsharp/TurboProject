'use client'

import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Checkbox } from '@repo/ui/checkbox'
import Image from 'next/image'
export default function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [shouldRemember, setShouldRemember] = useState(false);


    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: '/dashboard',
        })

        setLoading(false)

        if (result?.error) {
            setError(result.error)
        } else {
            window.location.href = '/dashboard'
        }
    }

    return (
        <div className="w-full max-w-md rounded-md ">
            <div className="mb-6 text-center">

                {/* Logo/Icon */}
                <div className="flex justify-center mb-2">
                    <Image
                        src="/images/logo/logomark.png"
                        alt="Your Company Logo"
                        width={48}
                        height={48}
                        priority
                    />
                </div>

                <h1 className="text-3xl font-semibold text-gray-abc-600 dark:text-Offwhite-abc-100">Log in to your account</h1>
                <p className=" text-gray-abc-100 dark:text-gray-abc-500 pt-3">Welcome back! Please enter your details.</p>
            </div>
            {/* Switch between Sign up & Log in (Optional) */}
            <div className="mb-4 flex items-center font-semibold justify-center rounded-lg border border-gray-abc-400 dark:border-gray-abc-50 bg-Offwhite-abc-200 dark:bg-gray-abc-700">
                <Link
                    href="/auth/sign-up"
                    className="w-6/12 text-center  border border-transparent px-6 py-2 text-gray-abc-200 hover:border-gray-abc-400 dark:hover:border-gray-abc-50 ">
                    Sign up
                </Link>
                <button className="w-6/12 text-center rounded-lg border-l border-gray-abc-400 dark:border-gray-abc-50 bg-white dark:bg-gray-abc-800 px-6 py-2 text-gray-abc-300 dark:text-Offwhite-abc-300">
                    Log in
                </button>
            </div>

            <form className='pt-4' onSubmit={handleSubmit}>
                {/* Email */}
                <label htmlFor="email" className="block text-sm font-medium text-gray-abc-300 dark:text-Offwhite-abc-300">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 mt-1 w-full text-gray-abc-100 dark:text-gray-abc-500 rounded-md border border-gray-abc-400 dark:border-gray-abc-50 p-2 focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-gray-abc-800"
                    required
                />


                {/* Password */}
                <label htmlFor="password" className="block text-sm font-medium text-gray-abc-300 dark:text-Offwhite-abc-300">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="• • • • • • •"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 mt-1 w-full text-gray-abc-100 dark:text-gray-abc-500 rounded-md border border-gray-abc-400 dark:border-gray-abc-50 p-2 focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-gray-abc-800"
                    required
                />

                {/* Extras: Remember checkbox & Forgot password link */}
                <div className="mb-4 flex items-center justify-between text-sm">
                    <div>
                        <Checkbox
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            label="Remember for 30 days"
                            labelClass="font-12"
                            className="size-[18px] 2xl:size-5"
                            onChange={(e) => setShouldRemember(e.target.checked)}
                        />
                    </div>
                    <Link href="/auth/forgot-password" className="text-primary dark:text-Offwhite-abc-300 hover:underline font-semibold">
                        Forgot password
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mb-4 w-full rounded-md bg-primary py-2 text-white hover:bg-purple-700 disabled:opacity-50 font-semibold">
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>

                {error && (
                    <p className="mb-2 rounded bg-red-abc-200 p-2 text-center text-sm text-red-abc-100">
                        {error}
                    </p>
                )}
            </form>

            <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="w-full rounded-md border border-gray-abc-400 dark:border-gray-abc-50 py-2 text-sm text-gray-abc-300 dark:text-Offwhite-abc-300 hover:bg-gray-50 dark:hover:bg-gray-900 font-semibold">
                Sign in with Google
            </button>

            <div className="mt-6 text-center text-sm text-gray-abc-100 dark:text-gray-abc-500">
                Don’t have an account?{' '}
                <Link href="/auth/sign-up" className="font-semibold text-primary dark:text-Offwhite-abc-300 hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    )
}
