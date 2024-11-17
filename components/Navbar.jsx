'use client';
import { Box,Container,Flex,Input,Icon } from "@chakra-ui/react";
import { HiShoppingCart } from "react-icons/hi";
import Link from "next/link";
import { useState,useContext } from "react";
import { useSession } from "next-auth/react";
import { SearchContext } from '@/context/SearchContext';
import { signOut } from "next-auth/react";
function Navbar(){
    let {status}=useSession()
    let [searchInput,setSearchInput]=useState('');
    const {updateQuery,cart } = useContext(SearchContext);
 
    let searching=function(e){
        setSearchInput(e.target.value);
        updateQuery(e.target.value)
        
    }
        return <Box bgColor={'green.900'}>
            <Container maxW={1400} >
            <Flex py={4} alignItems={'center'} justifyContent={'space-between'}>
                <Flex gapX={8}><Link href={'/'}>Plantly</Link>
                <Link href={'/herbs'}>Herbs</Link>
                <Link href={'/shrubs'}>Shrubs</Link>
                <Link href={'/trees'}>Trees</Link></Flex>

                <Box flexGrow={1} maxW={320} >
                    <form onSubmit={(e)=> {e.preventDefault();}}>
                    <Input value={searchInput} 
                    onInput={searching} borderColor={'white'} placeholder="Search here. Clear search to display all items"/></form></Box>
                <Flex gapX={8}>
                    <Link href={'user'}>User</Link>
                    {status==='unauthenticated' && <Link href={'signin'}>Sign In</Link>}
                    {status==='unauthenticated' && <Link href={'signup'}>Sign Up</Link>}
                    {status==='authenticated' && <span onClick={()=> signOut()}>Sign Out</span>}
                    <Link href={'cart'}><Box pos={'relative'}>
                        <Icon fontSize="2xl"><HiShoppingCart/></Icon> 
                    {cart.length>0 && <span className="cartIconLength">{cart.length}</span>}
                    </Box></Link>
                    
                </Flex>
            </Flex>
        </Container>
        </Box>
}
export default Navbar;