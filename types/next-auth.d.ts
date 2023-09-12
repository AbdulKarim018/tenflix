import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { DefaultSession } from 'next-auth';

declare module "next-auth" {
  interface Session {
    id: string;
    role: number;
  }

  interface User {
    id: string;
    hashedPassword?: string;
    emailVerifiedAt?: Date | null
    Profiles: any
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: number;
  }
}

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      hashedPassword?: string;
      emailVerifiedAt?: Date | null
      Profiles: [{
        name: string
        image: string
      }]
    };
  }
}
