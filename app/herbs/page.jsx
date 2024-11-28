 
import market from "@/market";
import GreenCard from "@/components/Card";
import { Box, Container, Flex, Text, Heading } from "@chakra-ui/react";
 
function Herbs() {
  return <Container py={16} px={[4, 16, 16]} maxW={1260}>

    <Box maxW={940} mx={'auto'}>
      <Heading mb={8} fontSize={'4xl'}>Herbs</Heading>
      <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'} >
        {market
          .filter(item => item.category === 'herbs')
          .map((herb, index) => (
            <GreenCard
              key={index}
              name={herb.name}
              description={herb.description}
              price={herb.price}
              imageUrl={herb.imageUrl}
            />
          ))}
      </Flex>
    </Box>

  </Container>
}
export default Herbs;