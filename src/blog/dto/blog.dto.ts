import {ApiProperty} from "@nestjs/swagger";
import {Blog} from "../entity/blog.entity";

export class CreateBlogDto {
	@ApiProperty({
		description: `Blog name`,
		example: `First buy`,
	})
	name: string;
}

export class UpdateBlogDto {
	@ApiProperty({
		description: `Blog Id`,
		example: 1,
	})
	blogId: number;

	@ApiProperty({
		description: `Blog name`,
		example: `Blog name`,
	})
	name: string;
}

export class CreateBlogReturn201 {
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
		example: `201`,
	})
	status: number;
}

export class CreateBlogReturn400 {
	@ApiProperty({
		description: `false - all good, true - check errorMessage`,
		example: true,
	})
	error: boolean;

	@ApiProperty({
		description: `Description of error`,
		example: `Blog has not been created`,
	})
	errorMessage: string;

	@ApiProperty({
		description: `Status code`,
		example: `400`,
	})
	status: number;
}

export class UpdateBlogReturn204 {
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
