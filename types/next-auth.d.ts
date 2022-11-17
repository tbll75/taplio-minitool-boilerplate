import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      uid: string;
      id?: string;
      firebaseToken?: string;
      name?: string;
      email?: string;
      twUserName?: string;
      image?: string | undefined;
      thReadAccessToken?: string;
      thReadSecretToken?: string;
      data: {
        score: number;
        rank: number;
        bonusDone?: array;
      }
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    id: string;
    twUserName: string;
    thReadAccessToken: string;
    thReadSecretToken: string;
  }
}
