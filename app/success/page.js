'use client';
import { useContext,useEffect } from "react";
import { SearchContext } from "@/context/SearchContext";
import { Container,Heading,Grid,Button,Box } from "@chakra-ui/react";
import Link from "next/link";
export default function Success() {
  let {emptyCart,cart}=useContext(SearchContext);
  useEffect(()=>{emptyCart()},[emptyCart])
    return (
      <Container maxW={960} >
        <Grid h={'100vh'} placeItems={'center'}>
          <Box textAlign={'center'}>   <Heading fontSize={'4xl'} textAlign={'center'}>
         Payment Successful! 
        </Heading>
        <Heading my={4}>Thank you for your purchase.</Heading>
        <Link href={'/'}>
        <Button>Return to Home</Button>
        </Link>
        </Box>
        </Grid>
        
      </Container>
    );
  }
  