'use client';
import { SessionProvider } from 'next-auth/react'; 
function SessionProviderComponent({children}){
    return <SessionProvider>
        {children}
    </SessionProvider>
}
export default SessionProviderComponent;