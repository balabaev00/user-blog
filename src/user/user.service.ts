import {TagsNumberDto} from "./../tag/dto/tag.dto";
import {AuthDto} from "./../auth/dto/auth.dto";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {getConnection, Repository} from "typeorm";
import {User} from "./entity/user.entity";
import * as bcrypt from "bcrypt";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	/**
	 * We check if the user with the same email exists, if not, we create a new user and save it to the database
	 * @param {string} email - string - the email of the user
	 * @param {string} password - string - the password that the user will enter
	 * @param {string} nickname - string - the nickname of the user
	 * @returns The user object with the new data.
	 */
	async createUser(email: string, password: string, nickname: string) {
		let oldUser = await this.findOneByEmail(email);

		if (oldUser) throw new HttpException(`Email is busy`, HttpStatus.BAD_REQUEST);

		oldUser = await this.findOneByNickname(nickname);

		if (oldUser) throw new HttpException(`Nickname is busy`, HttpStatus.BAD_REQUEST);

		const newUser = new User();
		newUser.email = email;
		newUser.nickname = nickname;
		newUser.password = bcrypt.hashSync(password, process.env.SALT);

		return await this.userRepository.save(newUser);
	}

	/**
	 * It updates a user's email, nickname, and password
	 * @param {string} id - the id of the user to be updated
	 * @param {AuthDto} dto - AuthDto - this is the data transfer object that we will use to update the user.
	 * @returns The updated user
	 */
	async updateUser(id: string, dto: AuthDto) {
		const oldUser = await this.findOneById(id);

		let flag = null;

		if (dto.email) flag = await this.findOneByEmail(dto.email);

		if (flag)
			throw new HttpException(
				`Email ${dto.email} already exists`,
				HttpStatus.BAD_REQUEST
			);
		else oldUser.email = dto.email;

		if (dto.nickname) flag = await this.findOneByNickname(dto.nickname);

		if (flag)
			throw new HttpException(
				`Nickname ${dto.nickname} already exists`,
				HttpStatus.BAD_REQUEST
			);
		else oldUser.nickname = dto.nickname;

		if (dto.password) oldUser.password = dto.password;

		return await this.userRepository.save(oldUser);
	}

	/**
	 * It returns a user object from the database, based on the email address passed in
	 * @param {string} email - string - This is the email of the user we want to find.
	 * @returns The user object with the email that was passed in.
	 */
	async findOneByEmail(email: string) {
		return await this.userRepository.findOne({email: email});
	}

	/**
	 * It finds a user by the tag id
	 * @param {number} id - number - the id of the tag we want to find
	 * @returns The user with the tag id
	 */
	async findTagByTagId(id: number) {
		const oldTag = await this.userRepository
			.createQueryBuilder(`users`)
			.leftJoinAndSelect(`users.tags`, `tag`)
			.where(`users.tags.id = :tagId`, {tagId: id})
			.getOne();

		return oldTag;
	}

	/**
	 * It returns a user object from the database, based on the id that was passed in
	 * @param {string} id - string - The id of the user we want to find.
	 * @returns The user with the given id.
	 */
	async findOneById(id: string) {
		return await this.userRepository.findOne({id: id});
	}

	/**
	 * It finds a user by their nickname
	 * @param {string} nickname - string - the nickname of the user we want to find
	 * @returns The user object with the nickname that was passed in.
	 */
	async findOneByNickname(nickname: string) {
		const oldUser = await this.userRepository.findOne({nickname: nickname});

		return oldUser;
	}

	/**
	 * It returns a user with all of their tags
	 * @param {string} id - string - the id of the user we want to find
	 * @returns An array of users with their tags.
	 */
	async findUserTagsById(id: string) {
		const oldUser = await this.userRepository
			.createQueryBuilder(`users`)
			.leftJoinAndSelect(`users.tags`, `tag`)
			.where(`users.id = :userId`, {userId: id})
			.getOne();

		return oldUser;
	}

	/**
	 * It returns a user that was deleted
	 * @param {string} id - string - the id of the user we want to delete
	 * @returns user that was deleted.
	 */
	async deleteUser(id: string) {
		const oldUser = await this.findOneById(id);

		if (!oldUser)
			throw new HttpException(`User ${id} not found`, HttpStatus.BAD_REQUEST);

		return await this.userRepository.remove(oldUser);
	}

	async addTagsById(id: string, dto: TagsNumberDto) {
		const connection = getConnection();
		const queryRunner = connection.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		const tags = dto.tags;
		tags.forEach(async tagId => {
			try {
				const oldTag = await this.findTagByTagId(tagId);
				await queryRunner.manager.insert(Receiving, receiving);

				await queryRunner.commitTransaction();
			} catch (error) {
				await queryRunner.rollbackTransaction();
				throw error;
			} finally {
				await queryRunner.release();
			}
		});
	}
}
