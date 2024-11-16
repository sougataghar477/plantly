'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Container,Grid,Input,Button ,Box,Heading} from "@chakra-ui/react";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router=useRouter()
  const handleSignIn = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      console.log("Sign-in successful");
      router.push('/')
    }
  };

  return (
    <Container  maxW={940}>
    <Grid h={'100vh'} placeItems={'center'}>
      <Box maxW={320}>
      <form onSubmit={handleSignIn}>
<Heading mb={8}>Log In</Heading>
<Input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  mb={8}
/>


<Input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  mb={8}
/>

<Button type="submit">Sign In</Button>

</form>
      </Box>
</Grid>

    </Container>
  );
}
