/*eğer server tarafında bir şeyler yapacaksan adı route olmalı
eğer client tarafında yapacaksan adı page olmalı
bu dosya http isteklerini karşılıyor.
BİR YENİ BİLGİ İSTEK ADINI BÜYÜK HARFLERLE YAZ
eğer GET metoduna aşağıdaki parametreleri yazarsak cache atmaz
yazmazsak cachelenmiş datayı döndürür
*/

import { NextRequest, NextResponse } from "next/server";
//import products from "./products";

interface Props {
  params: { id: number };
}

export async function GET(request: NextRequest) {
  //fetch users from a db
  const product = await prisma?.products.findMany();
  return NextResponse.json(product, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json(); //request bodysi

  if (!body.name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const newProduct = await prisma?.products.create({
    data:{
        name : body.name,
        price : body.price,
        stock : body.stock
    }
  })

  return NextResponse.json( newProduct , {status : 200});
}

export async function PUT(request: NextRequest, { params }: Props) {
  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: "istek hatalı" }, { status: 400 });
  }

  const productAvailable = prisma?.products.findUnique({
    where: {id:body.id}
  })

  if(!productAvailable)
    return NextResponse.json({error: "id bulunamadı"})

  const newProduct = prisma?.products.update({
    where:{id:body.id},
    data: {
        name : body.name,
        price : body.price,
        stock : body.stock
    }
  })
  return NextResponse.json(newProduct, {status : 200});
}

export async function DELETE(request: NextRequest, { params }: Props) {
    const body = await request.json();

    const product = prisma?.products.findUnique({
        where: {id : body.id}
    })

  if (!product) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }
  return NextResponse.json({});
}
