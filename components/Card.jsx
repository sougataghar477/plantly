'use client';
import { useContext } from "react";
import { Box,Button,Card,Container,Flex,Image,Text } from "@chakra-ui/react";
import { SearchContext } from "@/context/SearchContext";
import { toaster ,Toaster} from "@/components/ui/toaster"
function GreenCard({name,description,price,id}){
  let {addToCart,deleteFromCart}=useContext(SearchContext)
 
return <Card.Root maxW={300} overflow="hidden" >
  <Toaster />
    <Image
      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      alt="Green double couch with wooden legs"
    />
    <Card.Body gap="2">
      <Card.Title>{name}</Card.Title>
      <Card.Description>
       {description}
      </Card.Description>
      <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
        ${price}
      </Text>
    </Card.Body>
    <Card.Footer gap="2">
      {id?<Button onClick={()=>{deleteFromCart(id)}}>Delete From Cart</Button>
        :<Button onClick={()=>{addToCart({name,description,price,id:Math.floor(Math.random() * 100)}); toaster.create({
          description: "Item added to cart successfully",
          type: "success",
        })}} variant="solid">Add to cart</Button>}
    </Card.Footer>
  </Card.Root>
}
export default GreenCard;