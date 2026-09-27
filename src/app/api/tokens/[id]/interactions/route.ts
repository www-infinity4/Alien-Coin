import { NextRequest,NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function POST(request:NextRequest,{params}:{params:Promise<{id:string}>}){
  const {id:tokenId}=await params;const body=await request.json().catch(()=>({})) as {walletAddress?:string;category?:string;entityId?:string;action?:string;weight?:number};
  if(!body.walletAddress||!body.category||!body.entityId)return NextResponse.json({error:'wallet, category and entity required'},{status:400});
  await prisma.user.upsert({where:{walletAddress:body.walletAddress},update:{},create:{walletAddress:body.walletAddress}});
  await prisma.feedInteraction.create({data:{walletAddress:body.walletAddress,tokenId,category:body.category,entityId:body.entityId,action:body.action||'open',weight:Number(body.weight)||1}});
  return NextResponse.json({ok:true});
}
