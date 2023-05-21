import { Request } from 'express';

type payload = {
  email: string;
  userId: string;
};
//to get user payload from request
export type UserAuth = Request & payload;
