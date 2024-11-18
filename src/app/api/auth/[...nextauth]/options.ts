import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/mongodb/index";
import { JWT } from "next-auth/jwt";
import { getUserByUsername } from "@/mongodb/users";
import { verifyPassword } from "@/server-utils/password-functions";

// Extend the Session type to include the id property
export interface CustomSession extends Session {
  user: {
    id: string; // Include other user properties if needed
    name: string;
  };
}

interface CustomToken extends JWT {
  id: string;
}

const options: AuthOptions = {
  debug: true,
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
        password: {
          label: "Password",
          type: "password",
          placeholder: "Type password..."
        }
      },
      async authorize(credentials) {
        const { result: appUser, error } = await getUserByUsername(
          credentials?.username
        );

        if (error || !appUser) return null;
        const isValidPassword = await verifyPassword(
          credentials?.password ?? null,
          appUser?.account.password.salt ?? null,
          appUser?.account.password.hash ?? null
        );
        if (!isValidPassword) return null;
        return {
          id: appUser._id.toString(),
          name: credentials?.username
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      const customSession: CustomSession = {
        ...session,
        user: {
          id: (token as CustomToken).id,
          name: token.name || ""
        }
      };

      return customSession;
    },
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    }
  }
};

export default options;
