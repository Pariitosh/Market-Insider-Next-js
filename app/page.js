
import Image from 'next/image'
import styles from './page.module.css'
import { Flex, Title } from '@mantine/core'
import Coin from './components/Coin'
import Link from 'next/link'

export default async function Home() {
  const coins=await fetch('https://api.coincap.io/v2/assets',{cache:'no-store'})
  const CoinsJSON= await coins.json()
  const CoinsData=CoinsJSON.data
  //console.log(CoinsData)
  return (
    <>
    <Flex  bg={'black'} justify={'center'} align={'center'} direction={'column'} gap={'2vh'}>
    <Title style={{color:"#cecece"}}>Market Insider</Title>
      <Flex h='90%' w='95%' bg={'black'} wrap={'wrap'} justify={'center'} align={'center'}>
       
        {CoinsData.map((coin)=>{return <Coin key={coin.name} id={coin.id} symbol={coin.symbol.toLowerCase()} name={coin.name} price={parseInt(coin.priceUsd).toFixed(2)}/>})}
      <Coin/>
      </Flex>
      
    </Flex>
    </>
   
  )
}
