'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Container, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { getItems } from '@/GetItems';
import GreenCard from "@/components/Card";

function SearchedResults() {
    const searchParams = useSearchParams();
    const [searchedTtems, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAndFilterItems() {
            setLoading(true);
            setError(null);

            try {
                const { items, error } = await getItems();
                if (error) {
                    setError(error);
                } else {
                    const query = searchParams.get('q')?.toLowerCase() || '';
                  
                    setItems(items.filter(item => item.name.toLowerCase().includes(query.toLowerCase())));
                 
                }
            } catch (err) {
                setError("An error occurred while fetching items.");
            } finally {
                setLoading(false);
            }
        }

        fetchAndFilterItems();
    }, [searchParams]); // React to searchParams changes

    return (
        <Container py={16} px={[4, 16, 16]} maxW={1260}>
            <Box maxW={940} mx={'auto'}>
                <Heading mb={8} fontSize={'4xl'}>Searched Items</Heading>
                <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'}>
                    {loading ? (
                        <Spinner size="lg" color="blue.500" />
                    ) : error ? (
                        <Text color="red.500" textAlign="center">
                            {error}
                        </Text>
                    ) : searchedTtems.length > 0 ? (
                        searchedTtems.map((item, index) => (
                            <GreenCard
                                key={item.id || index} // Prefer unique id if available
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
