import {User} from "./../user/entity/user.entity";
import {UserDecorator} from "./../user/decorators/user.decorator";
import {AuthGuard} from "./../auth/guards/auth.guard";
import {Body, Controller, Delete, Param, Post, Put, UseGuards} from "@nestjs/common";
import {ApiCookieAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {MessageService} from "./message.service";
import {
	CreateMessageDto,
	CreateMessageReturn201,
	CreateMessageReturn400,
	DeleteMessageReturn204,
	DeleteMessageReturn400,
	UpdateMessageDto,
	UpdateMessageReturn204,
	UpdateMessageReturn400,
} from "./dto/message.dto";
import {Message} from "./entity/message.entity";
import {MessageResponse} from "types";

@Controller(`message`)
@ApiTags(`message`)
export class MessageController {
	constructor(private messageService: MessageService) {}

	@Post(`create`)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 201,
		description: `OK`,
		type: CreateMessageReturn201,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: CreateMessageReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async create(@Body() dto: CreateMessageDto, @UserDecorator() user: User) {
		const res = await this.messageService.create(dto, user);

		if (res === `Blog not found` || res === `User not found`)
			return {
				error: true,
				status: 400,
				errorMessage: res,
			};

		return {
			error: false,
			status: 201,
			message: this.prepareResponse(res),
		};
	}

	@Put(`update`)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 204,
		description: `OK`,
		type: UpdateMessageReturn204,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: UpdateMessageReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async update(@Body() dto: UpdateMessageDto, @UserDecorator(`userId`) userId: number) {
		const res = await this.messageService.update(dto, userId);

		if (res === `Message not found` || res === `You are not author message`)
			return {
				error: true,
				status: 400,
				errorMessage: res,
			};

		return {
			error: false,
			status: 204,
			message: this.prepareResponse(res),
		};
	}

	@Delete(`:messageId`)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 204,
		description: `Message was deleted`,
		type: DeleteMessageReturn204,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: DeleteMessageReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async delete(
		@Param(`messageId`) messageId: number,
		@UserDecorator(`userId`) userId: number
	) {
		const res = await this.messageService.delete(messageId, userId);

		if (res instanceof String)
			return {
				error: true,
				status: 400,
				errorMessage: res,
			};

		return {
			error: false,
			status: 204,
			message: `Message was deleted`,
		};
	}

	private prepareResponse(message: Message): MessageResponse {
		return {
			id: message.id,
			message: message.message,
			createdAt: message.createdAt,
			authorId: message.author.id,
		};
	}
}
