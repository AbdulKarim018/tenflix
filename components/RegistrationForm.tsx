"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lilita_One } from 'next/font/google'
import Logo from '@/components/Logo'
import { AiOutlineLoading } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema, TRegistrationSchema } from '@/lib/zodTypes'

// export type RegistrationFormValues = {
//   name: string,
//   email: string,
//   password: string,
// }



const lilita_one = Lilita_One({ weight: "400", subsets: ['latin'] })

export default function RegisterationForm() {
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<TRegistrationSchema>({
    resolver: zodResolver(RegistrationSchema),
  });
  const onSubmit = async (data: TRegistrationSchema) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000))
      await axios.post('/api/register', {
        data
      })
        .then(() => {
          toast.success("Registration Successful!");
          setTimeout(() => {
            router.push('/login')
          }, 800);
          reset();
        }).catch((error) => {
          const msg = error.response.data.msg;
          toast.error(msg);
        })
    } catch (error) {
      toast.error("Something Bad Happened!");
      console.log(error);

    }
  }


  // const handleRegsiter = useCallback(async () => {
  //   try {
  //     await axios.post('/api/register', {
  //       name,
  //       email,
  //       password,
  //     }).then(() => {
  //       toast.success('Registration Successful!')
  //       setTimeout(() => {
  //         router.push('/login');
  //       }, 1500);
  //     }).catch((error) => {
  //       setIsSubmitting(false);
  //       const msg = error.response.data.msg;
  //       toast.error(msg);
  //     })
  //   } catch (error) {
  //     toast.error("Something Bad Happened :(")
  //     console.log(error);
  //   }
  // }, [name, email, password, router])
  return (
    <>
      <Toaster />
      <div className="relative lg:bg-[url('/login-bg.jpg')] min-h-screen bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black lg:bg-opacity-80 min-h-screen w-full">
          <Logo
            className='absolute max-md:w-[150px] md:left-8 max-md:-top-8 md:w-[200px] cursor-pointer'
            onClick={() => {
              router.push('/')
            }}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="absolute flex flex-col top-[45%] gap-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 pt-6 pb-11 px-10 text-white rounded-md">
              <h3 className={`text-4xl ${lilita_one.className} pb-6 pt-2`}>Register</h3>
              <Label htmlFor='name'>Name</Label>
              <Input type="text" id='name'
                className='bg-slate-600 w-[18rem]'
                {...register("name")}
              />
              {errors.name && <p className='text-red-600 text-sm p-0 m-0'>{errors.name.message?.toString()}</p>}
              <Label htmlFor='email'>Email</Label>
              <Input type="email" id='email'
                className='bg-slate-600 w-[18rem]'
                {...register("email")}
              />
              {errors.email && <p className='text-red-600 text-sm p-0 m-0'>{errors.email.message?.toString()}</p>}
              <Label htmlFor='password'>Password</Label>
              <Input type="password" id='password'
                className='bg-slate-600 w-[18rem]'
                {...register("password")}
              />
              {errors.password && <p className='text-red-600 text-sm p-0 m-0'>{errors.password.message?.toString()}</p>}
              <Button disabled={isSubmitting || isSubmitSuccessful} type='submit' variant='destructive' className='mt-8'>{isSubmitting ? (
                <AiOutlineLoading className="animate-spin duration-500" size={25} />
              ) : 'Sign Up'}</Button>
              <div className="flex">
                <p className='text-sm'>Already Have an account?</p><Link className='text-sm text-red-700 ml-2 underline cursor-pointer' href={'/login'}>Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}