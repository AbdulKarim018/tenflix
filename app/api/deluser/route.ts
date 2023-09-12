import prismadb from '@/lib/prismadb';
export async function POST(req: Request) {
    const body = await req.json();
    await prismadb.user.delete({
        where: {
            id: body.user.id,
        }
    })
}