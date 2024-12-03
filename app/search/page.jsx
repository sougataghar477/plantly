// 'use client';
// import { useEffect,useState } from "react";
// import React from "react";
// import { Box, Container, Flex, Heading } from "@chakra-ui/react";
// import { getItems } from '@/GetItems';
// import GreenCard from "@/components/Card";
// function SearchedResults({ searchParams }) {

//     let [loading,setLoading]=useState(false);
//     let [error,setError]=useState('');
//     const [searchedItems,setItems]=useState([]);
//     useEffect(()=>{
//         async function fetchItems(){
//             let query =await searchParams?.q;
//             setLoading(true)
//             const { items, error } = await getItems();
//             if(error){
//                 setError(error)
//             }
//             else{
//                 setItems(items.filter(item => item.name.toLowerCase().includes(query.toLowerCase())));
//             }
//             setLoading(false)
//         }
       
//     // Normalize the query for case-insensitive matching
//         fetchItems()
//     },[searchParams])
//     return (

//         <Container py={16} px={[4, 16, 16]} maxW={1260}>
//             <Box maxW={940} mx={'auto'}>
//                 <Heading mb={8} fontSize={'4xl'}>Searched Items</Heading>
                 
//                 <Flex mx={'auto'} justifyContent={'center'} gap={'20px'} wrap={'wrap'}>
//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : error ? (
//                         <p>{error}</p>
//                     ) : (
//                         searchedItems.length > 0 ? searchedItems.map((item, index) => (
//                             <GreenCard
//                                 key={index}
//                                 name={item.name}
//                                 description={item.description}
//                                 price={item.price}
//                                 imageUrl={item.imageUrl}
//                             />
//                         )) : <Heading>No Results Found</Heading>
//                     )}
//                 </Flex>
//             </Box>
//         </Container>

//     );
// }

// export default SearchedResults;
'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import the correct hook
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { getItems } from '@/GetItems';
import GreenCard from "@/components/Card";

function SearchedResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q'); // Retrieve the query parameter
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchedItems, setItems] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            setLoading(true); // Start loading
            try {
                const { items, error } = await getItems(); // Fetch items from the API

                if (error) {
                    setError(error); // Set error if fetching fails
                } else {
                    // Filter items based on the query
                    const filteredItems = items.filter(item => 
                        item.name.toLowerCase().includes(query.toLowerCase())
                    );
                    setItems(filteredItems);
                }
            } catch (err) {
                setError('Failed to fetch items.');
            } finally {
                setLoading(false); // End loading
            }
        }

        fetchItems();
    }, [query]); // Re-run when query changes

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
                        searchedItems.length > 0 ? (
                            searchedItems.map((item, index) => (
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
                        )
                    )}
                </Flex>
            </Box>
        </Container>
    );
}

export default SearchedResults;
