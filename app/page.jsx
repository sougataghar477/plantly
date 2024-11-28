import { Container, Heading, Box, Flex } from "@chakra-ui/react";
import GreenCard from "@/components/Card";
import market from "@/market";
function Home() {
  return <Container py={16} px={[4, 16, 16]} maxW={1260}>
    <Box maxW={940} mx={'auto'}>
      <Heading mb={8} fontSize={'4xl'}>Items</Heading>
      <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'} >
        {market
          .map((item, index) => (
            <GreenCard
              key={index}
              name={item.name}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
      </Flex>
    </Box>

  </Container>
}
export default Home;
