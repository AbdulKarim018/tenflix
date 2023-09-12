import { cookies } from 'next/headers'
export function GET(req: Request) {
  cookies().delete('next-auth.session-token')
}
