import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly jwtService: JwtService) { }

	async use(req: Request, res: Response, next: NextFunction) {
		// TODO: rever estratégia de validação de token
		const authorization = req.headers.authorization;

		if (req.path === "/" || req.path === "/management/health") {
			return next();
		}

		if (!authorization || !authorization.startsWith('Bearer ')) {
			throw new UnauthorizedException('Token não informado ou mal formatado');
		}

		try {
			const token = authorization.split('Bearer ')[1];
			const decoded = this.jwtService.verify(token); 

			if (!decoded || !decoded.sub) {
				throw new UnauthorizedException('Token inválido ou payload mal formatado');
			}

			return next();
		} catch (err) {
			throw new UnauthorizedException('Token inválido');
		}
	}
}
