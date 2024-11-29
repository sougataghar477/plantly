import { getItems } from "@/GetItems";
import { Container, Heading, Box, Flex } from "@chakra-ui/react";
import GreenCard from "@/components/Card";


async function Home() {
  let { items, error, loading } = await getItems();


  return <Container py={16} px={[4, 16, 16]} maxW={1260}>
    <Box maxW={940} mx={'auto'}>
      <Heading mb={8} fontSize={'4xl'}>Items</Heading>
      <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'} >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          items.map((item, index) => (
            <GreenCard
              key={index}
              name={item.name}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))
        )}

      </Flex>
    </Box>

  </Container>
}
export default Home;
