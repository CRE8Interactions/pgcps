import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/app/lib/data";

export const authOptions = {
  pages: {
    signIn: '/login',
    newUser: '/signup'
  },
  providers: [
     CredentialsProvider({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        console.log('Credentials ', credentials)
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        
        try {
          const { user, jwt } = await signIn({
            email: credentials.email,
            password: credentials.password
          });
          return { ...user, jwt };
        } catch (error: any) {
          // Sign In Fail
          // console.log(error.response.data)
          return null;
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }: any) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.accountType = user.type
      }
      return Promise.resolve(token);
    },
    session({ session, token }: any) {
      session.id = token.id;
      session.jwt = token.jwt;
      session.accountType = token.accountType;
      session.profile = '';
      return Promise.resolve(session);
    }
  }
}