import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
export function GET(req: Request) {
  cookies().delete('next-auth.session-token')
  return NextResponse.json({ msg: "success!" })
}