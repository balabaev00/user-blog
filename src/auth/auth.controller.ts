import {
	Body,
	Controller,
	Get,
	HttpException,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import {Request} from "express";
import {ApiCookieAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {UserDecorator} from "src/user/decorators/user.decorator";
import {AuthService} from "./auth.service";
import {
	AuthDto,
	CreateUserReturn201,
	CreateUserReturn400,
	LoginDto,
	LoginUserReturn200,
	LoginUserReturn400,
	LogoutUserReturn200,
} from "./dto/auth.dto";
import {AuthGuard} from "./guards/auth.guard";
import {AccessTokenPayload} from "types";

@Controller(`auth`)
@ApiTags("Auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post(`signin`)
	@ApiResponse({
		status: 201,
		description: `OK`,
		type: CreateUserReturn201,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: CreateUserReturn400,
	})
	async signUpLocal(@Body() dto: AuthDto, @Res({passthrough: true}) r: Response) {
		const res = await this.authService.signUpLocal(dto);
		if (res instanceof HttpException)
			return {
				error: true,
				status: res.getStatus(),
				errorMessage: res.getResponse(),
			};
		return {
			error: false,
			status: 201,
			token: res,
		};
	}

	@Post(`login`)
	@ApiResponse({
		status: 200,
		description: `OK`,
		type: LoginUserReturn200,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: LoginUserReturn400,
	})
	async signInLocal(@Body() dto: LoginDto, @Res({passthrough: true}) r: Response) {
		try {
			const res = await this.authService.signInLocal(dto);

			return {error: false, status: 200, token: res};
		} catch (error) {
			return {
				error: true,
				status: error.status,
				errorMessage: error.response,
			};
		}
	}

	@Post(`logout`)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 200,
		description: `OK`,
		type: LogoutUserReturn200,
	})
	@ApiCookieAuth(`jwt`)
	async logout(@UserDecorator(`email`) email: string, @Req() req: Request) {
		req.headers.authorization = null;

		return {
			error: false,
			status: 200,
			message: `User with <${email}> has been logged out`,
		};
	}

	@Get(`token/refresh`)
	@UseGuards(AuthGuard)
	@ApiCookieAuth(`jwt`)
	updateToken(@Req() req: Request, @UserDecorator() payload: AccessTokenPayload) {
		const newPayload = this.authService.updateToken({
			email: payload.email,
			userId: payload.userId,
		});

		req.headers.authorization = `Bearer ` + newPayload.token;

		return {
			error: false,
			status: 200,
			value: newPayload,
		};
	}
}
