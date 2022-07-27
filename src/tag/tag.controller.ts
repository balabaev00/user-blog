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
	Query,
	UseGuards,
} from "@nestjs/common";
import {UserDecorator} from "../user/decorators/user.decorator";
import {TagService} from "./tag.service";
import {
	CreateTagDto,
	CreateTagReturn201,
	CreateTagReturn400,
	DeleteTagReturn204,
	DeleteTagReturn400,
	GetTagReturn200,
	GetTagReturn400,
	UpdateTagDto,
	UpdateTagReturn204,
	UpdateTagReturn400,
} from "./dto/tag.dto";
import {ApiCookieAuth, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Tag} from "./entity/tag.entity";
import {TagResponse} from "types";

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
	@ApiResponse({
		status: 200,
		description: `OK`,
		type: GetTagReturn200,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: GetTagReturn400,
	})
	@ApiCookieAuth(`jwt`)
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
			tag: this.prepareResponse(res),
		};
	}

	@Put(`:id`)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 204,
		description: `OK`,
		type: UpdateTagReturn204,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: UpdateTagReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async update(
		@Param(`id`) tagId: number,
		@Body() dto: UpdateTagDto,
		@UserDecorator(`userId`) userId: string
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
			tag: this.prepareResponse(res),
		};
	}

	@Delete(`:id`)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 204,
		description: `Tag was deleted`,
		type: DeleteTagReturn204,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: DeleteTagReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async delete(@Param(`id`) tagId: number, @UserDecorator(`userId`) userId: string) {
		const res = await this.tagService.delete(tagId, userId);

		if (res instanceof HttpException)
			return {
				error: true,
				status: 400,
				errorMessage: `Something was wrong`,
			};

		return {
			error: false,
			status: 204,
			message: `Tag was deleted`,
		};
	}

	@Get(``)
	@UseGuards(AuthGuard)
	@ApiCookieAuth(`jwt`)
	@ApiQuery({
		name: "pageSize",
		type: Number,
		description: "Size of page",
		required: false,
	})
	@ApiQuery({
		name: "page",
		type: Number,
		description: "Number of page",
		required: false,
	})
	@ApiQuery({
		name: "sortByOrder",
		type: Boolean,
		description: "flag of sort by order",
		required: false,
	})
	@ApiQuery({
		name: "sortByName",
		type: Boolean,
		description: "flag of sort by name",
		required: false,
	})
	async getTags(
		@Query(`pageSize`) pageSize?: number,
		@Query(`page`) page?: number,
		@Query(`sortByOrder`) sortByOrder?: boolean,
		@Query(`sortByName`) sortByName?: boolean
	) {
		const res = await this.tagService.getAllTags(sortByOrder, sortByName);
		const tags = res.map(tag => this.prepareResponse(tag));

		if (!pageSize) pageSize = 10;
		const pageCount = Math.ceil(res.length / pageSize);

		if (!page) page = 1;
		if (page > pageCount) page = pageCount;

		const data = tags.slice(page * pageSize - pageSize, page * pageSize);

		return {
			data,
			meta: {
				page: page,
				pageSize: pageCount,
				quantity: res.length,
			},
		};
	}

	private prepareResponse(tag: Tag): TagResponse {
		return {
			name: tag.name,
			sortOrder: tag.sortOrder,
			creator: {
				nickname: tag.creator.nickname,
				uid: tag.creator.id,
			},
		};
	}
}
