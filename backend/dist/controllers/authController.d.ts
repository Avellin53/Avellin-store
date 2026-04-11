import { Request, Response } from 'express';
export declare const registerBuyer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const registerVendor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logout: (req: Request, res: Response) => void;
