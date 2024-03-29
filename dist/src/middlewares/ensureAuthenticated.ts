import  { Request, Response, NextFunction} from 'express'
import { verify} from 'jsonwebtoken'

import authConfig from '../config/auth'
import AppError from '../errors/AppError'

interface tokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated( request: Request, response: Response, next: NextFunction): void{
        // validão do token
        const authHeader = request.headers.authorization;

        if(!authHeader){
            throw new AppError('JWT token is missing.', 401);            
        }

        const [, token] = authHeader.split(' ');    
        //try{
            const decoded = verify(token, authConfig.jwt.secret);
            console.log(decoded);

            const { sub } = decoded as tokenPayLoad;
            request.user = {
                id: sub,
            };

            return next();
        // } catch(err){
        //     throw new AppError('Invalid JWTt token', 401);
        // }
        

}