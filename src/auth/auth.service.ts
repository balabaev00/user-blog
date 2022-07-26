import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {AuthDto, LoginDto} from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {AccessTokenPayload} from "types";

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	/**
	 * We create a user, if the user is created successfully, we generate a token and return it
	 * @param {AuthDto} dto - AuthDto - the data transfer object that contains the email and password of
	 * the user.
	 * @returns accessToken
	 */
	async signUpLocal(dto: AuthDto) {
		const user = await this.userService.createUser(dto.email, dto.password);

		if (user === `Email is busy`) return user;

		const accessToken = this.generateToken({
			userId: user.id,
			email: user.email,
		});

		return accessToken;
	}

	/**
	 * It takes a LoginDto as an argument, finds a user by email, checks if the password is correct, and if
	 * it is, it returns a JWT token
	 * @param {LoginDto} dto - LoginDto - The LoginDto is a class that we will create in the next step.
	 * @returns The access token is being returned.
	 */
	async signInLocal(dto: LoginDto) {
		const user = await this.userService.findOneByEmail(dto.email);

		if (!user) return new HttpException(`User not found`, HttpStatus.BAD_REQUEST);

		const isPasswordMatching = await bcrypt.compare(dto.password, user.password);

		if (!isPasswordMatching)
			return new HttpException(`Password is wrong`, HttpStatus.BAD_REQUEST);

		const accessToken = this.generateToken({
			userId: user.id,
			email: user.email,
		});

		return accessToken;
	}

	/**
	 * It takes an object of type AccessTokenPayload as an argument, and returns a JWT token
	 * @param {AccessTokenPayload} payload - This is the data that we want to encode into the token.
	 * @returns A JWT token
	 */
	private generateToken(payload: AccessTokenPayload) {
		return this.jwtService.sign(payload);
	}

	/**
	 * It takes in a string, and returns a promise that resolves to a boolean
	 * @param {string} accessToken - The access token to validate.
	 * @returns The decoded token.
	 */
	validateRefreshToken(accessToken: string) {
		return this.jwtService.verify(accessToken);
	}
}
