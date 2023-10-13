import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;
        // const urlToken = "url que valida o token recebido";

        if (req.path === "/" || req.path === "/management/health") {
            return next();
        }

        if (!authorization) {
            throw new UnauthorizedException('Token não informado');
        }

        return next();
        // TODO: realizar login
        // try {
        //     const { data } = await axios.get(urlToken, {
        //         headers: {
        //             Authorization: authorization,
        //         },
        //     });
        //     if (data.Access_Token) {
        //         next();
        //     }
        // } catch (err) {
        //     throw new UnauthorizedException('Token inválido');
        // }
    }
}
