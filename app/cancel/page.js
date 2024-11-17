import { Container,Heading,Grid,Button,Box } from "@chakra-ui/react";
import Link from "next/link";
export default function Cancel() {
    return (
      <Container maxW={960} >
        <Grid h={'100vh'} placeItems={'center'}>
          <Box textAlign={'center'}>   <Heading fontSize={'4xl'} textAlign={'center'}>
         Something Went Wrong! 
        </Heading>
        <Heading my={4}>Please try again.</Heading>
        <Link href={'/'}>
        <Button>Return to Home</Button>
        </Link>
        </Box>
        </Grid>
        
      </Container>
    );
  }