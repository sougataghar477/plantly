'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Container, Button, Grid, Input, Textarea, Box, Heading } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

function User() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const { data, status } = useSession();

  // Fetch user details when authenticated
  useEffect(() => {
    if (status === "authenticated" && data?.user?.email) {
      console.log("Authenticated user:", data.user.email);

      async function fetchUserDetails() {
        try {
          const response = await fetch("/api/user_details", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.user.email }),
          });

          if (response.ok) {
            const { name, address } = await response.json();
            console.log("Fetched details:", { name, address });
            setName(name || "");
            setAddress(address || "");
          } else {
            console.error("Failed to fetch user details:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }

      fetchUserDetails();
    }
  }, [data, status]);

  // Update user details
  const handleUpdate = async (event) => {
    event.preventDefault(); // Prevent page reload
    try {
      const response = await fetch("/api/edit_user_details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data?.user?.email,
          address,
        }),
      });

      const responseData = await response.json();
      console.log("Update response:", responseData);

      if (response.ok) {
        alert("User details updated successfully!");
      } else {
        alert("Failed to update user details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <Container maxW={960}>
      <Grid h={"100vh"} placeItems={"center"} maxW={360} mx={"auto"}>
        <Box w={"100%"}>
            <Heading fontSize={'2xl'} mb={8}>User Details</Heading>
          <form onSubmit={handleUpdate}>
            <Field label="Name">
              <Input
                readOnly
                onChange={(e) => setName(e.target.value)}
                mb={8}
                type="text"
                value={name}
              />
            </Field>
            <Field label="Address">
              <Textarea
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                mb={8}
              />
            </Field>
            <Button type="submit">Edit Address</Button>
          </form>
        </Box>
      </Grid>
    </Container>
  );
}

export default User;
