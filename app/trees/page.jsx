import { getItems } from "@/GetItems";
import GreenCard from "@/components/Card";
import { Box, Container, Flex, Text, Heading } from "@chakra-ui/react";
async function Trees() {
  let { items, error } = await getItems('trees');


  return <Container py={16} px={[4, 16, 16]} maxW={1260}>

    <Box maxW={940} mx={'auto'}>
      <Heading mb={8} fontSize={'4xl'}>Trees</Heading>
      <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'} >
      {error?<p>{error}</p>:items.map((item, index) => (
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
export default Trees;