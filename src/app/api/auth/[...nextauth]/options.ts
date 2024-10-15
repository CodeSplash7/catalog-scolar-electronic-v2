import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@mongodb/index";
import { JWT } from "next-auth/jwt";

// Extend the Session type to include the id property
interface CustomSession extends Session {
  user: {
    id: string; // Include other user properties if needed
    email: string;
    name: string;
  };
}

interface CustomToken extends JWT {
  id: string;
}

const options: AuthOptions = {
  adapter: MongoDBAdapter(client),
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "", // Absolute URL to image
    buttonText: "" // Hex color code
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Type username..."
        },
        email: { label: "Email", type: "email", placeholder: "Type email..." },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Type password..."
        }
      },
      async authorize(credentials, req) {
        // const { result: appUser, error } = await getUserByEmail(
        // credentials?.email
        // );
        // if (!appUser) return null;

        // const correctInformation =
        // appUser?.profile.username === credentials?.username;
        // if (!correctInformation) return null;

        // const password = appUser.account.password;
        // const correctPassword = await verifyPassword(
        // credentials.password,
        // password.salt,
        // password.hash
        // );
        // if (!correctPassword) return null;

        return {
          id: String(appUser._id),
          email: credentials?.email,
          name: credentials?.username
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as CustomToken).id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession; // Cast to CustomSession
      // customSession. = token.id; // Add user ID to the session
      customSession.user.id = (token as CustomToken).id;
      return customSession;
    }
  }
};

export default options;
