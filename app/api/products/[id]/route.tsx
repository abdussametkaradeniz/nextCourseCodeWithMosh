import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
    name: string;
    price: number;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  const product = await prisma.products.findUnique({
    where: { id : parseInt(params.id) },
  });


  //data not found return 404 else return data
  if (!product)
    return NextResponse.json({ error: "product not found" }, { status: 404 });

  return NextResponse.json(product, { status: 200 });
}
