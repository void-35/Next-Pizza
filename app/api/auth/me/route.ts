import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const user = await getUserSession()
        if (!user) {
            return NextResponse.json({erorr:'User session not found'}, {status: 403})
        }
        const findUser = await prisma.user.findUnique({
            where:{
                id: Number(user.id)
            },
            select:{
                email: true,
                fullname: true,
                password: false,
            }
        })
        if(!findUser){
            return NextResponse.json({erorr:'User not found'}, {status: 403})
        }
        return NextResponse.json(findUser)
    } catch (error) {

    }
}