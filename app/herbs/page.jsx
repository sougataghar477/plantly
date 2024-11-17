'use client';
import { useContext } from "react";
import market from "@/market";
import GreenCard from "@/components/Card";
import { Box,Container,Flex,Text,Heading } from "@chakra-ui/react";
import { SearchContext } from '@/context/SearchContext';
function Herbs(){
  const { searchResults, updateSearchResults,query,addToCart } = useContext(SearchContext);
return <Container py={16} px={[4,16,16]} maxW={1260}>
         
            <Box maxW={940} mx={'auto'}>
              <Heading mb={8} fontSize={'4xl'}>{query.length>0?'Searched Items':'Herbs'}</Heading>
            <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'} >
{query.length>0?market.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).map((herb, index) => (
      <GreenCard
        key={index}
        name={herb.name}
        description={herb.description}
        price={herb.price}
      />
    )): market
    .filter(item => item.category === 'herbs')
    .map((herb, index) => (
      <GreenCard
        key={index}
        name={herb.name}
        description={herb.description}
        price={herb.price}
      />
    ))}
{market.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).length===0 && <Heading>No Results Found</Heading>}
            </Flex>
            </Box>
        
</Container>
}
export default Herbs;