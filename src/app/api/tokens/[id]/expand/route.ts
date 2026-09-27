import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildLiveAssetCards, type BundleProfile } from '@/lib/liveBundle';

export async function POST(request:NextRequest,{params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  if(id.startsWith('fallback_'))return NextResponse.json({error:'This local fallback coin must be synced before it can grow across holders.'},{status:409});
  const body=await request.json().catch(()=>({})) as {profile?:BundleProfile};
  const token=await prisma.token.findUnique({where:{id},include:{items:true}});
  if(!token)return NextResponse.json({error:'Token not found'},{status:404});
  const round=Math.max(1,Math.floor(token.items.length/10));
  const cards=await buildLiveAssetCards({...body.profile,round});
  const existing=new Set(token.items.map(item=>item.entityId));
  const newCards=cards.filter(card=>!existing.has(card.entityId));
  if(newCards.length)await prisma.tokenItem.createMany({data:newCards.map(card=>({tokenId:id,category:card.category,entityId:card.entityId,displayOrder:token.items.length+card.displayOrder,notes:JSON.stringify(card.entityData)}))});
  return NextResponse.json({added:newCards.length,round,total:token.items.length+newCards.length});
}
