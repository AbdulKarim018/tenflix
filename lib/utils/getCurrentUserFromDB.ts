import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "../prismadb";

export const getCurrentUserFromDB = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Not logged in!");
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    }
  });
  return currentUser;
}