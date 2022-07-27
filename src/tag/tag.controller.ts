import {User} from "../user/entity/user.entity";
import {AuthGuard} from "../auth/guards/auth.guard";
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Post,
	Put,
	UseGuards,
} from "@nestjs/common";
import {UserDecorator} from "../user/decorators/user.decorator";
import {TagService} from "./tag.service";
import {
	CreateBlogDto,
	CreateBlogReturn201,
	CreateBlogReturn400,
	CreateTagDto,
	CreateTagReturn201,
	CreateTagReturn400,
	DeleteBlogReturn204,
	DeleteBlogReturn400,
	GetBlogByUserIdReturn200,
	GetBlogsReturn200,
	UpdateBlogDto,
	UpdateBlogReturn204,
	UpdateBlogReturn400,
} from "./dto/tag.dto";
import {ApiCookieAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Tag} from "./entity/tag.entity";
import {BlogResponse} from "types";

@Controller(`tag`)
@ApiTags(`Tag`)
export class TagController {
	constructor(private tagService: TagService) {}

	@Post(``)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 201,
		description: `OK`,
		type: CreateTagReturn201,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: CreateTagReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async create(@Body() dto: CreateTagDto, @UserDecorator(`email`) userEmail: string) {
		try {
			const res = await this.tagService.create(dto, userEmail);

			return {
				error: false,
				status: 201,
				tag: {
					id: res.id,
					name: res.name,
					sortOrder: res.sortOrder,
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

	@Get(`:id`)
	@UseGuards(AuthGuard)
	async getById(@Param(`id`) id: number) {
		const res = await this.tagService.findById(id);

		if (!res)
			return {
				error: true,
				status: 400,
				errorMessage: `Tag <${id}> not found`,
			};

		return {
			error: false,
			status: 200,
			tag: {
				name: res.name,
				sortOrder: res.sortOrder,
				creator: {
					nickname: res.creator.nickname,
					uid: res.creator.id,
				},
			},
		};
	}

	@Put(`:id`)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 204,
		description: `OK`,
		type: UpdateBlogReturn204,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: UpdateBlogReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async update(
		@Param(`id`) tagId: number,
		@Body() dto: UpdateBlogDto,
		@UserDecorator(`userId`) userId: number
	) {
		const res = await this.tagService.update(tagId, dto, userId);

		if (res instanceof HttpException)
			return {
				error: true,
				status: 400,
				errorMessage: `Something was wrong`,
			};

		return {
			error: false,
			status: 204,
			blog: this.prepareResponse(res),
		};
	}

	@Get(``)
	@ApiResponse({
		status: 200,
		description: `Blogs array`,
		type: GetBlogsReturn200,
	})
	async getAll() {
		const res = await this.blogService.findAll();

		return {
			error: false,
			status: 200,
			blogs: res.map(item => this.prepareResponse(item)),
		};
	}

	@Get(`:userId`)
	@ApiResponse({
		status: 200,
		description: `Blogs array`,
		type: GetBlogByUserIdReturn200,
	})
	async getByUserId(@Param(`userId`) userId: number) {
		const res = await this.blogService.findByUserId(userId);

		return {
			error: false,
			status: 200,
			blogs: res.map(item => this.prepareResponse(item)),
		};
	}

	@Delete(`:blogId`)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 204,
		description: `Blog was deleted`,
		type: DeleteBlogReturn204,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: DeleteBlogReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async delete(
		@Param(`blogId`) blogId: number,
		@UserDecorator(`userId`) userId: number
	) {
		const res = await this.blogService.delete(blogId, userId);

		if (res instanceof HttpException)
			return {
				error: true,
				status: 400,
				errorMessage: `Something was wrong`,
			};

		return {
			error: false,
			status: 204,
			message: `Blog was deleted`,
		};
	}

	private prepareResponse(res: any) {
		return {
			name: res.name,
			sortOrder: res.sortOrder,
			creator: {
				nickname: res.creator.nickname,
				uid: res.creator.id,
			},
		};
	}
}
