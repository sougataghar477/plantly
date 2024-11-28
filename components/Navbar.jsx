'use client';
import { Box,Container,Flex,Input,Icon } from "@chakra-ui/react";
import { HiShoppingCart } from "react-icons/hi";
import Link from "next/link";
import { useState,useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { SearchContext } from '@/context/SearchContext';
import { signOut } from "next-auth/react";
function Navbar(){
    let {status}=useSession()
    let [searchInput,setSearchInput]=useState('');
    const {cart } = useContext(SearchContext);
    const router=useRouter();
    const path=usePathname();
 
      let handleSubmit=(e)=>{
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(searchInput)}`);
      }
        return <Box bgColor={'green.900'}>
            <Container maxW={1400} >
            <Flex py={4} alignItems={'center'} justifyContent={'space-between'}>
                <Flex gapX={8}><Link href={'/'}>Plantly</Link>
                <Link href={'/herbs'}>Herbs</Link>
                <Link href={'/shrubs'}>Shrubs</Link>
                <Link href={'/trees'}>Trees</Link></Flex>

                <Box flexGrow={1} maxW={320} >
                    <form onSubmit={handleSubmit}>
                    <Input value={searchInput} 
                    onInput={e=> setSearchInput(e.target.value)} borderColor={'white'} placeholder="Search here"/></form></Box>
                <Flex gapX={8}>
                    <Link href={'user'}>User Profile</Link>
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