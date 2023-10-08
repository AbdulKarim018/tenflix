import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
    const body = await req.json();
    await prismadb.user.delete({
        where: {
            id: body.user.id,
        }
    })
    return NextResponse.json({ msg: "success!" })
}