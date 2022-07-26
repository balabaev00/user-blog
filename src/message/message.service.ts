import {UserService} from "./../user/user.service";
import {BlogService} from "./../blog/blog.service";
import {User} from "./../user/entity/user.entity";
import {CreateMessageDto, UpdateMessageDto} from "./dto/message.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Message} from "./entity/message.entity";

@Injectable()
export class MessageService {
	constructor(
		@InjectRepository(Message) private messageRepository: Repository<Message>,
		private blogService: BlogService,
		private userService: UserService
	) {}

	/**
	 * It creates a new message, sets the message and author properties, and then saves the message to the
	 * database
	 * @param {CreateMessageDto} dto - CreateMessageDto - This is the DTO that we created earlier.
	 * @param {User} user - User - This is the user that is currently logged in.
	 * @returns The new message that was created.
	 */
	async create(dto: CreateMessageDto, user: User) {
		const newMessage = new Message();

		newMessage.message = dto.message;
		const author = await this.userService.findOneByEmail(user.email);

		if (!author) return `User not found`;

		newMessage.author = author;

		const oldBlog = await this.blogService.findById(dto.blogId);
		if (!oldBlog) return `Blog not found`;

		return await this.messageRepository.save(newMessage);
	}

	async update(dto: UpdateMessageDto, userId: number) {
		const oldMessage = await this.messageRepository
			.createQueryBuilder(`message`)
			.leftJoinAndSelect(`message.author`, `user`)
			.leftJoinAndSelect(`message.blog`, `blog`)
			.where(`message.id = :messageId`, {messageId: dto.id})
			.getOne();

		if (!oldMessage) return `Message not found`;
		if (oldMessage.author.id !== userId) return `You are not author message`;

		oldMessage.message = dto.message;
		return await this.messageRepository.save(oldMessage);
	}

	/**
	 * It finds a message by its id, checks if the user is the author of the message, and if so, deletes
	 * the message
	 * @param {number} messageId - number - the id of the message to be deleted
	 * @param {number} userId - number - the id of the user who is trying to delete the message
	 * @returns Promise<Message>
	 */
	async delete(messageId: number, userId: number) {
		const oldMessage = await this.messageRepository
			.createQueryBuilder(`message`)
			.leftJoinAndSelect(`message.author`, `user`)
			.leftJoinAndSelect(`message.blog`, `blog`)
			.where(`message.id = :messageId`, {messageId: messageId})
			.getOne();
		if (!oldMessage) return `Message not found`;
		if (oldMessage.author.id !== userId) return `You are not author message`;

		return await this.messageRepository.delete(oldMessage);
	}
}
