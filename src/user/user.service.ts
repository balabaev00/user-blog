import {Injectable} from "@nestjs/common";
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
	 * We're creating a new user, setting the email and password, and saving it to the database
	 * @param {string} email - string - the email of the user
	 * @param {string} password - string - the password that the user will enter
	 * @returns The user object
	 */
	async createUser(email: string, password: string) {
		const oldUser = await this.findOneByEmail(email);

		if (oldUser) return `Email is busy`;

		const newUser = new User();
		newUser.email = email;
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
}
