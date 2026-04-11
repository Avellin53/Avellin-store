import cors from 'cors';
export declare const corsMiddleware: (req: cors.CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void;
export declare const helmetMiddleware: (req: import("node:http").IncomingMessage, res: import("node:http").ServerResponse, next: (err?: unknown) => void) => void;
export declare const generalLimiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const sensitiveLimiter: import("express-rate-limit").RateLimitRequestHandler;
