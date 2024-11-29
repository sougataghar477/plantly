
import market from "@/market";
import GreenCard from "@/components/Card";
import { Box, Container, Flex, Text, Heading } from "@chakra-ui/react";
import { getItems } from "@/GetItems";
async function Herbs() {
  let { items, error, loading } = await getItems('herbs');
  console.log(items)
  return <Container py={16} px={[4, 16, 16]} maxW={1260}>

    <Box maxW={940} mx={'auto'}>
      <Heading mb={8} fontSize={'4xl'}>Herbs</Heading>
      <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'} >
        s

      </Flex>
    </Box>

  </Container>
}
export default Herbs;