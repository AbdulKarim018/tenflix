import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  const { data } = await req.json();
  const body = {
    name: data.name,
    email: data.email.toLowerCase(),
    password: data.password,
  }

  try {
    const { name, email, password } = body as { name: string, email: string, password: string }
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      }
    })
    if (existingUser) {
      return NextResponse.json({ msg: "Email is already in use!" }, { status: 400 })
    };
    if (!name || !email || !password) {
      return NextResponse.json({ msg: "Fields Cannot be Empty" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        Profiles: {
          create: [
            { name, image: '/profile-blue-1.png' },
            { name: "Profile #2", image: '/profile-red-2.png' },
            { name: "Profile #3", image: '/profile-slate-3.png' },
            { name: "Profile #4", image: '/profile-green-4.png' },
            { name: "Kids", image: '/profile-kids-5.png' },
          ]
        }
      }
    })
    return NextResponse.json({ user }, { status: 201 });
    // return NextResponse.json({ name, email, password }, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: `Someting Went Wrong :(` }, { status: 400 })
  }

};
