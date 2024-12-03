'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Container, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { getItems } from '@/GetItems';
import GreenCard from "@/components/Card";

function SearchedResults() {
    const [items, setItems] = useState([]); // Holds fetched and filtered items
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || "";
    useEffect(() => {
        async function fetchAndFilterItems() {
            setLoading(true);
            setError("");

            try {
                const { items: fetchedItems, error } = await getItems();
                if (error) {
                    setError(error); // Handle the error
                } else {
                     // Get query parameter
                    const filteredItems = fetchedItems.filter(item =>
                        item.name.toLowerCase().includes(query)
                    );
                    setItems(filteredItems); // Save filtered items
                }
            } catch (err) {
                setError("Failed to fetch items.");
            } finally {
                setLoading(false);
            }
        }

        fetchAndFilterItems();
    }, [query]); // Re-run effect when searchParams change

    return (
        <Container py={16} px={[4, 16, 16]} maxW={1260}>
            <Box maxW={940} mx={'auto'}>
                <Heading mb={8} fontSize={'4xl'}>Searched Items</Heading>
                <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'}>
                    {loading ? (
                        <Spinner size="lg" />
                    ) : error ? (
                        <Text color="red.500" textAlign="center">
                            {error}
                        </Text>
                    ) : items.length > 0 ? (
                        items.map((item, index) => (
                            <GreenCard
                                key={index}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                imageUrl={item.imageUrl}
                            />
                        ))
                    ) : (
                        <Heading>No Results Found</Heading>
                    )}
                </Flex>
            </Box>
        </Container>
    );
}

export default SearchedResults;
