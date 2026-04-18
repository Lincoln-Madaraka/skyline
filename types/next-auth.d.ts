import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      realtorApproved: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    realtorApproved: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    realtorApproved: boolean;
  }
}
