import {AuthDto} from "./../auth/dto/auth.dto";
import {Body, Controller, Delete, Get, Put, Req, Res, UseGuards} from "@nestjs/common";
import {ApiCookieAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "src/auth/guards/auth.guard";
import {UserDecorator} from "./decorators/user.decorator";
import {
	GetUserWithCardsReturn200,
	UpdateUserReturn204,
	UpdateUserReturn400,
} from "./dto/user.dto";
import {UserService} from "./user.service";
import {Request, Response} from "express";

@Controller(`user`)
@ApiTags(`User`)
export class UserController {
	constructor(private userService: UserService) {}

	@Get(``)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 200,
		description: `OK`,
		type: GetUserWithCardsReturn200,
	})
	@ApiCookieAuth(`jwt`)
	async get(@UserDecorator(`userId`) id: string) {
		const res = await this.userService.findUserCardsById(id);

		return {
			error: false,
			status: 200,
			user: {
				email: res.email,
				nickname: res.nickname,
				tags: res.tags,
			},
		};
	}

	@Put(``)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 204,
		description: `OK`,
		type: UpdateUserReturn204,
	})
	@ApiResponse({
		status: 400,
		description: `User does not exist`,
		type: UpdateUserReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async update(@UserDecorator(`userId`) id: string, @Body() dto: AuthDto) {
		try {
			const res = await this.userService.updateUser(id, dto);

			return {
				error: false,
				status: 204,
				user: {
					email: res.email,
					nickname: res.nickname,
				},
			};
		} catch (error) {
			return {
				error: true,
				status: error.status,
				errorMessage: error.response,
			};
		}
	}

	@Delete(``)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: UpdateUserReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async delete(@UserDecorator(`userId`) id: string, @Req() req: Request) {
		try {
			const res = await this.userService.deleteUser(id);

			req.headers.authorization = null;
		} catch (error) {
			return {
				error: true,
				status: error.status,
				errorMessage: error.response,
			};
		}
	}
}
