import {ApiProperty} from "@nestjs/swagger";
import {Message} from "../entity/message.entity";

export class CreateMessageDto {
	@ApiProperty({
		description: `Blog id`,
		example: 1,
	})
	blogId: number;

	@ApiProperty({
		description: `Blog message`,
		example: `Today I've bought ...`,
	})
	message: string;
}

export class UpdateMessageDto {
	@ApiProperty({
		description: `Message id`,
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: `Blog message`,
		example: `Today I've bought ...`,
	})
	message: string;
}

export class CreateMessageReturn201 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `Blog entity`,
		example: {
			id: 1,
			name: `My blog`,
			createdAt: new Date(),
			authorId: 1,
			blogId: 1,
		},
	})
	message: Message;

	@ApiProperty({
		description: `Status code`,
		example: `201`,
	})
	status: number;
}

export class CreateMessageReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `Message has not been created`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}

export class UpdateMessageReturn204 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `Message entity`,
		example: {
			id: 1,
			message: `My blog is one of the best...`,
			createdAt: new Date(),
			blogId: 1,
			authorId: 1,
		},
	})
	message: Message;

	@ApiProperty({
		description: `Status code`,
		example: `204`,
	})
	status: number;
}

export class UpdateMessageReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `Message has not been updated`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}

export class DeleteMessageReturn204 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `Message`,
		example: `Message was deleted`,
	})
	message: string;

	@ApiProperty({
		description: `Status code`,
		example: `204`,
	})
	status: number;
}

export class DeleteMessageReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `Message has not been deleted`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}
