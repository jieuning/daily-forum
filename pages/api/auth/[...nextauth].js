import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'babe2b615c9bd6952dd2',
      clientSecret: 'b3e310e1be552ccf8c89949865aae8f1009cd932',
    }),

    CredentialsProvider({
        // 로그인페이지 폼 자동생성해주는 코드 
        name: "credentials",
          credentials: {
            email: { label: "email", type: "text" },
            password: { label: "password", type: "password" },
        },
  
        // 로그인요청시 실행되는코드
        // 직접 DB에서 아이디,비번 비교하고 
        // 아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
        async authorize(credentials) {
          let db = (await connectDB).db('daily-forum');
          let user = await db.collection('user_cred').findOne({email : credentials.email})
          if (!user) {
            console.log('해당 이메일은 없음');
            return null
          }
          const pwcheck = await bcrypt.compare(credentials.password, user.password);
          if (!pwcheck) {
            console.log('비밀번호번 틀림');
            return null
          }
          return user
        }
      })
  ],

   // jwt 만료일설정
   session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 //30일
  },

  callbacks: {
    // jwt 만들 때 실행되는 코드 
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },
    // 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;  
      return session;
    },
  },

  secret : process.env.NEXTAUTH_SECRET,
  adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 