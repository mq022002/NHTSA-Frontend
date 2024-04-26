// https://next-auth.js.org/getting-started/example
// https://next-auth.js.org/providers/cognito

import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "cognito") {
        // Assuming the groups claim is in the ID token
        user.groups = profile['cognito:groups'] || [];
      }
      return true; // Proceed with the sign-in
    },
    async session({ session, token }) {
      // Append groups to the session
      session.user.groups = token.groups;
      return session;
    },
    async jwt({ token, user }) {
      // Pass the groups from the sign-in stage to the JWT token
      if (user?.groups) {
        token.groups = user.groups;
      }
      return token;
    }
  }
};


export default NextAuth(authOptions);
