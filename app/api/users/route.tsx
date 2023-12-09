/*eğer server tarafında bir şeyler yapacaksan adı route olmalı
eğer client tarafında yapacaksan adı page olmalı
bu dosya http isteklerini karşılıyor.
BİR YENİ BİLGİ İSTEK ADINI BÜYÜK HARFLERLE YAZ
eğer GET metoduna aşağıdaki parametreleri yazarsak cache atmaz
yazmazsak cachelenmiş datayı döndürür
*/

import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";


interface Props {
    params : {id : string}
}

export async function GET(request : NextRequest){
    const users = await prisma.user.findMany();
    //fetch users from a db
    return NextResponse.json(users);
}

export async function POST(request:NextRequest){
    const body = await request.json(); //request bodysi
    //her zaman isteği validate et

    const validation = schema.safeParse(body);
    /* bir de parse metodu var o exception fırlatıyor fark bu
    yukarıdaki metot validation sonucunu dönüyor */

    if (!validation.success) {
        return NextResponse.json(validation.error.errors);
    }

    if (!body.name) {
        return NextResponse.json({error: 'name is required'}, {status : 400});
    }

    const user = await prisma.user.findUnique({
        where:{
            email : body.email
        }
    });

    if (user) {
        return NextResponse.json({error: 'User already exist'}, {status: 400});
    }

    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    });

    return NextResponse.json(newUser, {status: 200});
    //şu anda db olmadığından obje olarak yanıt verdirtelim
}

export async function PUT(request : NextRequest, {params}:Props){
    // isteği validate et 
    // eğer istek doğru değilse 400
    // user yoksa 404 döndür
    // sorun yoksa update et ve yeni bilgileri dön
    const body = await request.json();
    if (!body.name) {
        return NextResponse.json({error:'istek hatalı'}, {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!user) {
        return NextResponse.json({error: 'user not found'}, {status : 404});
    }

    const updatedUser = await prisma.user.update({
        where : {id : user.id},
        data : {
            name : body.name,
            email : body.email
        }
    });

    return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest,{params}: Props) {

    const user = await prisma.user.findUnique({
        where: {id : parseInt(params.id)}
    });

    if (!user) {
        return NextResponse.json({error:'user not found'},{status: 404})
    }

    prisma.user.delete({
        where : {id: user.id}
    }); 
    return NextResponse.json({});
}