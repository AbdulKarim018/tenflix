"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lilita_One } from 'next/font/google'
import Logo from '@/components/Logo'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'



const lilita_one = Lilita_One({ weight: "400", subsets: ['latin'] })

export default function LoginPage() {
	const { data: session } = useSession()
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const login = useCallback(async () => {
		setIsSubmitting(true)
		const lg = await signIn('credentials', {
			email,
			password,
			redirect: false,
			callbackUrl: '/profiles',
		})
		if (lg?.error) {
			toast.error(lg.error)
			setIsSubmitting(false);
		}
	}, [email, password]);
	if (session) {
		redirect('/profiles');
	}
	return (
		<>
			<Toaster />
			<div className="relative bg-[url('/login-bg.jpg')] min-h-screen bg-no-repeat bg-center bg-fixed bg-cover ">
				<div className="bg-black bg-opacity-80 min-h-screen w-full">
					<Logo
						className='absolute max-md:w-[150px] md:left-8 max-md:-top-8 left-2 top-2 md:w-[200px] cursor-pointer'
						onClick={() => {
							router.push('/')
						}}
					/>
					<div className="absolute flex flex-col top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-3 bg-black bg-opacity-70 pt-6 pb-11 px-10 text-white rounded-md">
						<h3 className={`text-4xl ${lilita_one.className} pb-6 pt-2`}>Login</h3>
						<Label htmlFor='email'>Email</Label>
						<Input
							className='bg-slate-600 w-[18rem]'
							type='email'
							id='email'
							required={true}
							value={email}
							onChange={(e) => { setEmail(e.target.value) }}
						/>
						<Label htmlFor='password'>Password</Label>
						<Input
							className='bg-slate-600 w-[18rem]'
							type='password'
							id='password'
							value={password}
							required={true}
							onChange={(e) => {
								setPassword(e.target.value)
							}}
						/>
						<Button disabled={isSubmitting} onClick={login} variant='destructive' className='mt-10'>{isSubmitting ? (
							<div className="animate-spin"><AiOutlineLoading /></div>
						) : 'Sign In'}</Button>
						<div className="flex">
							<p className='text-sm'>New To Tenflix?</p><Link className='text-sm text-red-700 ml-2 underline' href={'/register'}>Register an account</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}