import {UserService} from "../user/user.service";
import {User} from "../user/entity/user.entity";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateBlogDto, CreateTagDto, UpdateBlogDto, UpdateTagDto} from "./dto/tag.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Tag} from "./entity/tag.entity";
import {Repository} from "typeorm";

@Injectable()
export class TagService {
	constructor(
		@InjectRepository(Tag) private tagRepository: Repository<Tag>,
		private userService: UserService
	) {}

	/**
	 * It creates a new tag, sets its name and sort order, finds the user who created it, and then saves it
	 * @param {CreateTagDto} dto - CreateTagDto - this is the DTO that we created earlier.
	 * @param {string} userEmail - This is the email of the user who is creating the tag.
	 * @returns The new tag is being returned.
	 */
	async create(dto: CreateTagDto, userEmail: string) {
		const oldTag = await this.findByName(dto.name);

		if (oldTag)
			throw new HttpException(
				`Tag with name ${oldTag.name} already exists`,
				HttpStatus.BAD_REQUEST
			);

		const newTag = new Tag();

		newTag.name = dto.name;
		if (dto.sortOrder) newTag.sortOrder = dto.sortOrder;

		const creator = await this.userService.findOneByEmail(userEmail);

		if (!creator) throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);

		newTag.creator = creator;

		return await this.tagRepository.save(newTag);
	}

	/**
	 * It finds a tag by id, checks if the user is the owner of the tag, and then updates the tag with the new data
	 * @param {number} tagId - The id of the tag we want to update.
	 * @param {UpdateTagDto} dto - UpdateTagDto - This is the DTO that we created earlier.
	 * @param {number} userId - The userId of the user who is making the request.
	 * @returns The updated tag.
	 */
	async update(tagId: number, dto: UpdateTagDto, userId: number) {
		try {
			const oldBlog = await this.findAndCheck(tagId, userId);

			if (dto.name) oldBlog.name = dto.name;
			if (dto.sortOrder) oldBlog.sortOrder = dto.sortOrder;

			return await this.tagRepository.save(oldBlog);
		} catch (error) {
			return error;
		}
	}

	/**
	 * It finds a tag by its id and checks if the user is the owner of the tag
	 * @param {number} tagId - The id of the tag to be updated.
	 * @param {number} userId - The userId of the user who is trying to update the blog.
	 * @returns The oldTag object
	 */
	async findAndCheck(tagId: number, userId: number) {
		const oldTag = await this.tagRepository
			.createQueryBuilder(`tag`)
			.leftJoinAndSelect(`tag.creator`, `user`)
			.where(`tag.id = :tagId`, {tagId: tagId})
			.getOne();

		if (!oldTag) throw new HttpException(`Blog not found`, HttpStatus.BAD_REQUEST);
		if (oldTag.creator.id !== userId)
			throw new HttpException(
				`You are not owner this blog`,
				HttpStatus.BAD_REQUEST
			);

		return oldTag;
	}

	/**
	 * It finds a tag by its id
	 * @param {number} tagId - number - The id of the tag we want to find.
	 * @returns A tag object
	 */
	async findById(tagId: number) {
		const tag = await this.tagRepository
			.createQueryBuilder(`tag`)
			.leftJoinAndSelect(`tag.creator`, `user`)
			.where(`tag.id = :tagId`, {tagId: tagId})
			.getOne();

		return tag;
	}

	/**
	 * It returns a promise that resolves to an array of blog posts
	 * @returns An array of all the blogs in the database.
	 */
	async findAll() {
		const blogs = await this.blogRepository
			.createQueryBuilder(`blog`)
			.leftJoinAndSelect(`blog.author`, `user`)
			.getMany();

		return blogs;
	}

	/**
	 * It return a promise that resolves to an array of blog posts for userId
	 * @param {number} userId - number - The user ID of the user whose blogs we want to find.
	 * @returns An array of Blogs
	 */
	async findByUserId(userId: number) {
		const blogs = await this.blogRepository
			.createQueryBuilder(`blog`)
			.leftJoinAndSelect(`blog.author`, `user`)
			.where(`blog.author_id = :userId`, {userId: userId})
			.getMany();

		return blogs;
	}

	async findByName(name: string) {
		const tag = await this.tagRepository.findOne({name: name});

		return tag;
	}

	/**
	 * It finds a blog by its id and checks if the user is the owner of the blog. If the user is the
	 * owner, it deletes the blog
	 * @param {number} blogId - The id of the blog to be deleted
	 * @param {number} userId - The id of the user who is trying to delete the blog.
	 * @returns The blog is being returned.
	 */
	async delete(blogId: number, userId: number) {
		const blog = await this.findAndCheck(blogId, userId);

		if (blog instanceof HttpException) return blog;

		return await this.blogRepository.remove(blog);
	}
}
