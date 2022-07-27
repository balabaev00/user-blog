import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "./entity/user.entity";
import * as bcrypt from "bcrypt";
import {InjectRepository} from "@nestjs/typeorm";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

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
	 * It returns a user object from the database, based on the email address passed in
	 * @param {string} email - string - This is the email of the user we want to find.
	 * @returns The user object with the email that was passed in.
	 */
	async findOneByEmail(email: string) {
		return await this.userRepository.findOne({email: email});
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
}
