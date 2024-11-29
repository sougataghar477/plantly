
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { getItems } from '@/GetItems';
import GreenCard from "@/components/Card";

async function SearchedResults({ searchParams }) {
    const { items, loading, error } = await getItems();

    let p = await searchParams;
    let query = p.q;
    let searchedItems=items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    return (

        <Container py={16} px={[4, 16, 16]} maxW={1260}>
            <Box maxW={940} mx={'auto'}>
                <Heading mb={8} fontSize={'4xl'}>Searched Items</Heading>
                <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        searchedItems.length>0?searchedItems.map((item, index) => (
                            <GreenCard
                                key={index}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                imageUrl={item.imageUrl}
                            />
                        )):<Heading>No results found`</Heading>
                    )}
                </Flex>
            </Box>
        </Container>

    );
}

export default SearchedResults;
