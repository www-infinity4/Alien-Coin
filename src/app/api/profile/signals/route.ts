import { NextRequest,NextResponse } from 'next/server';
import { ingestSignals,walletInterests } from '@/lib/interestDatabase';
export async function POST(request:NextRequest){
  const body=await request.json().catch(()=>({})) as {walletAddress?:string;signals?:string[];sourceSystem?:string};
  if(!body.walletAddress)return NextResponse.json({error:'walletAddress required'},{status:400});
  await ingestSignals(body.walletAddress,body.signals||[],body.sourceSystem||'PHI_METADATA');
  return NextResponse.json({ok:true,interests:await walletInterests(body.walletAddress)});
}
