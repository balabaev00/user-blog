import {HttpException, HttpStatus, Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";
import {AuthService} from "../auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private authService: AuthService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const authorizationHeader = req.headers.authorization;

		if (!authorizationHeader) {
			req.user = null;
			next();
			return;
		}

		const accessToken = authorizationHeader.split(` `)[1];
		if (!accessToken) {
			req.user = null;
			next();
			return;
		}

		try {
			const user = await this.authService.validateRefreshToken(accessToken);
			req.user = user;
			next();
			return;
		} catch (err) {
			next(new HttpException(`Invalid token`, HttpStatus.BAD_REQUEST));
			return;
		}
	}
}
