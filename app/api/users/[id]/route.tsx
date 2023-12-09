import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
    params : {id : string}
}

export async function GET(request:NextRequest, {params}:Props){
    const user = await prisma.user.findUnique({
        where:{
            id: parseInt(params.id)
        }
    });
    //data not found return 404 else return data
    if (!user) 
        return NextResponse.json({error:'user not found'}, {status : 404});

    return NextResponse.json(user);
}