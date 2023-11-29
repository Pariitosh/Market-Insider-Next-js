
import { Flex, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function Coin({symbol,name,price,id}){
    return(
        
        <Flex mb={'2%'} mr={'1%'} mt={'1%'} h='10%' w='15%' bg={'#0a0a0a'} style={{borderRadius:"15px",border:'1px solid #242424'}} justify={'center'} align={'center'} direction={'column'}>
            
            <img height={'20%'} width={'30%'} src={`https://assets.coincap.io/assets/icons/${symbol}@2x.png`}/>
            <Title order={4} style={{color:"#cecece"}}><Link style={{textDecoration:"none",color:"#cecece"}} href={`/${id}`}>{name}</Link></Title>
            <Title  style={{color:"#cecece"}} order={5}>{price}</Title>
            

        </Flex>
    )
}