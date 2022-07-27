import {TagResponse} from "types";
import {ApiProperty} from "@nestjs/swagger";
import {
	IsArray,
	IsDefined,
	IsNotEmpty,
	IsNumber,
	IsString,
	MaxLength,
} from "class-validator";

export class CreateTagDto {
	@ApiProperty({
		description: `Tag name`,
		example: `First buy`,
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(40)
	name: string;

	@ApiProperty({
		description: `Sort order`,
		example: 0,
	})
	@IsNumber()
	sortOrder?: number;
}

export class UpdateTagDto {
	@ApiProperty({
		description: `Tag name`,
		example: `Tag name`,
	})
	@IsString()
	@MaxLength(40)
	name?: string;

	@ApiProperty({
		description: `Sort order`,
		example: 0,
	})
	@IsNumber()
	sortOrder?: number;
}

export class CreateTagReturn201 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `Tag entity`,
		example: {
			id: 1,
			name: `My Tag`,
			sortOrder: 0,
		},
	})
	tag: {id: number; name: string; sortOrder: number};

	@ApiProperty({
		description: `Status code`,
		example: `201`,
	})
	status: number;
}

export class CreateTagReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `Tag has not been created`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}

export class UpdateTagReturn204 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `Tag response`,
		example: {
			creator: {
				nickname: "example",
				uid: "exam-pl-eUID",
			},
			name: "example",
			sortOrder: "0",
		},
	})
	tag: TagResponse;

	@ApiProperty({
		description: `Status code`,
		example: `204`,
	})
	status: number;
}

export class UpdateTagReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `Tag has not been updated`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}

export class DeleteTagReturn204 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `Message`,
		example: `Tag was deleted`,
	})
	message: string;

	@ApiProperty({
		description: `Status code`,
		example: `204`,
	})
	status: number;
}

export class DeleteTagReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `Tag has not been deleted`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}
export class GetTagReturn200 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `Tag response`,
		example: {
			creator: {
				nickname: "example",
				uid: "exam-pl-eUID",
			},
			name: "example",
			sortOrder: "0",
		},
	})
	tag: TagResponse;

	@ApiProperty({
		description: `Status code`,
		example: `200`,
	})
	status: number;
}

export class GetTagReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `Tag has not found`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}

export class TagDto {
	@ApiProperty({
		description: `id`,
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: `name of tag`,
		example: `Tag name`,
	})
	name: string;

	@ApiProperty({
		description: `sortOrder`,
		example: 0,
	})
	sortOrder: number;
}

export class TagsNumberDto {
	@ApiProperty({
		description: `Tags array`,
		example: [1, 2, 3, 4],
	})
	@IsNotEmpty()
	@IsArray()
	@IsDefined()
	tags: number[];
}
