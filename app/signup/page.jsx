'use client';

import { useState } from "react";
import { Container,Grid,Input,Button, Heading, Box,Textarea  } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password,name,address }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("User registered successfully! You can now sign in.");
    } else {
      setMessage(data.message || "Something went wrong.");
    }
  };

  return (
    <Container maxW={940}>
        <Grid maxW={320} h='100vh' mx={'auto'} placeItems={'center'}>
        
        <Box width={'100%'}>
        <form onSubmit={handleSignUp}>

<Heading   mb={8}>Register</Heading>
<Field  label='Email' mb={8}>
<Input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
placeholder="Email"

/>
</Field>


<Field   mb={8} label='Password'>
<Input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required

placeholder="Password"

/>
</Field>

<Field mb={8} label='Name'>
<Input
type="text"
value={name}
onChange={(e) => setName(e.target.value)}
required
placeholder="Full Name"
/>
</Field>
<Field mb={8} label='Address'>
<Textarea value={address}  onChange={e => setAddress(e.target.value)}/>
</Field>

{message && <Heading mb={8}>{message}</Heading>}
<Button type="submit">Sign Up</Button>
</form>
        </Box>
        </Grid>
    </Container>

  );
}
