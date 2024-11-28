
import market from "@/market";
import GreenCard from "@/components/Card";
import { Box, Container, Flex, Text, Heading } from "@chakra-ui/react";
function Shrubs() {

  return <Container py={16} px={[4, 16, 16]} maxW={1260}>

    <Box maxW={940} mx={'auto'}>
      <Heading mb={8} fontSize={'4xl'}>Shrubs</Heading>
      <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'} >
        {market
          .filter(item => item.category === 'shrubs')
          .map((shrub, index) => (
            <GreenCard
              key={index}
              name={shrub.name}
              description={shrub.description}
              price={shrub.price}
              imageUrl={shrub.imageUrl}
            />
          ))}
      </Flex>
    </Box>

  </Container>
}
export default Shrubs;