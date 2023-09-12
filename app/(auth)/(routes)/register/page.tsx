"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lilita_One } from 'next/font/google'
import Logo from '@/components/Logo'
import { signIn, useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import axios from "axios";
import { redirect, useRouter } from 'next/navigation'
import { AiOutlineLoading } from 'react-icons/ai'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';



const lilita_one = Lilita_One({ weight: "400", subsets: ['latin'] })

export default function RegisterPage() {
	const { data: session } = useSession()
	const router = useRouter()
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const register = useCallback(async () => {
		setIsSubmitting(true);
		try {
			await axios.post('/api/register', {
				name,
				email,
				password,
			}).then(() => {
				toast.success('Registration Successful!')
				setTimeout(() => {
					router.push('/login');
				}, 1500);
			}).catch((error) => {
				setIsSubmitting(false);
				const msg = error.response.data;
				toast.error(msg);
			})
		} catch (error) {
			toast.error("Something Bad Happened :(")
			console.log(error);
		}
	}, [name, email, password])
	if (session) {
		router.push('/profiles');
	}
	return (
		<>
			<Toaster />
			<div className="relative bg-[url('/login-bg.jpg')] min-h-screen bg-no-repeat bg-center bg-fixed bg-cover ">
				<div className="bg-black bg-opacity-80 min-h-screen w-full">
					<Logo
						className='absolute max-md:w-[150px] md:left-8 max-md:-top-8 md:w-[200px] cursor-pointer'
						onClick={() => {
							router.push('/')
						}}
					/>
					<div className="absolute flex flex-col top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-3 bg-black bg-opacity-70 pt-6 pb-11 px-10 text-white rounded-md">
						<h3 className={`text-4xl ${lilita_one.className} pb-6 pt-2`}>Register</h3>
						<Label htmlFor='username'>Name</Label>
						<Input
							className='bg-slate-600 w-[18rem]'
							type='text'
							id='username'
							value={name}
							required={true}
							onChange={(e) => { setName(e.target.value) }}
						/>
						<Label htmlFor='email'>Email</Label>
						<Input
							className='bg-slate-600 w-[18rem]'
							type='email'
							id='email'
							value={email}
							required={true}
							onChange={(e) => { setEmail(e.target.value) }}
						/>
						<Label htmlFor='password'>Password</Label>
						<Input
							className='bg-slate-600 w-[18rem]'
							type='password'
							id='password'
							required={true}
							value={password}
							onChange={(e) => { setPassword(e.target.value) }}
						/>
						<Button disabled={isSubmitting} variant='destructive' className='mt-8' onClick={register}>{isSubmitting ? (
							<div className="animate-spin"><AiOutlineLoading /></div>
						) : 'Sign Up'}</Button>
						<div className="flex">
							<p className='text-sm'>Already Have an account?</p><Link className='text-sm text-red-700 ml-2 underline cursor-pointer' href={'/login'}>Login</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}