import { getItems } from "@/GetItems";
import { Container, Heading, Box, Flex, Text } from "@chakra-ui/react";
import GreenCard from "@/components/Card";

export default async function Home() {
    const { items, error } = await getItems("");

    return (
        <Container py={16} px={[4, 16, 16]} maxW={1260}>
            <Box maxW={940} mx={'auto'}>
                <Heading mb={8} fontSize={'4xl'}>Items</Heading>
                {error ? (
                    <Text color="red.500" textAlign="center">
                        {error}
                    </Text>
                ) : items.length === 0 ? (
                    <Text textAlign="center" mt={4}>
                        No items found.
                    </Text>
                ) : (
                    <Flex
                        mx="auto"
                        justifyContent="center"
                        gap="20px"
                        wrap="wrap"
                    >
                        {items.map((item) => (
                            <GreenCard
                                key={item.id} // Use a unique identifier for better performance
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                imageUrl={item.imageUrl}
                            />
                        ))}
                    </Flex>
                )}
            </Box>
        </Container>
    );
}
