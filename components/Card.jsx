'use client';
import { useContext } from "react";
import { Box,Button,Card,Container,Flex,Image,Text } from "@chakra-ui/react";
import { SearchContext } from "@/context/SearchContext";
import { toaster ,Toaster} from "@/components/ui/toaster"
function GreenCard({name,description,price,id,imageUrl}){
  let {addToCart,deleteFromCart}=useContext(SearchContext)
 
return <Card.Root maxW={['100%',300]} overflow="hidden" >
  <Toaster />
    <Image
      src={imageUrl}
      alt="Green double couch with wooden legs"
      height={200}
      objectFit={'cover'}
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