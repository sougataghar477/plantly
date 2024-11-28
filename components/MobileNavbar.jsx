'use client';
import {

    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,

    DrawerHeader,
    DrawerRoot,
    DrawerTitle,

} from "@/components/ui/drawer";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MobileNavbar({ open, setOpen }) {
    const path = usePathname();

    return <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerContent>
            <DrawerBody>
                <Flex flexDirection={'column'} gap={4}>
                    <Link onClick={()=> setOpen(false)} className={path === '/' ? 'active-link' : ''} href={'/'}>Plantly</Link>
                    <Link onClick={()=> setOpen(false)} className={path === '/herbs' ? 'active-link' : ''} href={'/herbs'}>Herbs</Link>
                    <Link onClick={()=> setOpen(false)} className={path === '/shrubs' ? 'active-link' : ''} href={'/shrubs'}>Shrubs</Link>
                    <Link onClick={()=> setOpen(false)} className={path === '/trees' ? 'active-link' : ''} href={'/trees'}>Trees</Link>
                </Flex>
            </DrawerBody>

            <DrawerCloseTrigger />
        </DrawerContent>
    </DrawerRoot>
}
export default MobileNavbar