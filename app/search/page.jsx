'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Container, Flex, Text, Heading } from "@chakra-ui/react";
import market from '@/market';
import GreenCard from "@/components/Card";
function SearchedResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q')
    return <Suspense>
        <Container py={16} px={[4, 16, 16]} maxW={1260}>
            <Box maxW={940} mx={'auto'}>
                <Heading mb={8} fontSize={'4xl'}>Searched Items</Heading>
                <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'} >
                    {market.filter(i => i.name.toLowerCase() === query).map((item, index) =>
                        <GreenCard key={index}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            imageUrl={item.imageUrl}
                        />)}
                </Flex>
            </Box>
        </Container>
    </Suspense>
}
export default SearchedResults;