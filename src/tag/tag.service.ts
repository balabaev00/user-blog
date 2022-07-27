import {UserService} from "../user/user.service";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateTagDto, UpdateTagDto} from "./dto/tag.dto";
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
	 * @param {string} userId - The userId of the user who is making the request.
	 * @returns The updated tag.
	 */
	async update(tagId: number, dto: UpdateTagDto, userId: string) {
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
	 * @param {string} userId - The userId of the user who is trying to update the blog.
	 * @returns The oldTag object
	 */
	async findAndCheck(tagId: number, userId: string) {
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
	 * It finds a tag by name
	 * @param {string} name - The name of the tag we want to find.
	 * @returns The tag with the name that was passed in.
	 */
	async findByName(name: string) {
		const tag = await this.tagRepository.findOne({name: name});

		return tag;
	}

	/**
	 * It finds a tag by its id and checks if it belongs to the user, then deletes it
	 * @param {number} tagId - The id of the tag to be deleted.
	 * @param {string} userId - The userId of the user who is making the request.
	 * @returns The tag that was deleted.
	 */
	async delete(tagId: number, userId: string) {
		try {
			const oldTag = await this.findAndCheck(tagId, userId);
			return await this.tagRepository.remove(oldTag);
		} catch (error) {
			return error;
		}
	}

	async getAllTags(sortByOrder: boolean, SortByName: boolean) {
		let tags = null;
		if (sortByOrder)
			tags = await this.tagRepository
				.createQueryBuilder(`tags`)
				.leftJoinAndSelect(`tags.creator`, `user`)
				.orderBy(`tags.sortOrder`)
				.getMany();

		if (SortByName)
			tags = await this.tagRepository
				.createQueryBuilder(`tags`)
				.leftJoinAndSelect(`tags.creator`, `user`)
				.orderBy(`tags.name`)
				.getMany();

		if (!tags)
			tags = await this.tagRepository
				.createQueryBuilder(`tags`)
				.leftJoinAndSelect(`tags.creator`, `user`)
				.getMany();
		return tags;
	}
}
