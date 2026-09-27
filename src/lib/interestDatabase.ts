import { createHash } from 'node:crypto';
import { prisma } from '@/lib/prisma';

const STOP=new Set('the and for with from that this your into have has was were are you they but not all can out one two more phi quant search history collect item data true false null'.split(' '));
const ALIASES:Record<string,string>={scary:'horror',frightening:'horror',saws:'saw',corn:'korn',trees:'tree',natural:'nature'};
function terms(value:string){
  return [...new Set(value.toLowerCase().match(/[a-z][a-z0-9'-]{2,}/g)||[])].map(x=>ALIASES[x]||x).filter(x=>!STOP.has(x)).slice(0,80);
}
function digest(value:string){return createHash('sha256').update(value).digest('hex').slice(0,24)}
export async function ingestSignals(walletAddress:string,raw:string[],sourceSystem='PHI_METADATA'){
  if(!walletAddress||!raw.length)return [];
  await prisma.user.upsert({where:{walletAddress},update:{},create:{walletAddress}});
  const rows=raw.slice(0,30).flatMap((evidence,index)=>terms(evidence).map(term=>({term,evidence:evidence.slice(0,500),event:'signal-'+index+'-'+digest(evidence)})));
  for(const row of rows.slice(0,240))await prisma.interestSignal.upsert({
    where:{walletAddress_sourceSystem_sourceEventId_term:{walletAddress,sourceSystem,sourceEventId:row.event,term:row.term}},
    update:{affinity:{increment:.25},evidence:row.evidence},
    create:{walletAddress,namespace:classify(row.term),term:row.term,affinity:1,sourceSystem,sourceEventId:row.event,evidence:row.evidence}
  });
  return rows.map(x=>x.term);
}
function classify(term:string){
  if(['korn','music','song','album','rock','metal'].includes(term))return 'music';
  if(['saw','horror','scary','movie','film','cinema'].includes(term))return 'screen';
  if(['iowa','zone','tree','cherry','nature','garden'].includes(term))return 'place_nature';
  if(['tool','tools','saw','drill','hardware'].includes(term))return 'shopping';
  return 'interest';
}
export async function walletInterests(walletAddress?:string|null){
  if(!walletAddress)return [];
  const signals=await prisma.interestSignal.findMany({where:{walletAddress},orderBy:[{affinity:'desc'},{lastSeenAt:'desc'}],take:60});
  const interactions=await prisma.feedInteraction.findMany({where:{walletAddress},orderBy:{createdAt:'desc'},take:40});
  return [...signals.map(x=>x.term),...interactions.map(x=>x.category+' '+x.entityId)].slice(0,80);
}
