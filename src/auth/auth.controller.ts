import {Body, Controller, HttpException, Post, Res} from "@nestjs/common";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {AuthService} from "./auth.service";
import {
	AuthDto,
	CreateUserReturn201,
	CreateUserReturn400,
	LoginDto,
	LoginUserReturn200,
	LoginUserReturn400,
} from "./dto/auth.dto";

@Controller(`auth`)
@ApiTags("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post(`local/signUp`)
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
		const result = await this.authService.signUpLocal(dto);

		if (result === `Email is busy`)
			return {
				error: true,
				status: 400,
				errorMessage: result,
			};

		return {
			error: false,
			status: 201,
			accessToken: result,
		};
	}

	@Post(`local/signIn`)
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
		const resp = await this.authService.signInLocal(dto);

		if (resp instanceof HttpException)
			return {
				error: true,
				status: 400,
				errorMessage: `Something is wrong`,
			};

		return {error: false, status: 200, accessToken: resp};
	}
}
