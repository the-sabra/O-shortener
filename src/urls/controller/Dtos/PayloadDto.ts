import { Request } from "express";


type payload = {
  email: string;
  userId: string;
};

export type UserAuth = Request & payload;


