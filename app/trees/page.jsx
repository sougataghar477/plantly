'use client';
import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";
import market from "@/market";
import GreenCard from "@/components/Card";
import { Box,Container,Flex,Text,Heading } from "@chakra-ui/react";
function Trees(){
  const {query,addTo } = useContext(SearchContext);

return <Container p={16} maxW={1260}>
         
            <Box maxW={940} mx={'auto'}>
              <Heading mb={8} fontSize={'4xl'}>{query.length>0?'Searched Items':'Trees'}</Heading>
            <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'} >
            {query.length>0?market.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).map((item, index) => (
      <GreenCard
        key={index}
        name={item.name}
        description={item.description}
        price={item.price}
      />
    )): market
    .filter(item => item.category === 'trees')
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
export default Trees;