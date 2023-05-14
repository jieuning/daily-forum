import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'babe2b615c9bd6952dd2',
      clientSecret: 'b3e310e1be552ccf8c89949865aae8f1009cd932',
    }),
  ],
  secret : 'asdf1234',
  adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 