import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";
import {Tag} from "../entity/tag.entity";

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
		description: `Blog entity`,
		example: {
			id: 1,
			name: `My blog`,
			createdAt: new Date(),
			authorId: 1,
		},
	})
	blog: Blog;

	@ApiProperty({
		description: `Status code`,
		example: `204`,
	})
	status: number;
}

export class UpdateBlogReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `Blog has not been updated`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}

export class DeleteBlogReturn204 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `Message`,
		example: `Blog was deleted`,
	})
	message: string;

	@ApiProperty({
		description: `Status code`,
		example: `204`,
	})
	status: number;
}

export class DeleteBlogReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `Blog has not been deleted`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}

export class GetBlogByUserIdReturn200 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `Blog entities`,
		example: [
			{
				id: 1,
				name: `My blog`,
				createdAt: new Date(),
				authorId: 1,
			},
			{
				id: 2,
				name: `Test blog`,
				createdAt: new Date(),
				authorId: 1,
			},
		],
	})
	blogs: Blog[];

	@ApiProperty({
		description: `Status code`,
		example: `204`,
	})
	status: number;
}

export class GetBlogsReturn200 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: false,
	})
	error: boolean;

	@ApiProperty({
		description: `Blog entities`,
		example: [
			{
				id: 1,
				name: `My blog`,
				createdAt: new Date(),
				authorId: 1,
			},
			{
				id: 2,
				name: `Test blog`,
				createdAt: new Date(),
				authorId: 1,
			},
		],
	})
	blogs: Blog[];

	@ApiProperty({
		description: `Status code`,
		example: `200`,
	})
	status: number;
}
