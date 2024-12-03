import { getItems } from "@/GetItems";
import GreenCard from "@/components/Card";
import { Box, Container, Flex, Text, Heading } from "@chakra-ui/react";

export default async function Shrubs() {
    const { error, items } = await getItems("shrubs");

    return (
        <Container py={16} px={[4, 16, 16]} maxW={1260}>
            <Box maxW={940} mx={'auto'}>
                <Heading mb={8} fontSize={'4xl'}>Shrubs</Heading>
                <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'}>
                    {error ? (
                        <Text color="red.500">{error}</Text>
                    ) : items.length > 0 ? (
                        items.map((item) => (
                            <GreenCard
                                key={item.id} // Use unique identifiers for keys
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                imageUrl={item.imageUrl}
                            />
                        ))
                    ) : (
                        <Text>No shrubs found.</Text>
                    )}
                </Flex>
            </Box>
        </Container>
    );
}
