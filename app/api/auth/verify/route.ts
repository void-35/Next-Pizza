import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get('code')
        if(!code){
            return NextResponse.json({erorr:'Code not found'}, {status: 400})
        }

        const verifyCode = await prisma.verifyCode.findFirst({
            where:{
                code: code
            }
        })
        if(!verifyCode){
            return NextResponse.json({erorr:'Invalid code'}, {status: 400})
            
        }

        await prisma.user.update({
            where:{
                id: verifyCode.userId
            },
            data:{
                verfied: new Date()
            }
        })

        await prisma.verifyCode.delete({
            where:{
                id: verifyCode.id
            }
        })

        return NextResponse.redirect(new URL('/?verified', req.url))
    } catch (error) {
        console.error(error)
        console.log('[VERIFY GET], Server error', error)
    }
}