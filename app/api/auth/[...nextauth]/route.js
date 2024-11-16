import CredentialsProvider  from "next-auth/providers/credentials";
import db from "@/mongo";
import NextAuth from "next-auth";
export const authOptions = {
  // Configure one or more authentication providers
  secret:process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        const users = db.collection('users');
        const user = await users.findOne({ email: credentials.email });
        console.log(user)
        if (user) {
          // Return the user object if credentials are valid
          return Promise.resolve(user);
        } else {
          // Return null if credentials are invalid
          return Promise.resolve(null);
        }
      }
    }),
 
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };