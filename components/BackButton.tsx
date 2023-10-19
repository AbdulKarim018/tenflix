"use client"
import { useRouter } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi'

const BackButton = () => {
  const router = useRouter();
  return (
    <BiArrowBack size={30} className="text-white cursor-pointer" onClick={() => { router.push('/') }} />
  )
}

export default BackButton