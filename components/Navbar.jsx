'use client';
import { Box, Container, Flex, Input, Icon, Button } from "@chakra-ui/react";
import MobileNavbar from "./MobileNavbar";
import { HiShoppingCart } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { SearchContext } from '@/context/SearchContext';
import { signOut } from "next-auth/react";
function Navbar() {
    let { status } = useSession()
    let [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false)
    const { cart } = useContext(SearchContext);
    const router = useRouter();
    const path = usePathname();
    let handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
    return <Box bgColor={'green.900'}>
        <Container maxW={1400} >

            <Flex py={4} alignItems={'center'} justifyContent={'space-between'} gap={8}>
                <Flex display={['none','none','flex']} gapX={8}>
                    <Link className={path === '/' ? 'active-link' : ''} href={'/'}>Plantly</Link>
                    <Link className={path === '/herbs' ? 'active-link' : ''} href={'/herbs'}>Herbs</Link>
                    <Link className={path === '/shrubs' ? 'active-link' : ''} href={'/shrubs'}>Shrubs</Link>
                    <Link className={path === '/trees' ? 'active-link' : ''} href={'/trees'}>Trees</Link>
                </Flex>

                <Box flexGrow={1} maxW={320} >
                    <form onSubmit={handleSubmit}>
                        <Flex>
                            <Input value={searchInput}
                                onInput={e => setSearchInput(e.target.value)}
                                borderRightRadius={0}
                                borderColor={'white'}
                                placeholder="Search here" />
                            <Button borderLeftRadius={0} type="Submit">Search</Button></Flex>

                    </form>
                </Box>
                <Flex display={['none','none','flex']} gapX={8}>
                    <Link className={path === '/user' ? 'active-link' : ''} href={'user'}>User Profile</Link>
                    {status === 'unauthenticated' && <Link href={'signin'}>Sign In</Link>}
                    {status === 'unauthenticated' && <Link href={'signup'}>Sign Up</Link>}
                    {status === 'authenticated' && <span onClick={() => signOut()}>Sign Out</span>}
                    <Link href={'cart'}><Box pos={'relative'}>
                        <Icon fontSize="2xl"><HiShoppingCart /></Icon>
                        {cart.length > 0 && <span className="cartIconLength">{cart.length}</span>}
                    </Box></Link>

                </Flex>
                <Icon display={['inline','inline','none']} onClick={()=> setOpen(prev => !prev)} fontSize="2xl"><GiHamburgerMenu /></Icon>
                <MobileNavbar open={open} setOpen={setOpen}/>
            </Flex>
        </Container>
    </Box>
}
export default Navbar;