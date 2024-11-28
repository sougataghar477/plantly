'use client';
import {

    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerRoot,
 

} from "@/components/ui/drawer";
import { Flex,Icon,Box } from "@chakra-ui/react";
import { HiShoppingCart } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";
function MobileNavbar({ open, setOpen }) {
    const path = usePathname();
    let { status } = useSession()
    let {cart}=useContext(SearchContext)
    return <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerContent>
            <DrawerBody>
                <Flex mt={8} flexDirection={'column'} gap={4}>
                    <Link onClick={()=> setOpen(false)} className={path === '/' ? 'active-link' : ''} href={'/'}>Plantly</Link>
                    <Link onClick={()=> setOpen(false)} className={path === '/herbs' ? 'active-link' : ''} href={'/herbs'}>Herbs</Link>
                    <Link onClick={()=> setOpen(false)} className={path === '/shrubs' ? 'active-link' : ''} href={'/shrubs'}>Shrubs</Link>
                    <Link onClick={()=> setOpen(false)} className={path === '/trees' ? 'active-link' : ''} href={'/trees'}>Trees</Link>
                    <Link onClick={()=> setOpen(false)} className={path === '/user' ? 'active-link' : ''} href={'/user'}>User Profile</Link>
                    {status === 'unauthenticated' && <Link className={path === '/signin' ? 'active-link' : ''} onClick={()=> setOpen(false)} href={'signin'}>Sign In</Link>}
                    {status === 'unauthenticated' && <Link className={path === '/signup' ? 'active-link' : ''} onClick={()=> setOpen(false)} href={'signup'}>Sign Up</Link>}
                    <Link className={path === '/cart' ? 'active-link' : ''} onClick={()=> setOpen(false)} href={'cart'}><Box display={'inline'} pos={'relative'}>
                        <Icon fontSize="2xl"><HiShoppingCart /></Icon>
                        {cart.length > 0 && <span className="cartIconLength">{cart.length}</span>}
                    </Box></Link>
                    {status === 'authenticated' && <span onClick={() => signOut()}>Sign Out</span>}
                </Flex>
            </DrawerBody>

            <DrawerCloseTrigger />
        </DrawerContent>
    </DrawerRoot>
}
export default MobileNavbar