'use client';
import { useContext } from "react";
 import { SearchContext } from '@/context/SearchContext';
 import { Container,Heading,Box,Flex } from "@chakra-ui/react";
 import GreenCard from "@/components/Card";
 import market from "@/market";
function Home() {
  const { searchResults, query } = useContext(SearchContext);

  console.log(searchResults)
  return <Container p={16} maxW={1260}>      
  <Box maxW={940} mx={'auto'}>
    <Heading mb={8} fontSize={'4xl'}>{query.length>0?'Searched Items':'Items'}</Heading>
  <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'} >
  {query.length>0?market.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).map((shrub, index) => (
      <GreenCard
        key={index}
        name={shrub.name}
        description={shrub.description}
        price={shrub.price}
      />
    )): market
    .map((item, index) => (
      <GreenCard
        key={index}
        name={item.name}
        description={item.description}
        price={item.price}
      />
    ))}
{market.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).length===0 && <Heading>No Results Found</Heading>}


  </Flex>
  </Box>

</Container>
}
export default Home;
