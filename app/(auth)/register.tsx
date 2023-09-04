import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lilita_One } from 'next/font/google'



const lilita_one = Lilita_One({ weight: "400", subsets: ['latin'] })

export default function AuthPage() {
    return (
        <div className="relative bg-[url('/login-bg.jpg')] min-h-screen bg-no-repeat bg-center bg-fixed bg-cover ">
            <div className="bg-black bg-opacity-80 min-h-screen w-full">
                <div className="absolute flex flex-col top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-3 bg-black bg-opacity-70 pt-6 pb-11 px-10 text-white rounded-md">
                    <h3 className={`text-4xl ${lilita_one.className} pb-6 pt-2`}>Register</h3>
                    <Label htmlFor='username'>Username</Label>
                    <Input
                        className='bg-slate-600 w-[18rem]'
                        type='text'
                        id='username'
                    />
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        className='bg-slate-600 w-[18rem]'
                        type='email'
                        id='email'
                    />
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        className='bg-slate-600 w-[18rem]'
                        type='password'
                        id='password'
                    />
                    <Button variant='destructive' className='
          mt-8
          '>Sign Up</Button>
                </div>
            </div>
        </div>
    )
}