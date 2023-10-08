"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lilita_One } from 'next/font/google'
import Logo from '@/components/Logo'
import Link from 'next/link'
import { AiOutlineLoading } from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast'
import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

const lilita_one = Lilita_One({ weight: "400", subsets: ['latin'] })


export default function LoginForm() {
  const router = useRouter();
  const { data: session } = useSession();


  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = async (data: FieldValues) => {
    const login = await signIn('credentials', {
      ...data, redirect: false, callbackUrl: '/profiles'
    })
    if (login?.error) toast.error(login.error);
  }

  if (session) router.push('/profiles');

  // const login = useCallback(async () => {
  // 	setIsSubmitting(true)
  // 	const lg = await signIn('credentials', {
  // 		email,
  // 		password,
  // 		redirect: false,
  // 		callbackUrl: '/profiles',
  // 	})
  // 	if (lg?.error) {
  // 		toast.error(lg.error)
  // 		setIsSubmitting(false);
  // 	}
  // }, [email, password]);


  return (
    <>
      <Toaster />
      <div className="relative lg:bg-[url('/login-bg.jpg')] min-h-screen bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black bg-opacity-80 min-h-screen w-full">
          <Logo
            className='absolute max-md:w-[150px] md:left-8 max-md:-top-8 left-2 top-2 md:w-[200px] cursor-pointer'
            onClick={() => {
              router.push('/')
            }}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="absolute flex flex-col top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-3 bg-black bg-opacity-70 pt-6 pb-11 px-10 text-white rounded-md">
              <h3 className={`text-4xl ${lilita_one.className} pb-6 pt-2`}>Login</h3>
              <Label htmlFor='email'>Email</Label>
              <Input
                className='bg-slate-600 w-[18rem]'
                type='email'
                id='email'
                {...register('email', {
                  required: {
                    value: true,
                    message: "Email is Required!"
                  },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email is not Valid!"
                  },
                })}
              />
              {errors.email && <p className='text-red-600 text-sm p-0 m-0'>{errors.email.message?.toString()}</p>}
              <Label htmlFor='password'>Password</Label>
              <Input
                className='bg-slate-600 w-[18rem]'
                type='password'
                id='password'
                {...register('password', {
                  required: {
                    value: true,
                    message: "Password is Required!"
                  }
                })}
              />
              {errors.password && <p className='text-red-600 text-sm p-0 m-0'>{errors.password.message?.toString()}</p>}
              <Button disabled={isSubmitting} type='submit' variant='destructive' className='mt-10'>{isSubmitting ? (
                <AiOutlineLoading className="animate-spin duration-500" size={25} />
              ) : 'Sign In'}</Button>
              <div className="flex">
                <p className='text-sm'>New To Tenflix?</p><Link className='text-sm text-red-700 ml-2 underline' href={'/register'}>Register an account</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};