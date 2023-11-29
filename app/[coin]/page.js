'use client'
import { Flex, Title } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default async function Page(){
    
    const params=useParams()
    console.log(params.coin)
    const currentCoin=await fetch(`https://api.coincap.io/v2/assets/${params.coin}`,{cache:'no-store'})
    const coinData= await currentCoin.json()
    const details=coinData.data
    

    const history= await fetch(`https://api.coincap.io/v2/assets/${params.coin}/history?interval=h1`)
    const history2= await history.json()
    console.log('history is ',history2.data)
    const data = history2.data.map(item => ({
        ...item,
        date: new Date(item.time).toISOString().split('T')[0], // convert time to date
      }));
    return(
        <Flex h={'100vh'} w={'100vw'} bg={'black'} align={'center'} direction={'column'}>
            
            <Flex h={'5%'} w={'100%'} bg={'black'} justify={'center'} align={'center'}>
                <Title style={{color:"#cecece"}}><Link style={{textDecoration:"none",color:"#cecece"}} href={'/'}>Home</Link></Title>
            </Flex>
            <Flex h={'60%'} w={'90%'} bg={'black'}>
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
    width={500}
    height={300}
    data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis dataKey="priceUsd" />
    <Tooltip />
   
    <Line type="monotone" dataKey="priceUsd" stroke="#8884d8" activeDot={{ r: 8 }} />
  </LineChart>

      </ResponsiveContainer>
            </Flex>
            <Flex h={'30%'} w={'90%'} bg={'black'} align={'center'} justify={'space-evenly'}>
                <Stats title={'Rank'} value={details.rank}/>
                <Stats title={'Market cap'} value={parseInt(details.marketCapUsd).toFixed(2)}/>
                <Stats title={'Volume 24H'} value={parseInt(details.volumeUsd24Hr).toFixed(2)}/>
                <Stats title={'Supply'} value={parseInt(details.supply).toFixed(2)}/>
                
            </Flex>
            
        </Flex>
    )
}

function Stats({title,value}){
    return(
    <Flex mt={'1%'} mb={'1%'} h={'80%'} w={'20%'} bg={'black'} style={{borderRadius:'15px',border:'1px solid #242424'}} align={'center'} direction={'column'} justify={'center'} gap={'20%'} >
        <Title style={{color:"#cecece"}} order={2}>{title}</Title>
        <Title style={{color:"#cecece"}} order={3}>{value}</Title>
    </Flex>

    )
}