import {UserService} from "./../user/user.service";
import {User} from "./../user/entity/user.entity";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateBlogDto, UpdateBlogDto} from "./dto/blog.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Blog} from "./entity/blog.entity";
import {Repository} from "typeorm";
import {BlogResponse} from "types";

@Injectable()
export class BlogService {
	constructor(
		@InjectRepository(Blog) private blogRepository: Repository<Blog>,
		private userService: UserService
	) {}

	/**
	 * It creates a new blog, sets the message, name, and author, and then saves it to the database
	 * @param {CreateBlogDto} dto - CreateBlogDto - This is the DTO that we created earlier.
	 * @param {User} user - User - This is the user that is currently logged in.
	 * @returns The blog that was created.
	 */
	async create(dto: CreateBlogDto, user: User) {
		const newBlog = new Blog();

		newBlog.name = dto.name;

		const author = await this.userService.findOneByEmail(user.email);

		if (!author) return `User not found`;

		newBlog.author = author;

		return await this.blogRepository.save(newBlog);
	}

	/**
	 * It finds a blog by its id and checks if the user is the owner of the blog. If the user is the
	 * owner, it updates the blog's name and saves it
	 * @param {UpdateBlogDto} dto - UpdateBlogDto - This is the DTO that we created earlier.
	 * @param {number} userId - The id of the user who is making the request.
	 * @returns The updated blog
	 */
	async update(dto: UpdateBlogDto, userId: number) {
		const oldBlog = await this.findAndCheck(dto.blogId, userId);

		if (oldBlog instanceof HttpException) return oldBlog;

		oldBlog.name = dto.name;
		return await this.blogRepository.save(oldBlog);
	}

	/**
	 * It finds a blog by its id and checks if the user is the owner of the blog
	 * @param {number} blogId - The id of the blog we want to update.
	 * @param {number} userId - The id of the user who is trying to update the blog.
	 * @returns Blog or HttpException
	 */
	async findAndCheck(blogId: number, userId: number) {
		const oldBlog = await this.blogRepository
			.createQueryBuilder(`blog`)
			.leftJoinAndSelect(`blog.author`, `user`)
			.where(`blog.id = :blogId`, {blogId: blogId})
			.getOne();

		if (!oldBlog) return new HttpException(`Blog not found`, HttpStatus.BAD_REQUEST);
		if (oldBlog.author.id !== userId)
			return new HttpException(
				`You are not owner this blog`,
				HttpStatus.BAD_REQUEST
			);

		return oldBlog;
	}

	/**
	 * It finds a blog by its id and returns the blog
	 * @param {number} blogId - number - This is the id of the blog we want to find.
	 * @returns The blog object
	 */
	async findById(blogId: number) {
		const blog = await this.blogRepository.findOne({id: blogId});

		return blog;
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
