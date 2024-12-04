'use client';
import { useContext,useEffect,useState } from "react";
import { Box,Container,Flex,Heading,Text } from "@chakra-ui/react";
import { SearchContext } from "@/context/SearchContext";
import GreenCard from "@/components/Card";
import CheckoutButton from "@/components/CheckoutButton";
import { useSession } from "next-auth/react";
function Cart(){
  const { cart } = useContext(SearchContext);
  const {data,status} =useSession();
  const [userDetails,setDetails]=useState({});
  console.log(cart)
  useEffect(() => {
    if (status === 'authenticated' && data?.user?.email) {
       

      async function grabDetails() {
        try {
          const response = await fetch('/api/user_details', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: data.user.email }),
          });
          const responseBody = await response.json();
          console.log('Response from server:', responseBody);
          setDetails(responseBody)
        } catch (error) {
          console.error('Error fetching details:', error);
        }
      }

      grabDetails();
    }
  }, [data, status]);
    return <Container px={4} py={16} maxW={990}>
         
            <Box w={'100%'} mx={'auto'}>
              <Heading mb={8} fontSize={'4xl'}>Cart</Heading>
               <Flex mb={8} gap={'20px'} alignItems={'flex-start'} wrap={'wrap'}>
               <Box bg={'#1B1B1B'}  w={300} p={4} borderRadius={'2xl'}>
                <Heading mb={8}>Order Details</Heading>
              {userDetails.name && <Text>Delivering to {userDetails.name}</Text>}
              {userDetails.address && <Text>At {userDetails.address}</Text>}
              <Text fontWeight={'bold'}>Total:{cart.length>0 && <span> ${cart.map(order => order.price).reduce((acc, curr) => acc + curr, 0)}</span>}</Text>
              {/* {(cart.length>0 && status==='authenticated') && <Text>Scroll Below to see the checkout button if you do not see it</Text>} */}
            {(cart.length>0 && status==='authenticated') && <CheckoutButton cart={cart}/>}</Box> 
              <Box maxW={630} mx={'auto'}>
              {status==="unauthenticated" && <Heading mb={8}>You need to sign in to check out</Heading>}
            {status==='authenticated' && <Heading mb={8}>Your Items</Heading>}
            <Flex  justifyContent={'center'} gap={'20px'} wrap={'wrap'} >
{cart.length>0 ? cart.map((item,index) => <GreenCard
        key={index}
        name={item.name}
        description={item.description}
        price={item.price}
        id={item.id}
        imageUrl={item.imageUrl}
      />):<Heading>No Items in Cart</Heading>}

            </Flex>
              </Box>
              </Flex> 


            </Box>
        
</Container>
}
export default Cart;