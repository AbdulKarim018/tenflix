import authOptions from '@/app/api/auth/[...nextauth]/options'
import RegisterationForm from '@/components/RegistrationForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';

const RegisterPage = async () => {

	const session = await getServerSession(authOptions);

	if (session) redirect('/');

	return (
		<RegisterationForm />
	)
}

export default RegisterPage